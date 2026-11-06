import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ImageBackground, Animated, PanResponder, Dimensions, FlatList, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'
import { styles } from '../Styles/StyleLocal'
import Feather from '@expo/vector-icons/Feather'
import * as Notifications from 'expo-notifications'
import * as Location from 'expo-location'
import axios from 'axios'
import { usarVitima } from '../contextos/vitimaContexto'
import { getDistance } from 'geolib';
import { ZoomIn } from 'react-native-reanimated'

const AXIOS_ENDERURL = 'http://seuip:8000/api/endereco'
const API_LOCAL = 'http://seuip:8000/api/atualizarLocalizacao'
const API_AGRESSOR = 'http://seuip:8000/api/localAgressor'
const API_VIOLACAO = 'http://seuip:8000/api/Enviar-Violacao'
const API_DELEGACIAS = 'http://seuip:8000/api/delegacias'

const { height } = Dimensions.get('window')


export default function Localizacao({ navigation }) {

  const mapRef = useRef(null)
  const { vitimaLogada, setDistanciaAgressor, setStatusAlerta } = usarVitima()

  const [localizacaoAtual, setLocalizacaoAtual] = useState(null)
  const [delegacias, setDelegacias] = useState([])
  const [delegaciasCarregando, setDelegaciasCarregando] = useState(false)
  const [erroLocalizacao, setErroLocalizacao] = useState(null)
  const [enderecoVitima, setEnderecoVitima] = useState(null)
  const [ModalVisible, setModalVisible] = useState(false)
  const [localizacaoAgressor, setLocalizacaoAgressor] = useState([])
  const [filtroDelegacia, setFiltroDelegacia] = useState('Todas')

  //Delegacia

  const buscarDelegacia = async () => {
    try {
      setDelegaciasCarregando(true)

      const resposta = await axios.get(
        `${API_DELEGACIAS}/${vitimaLogada.idVitima}`
      )

      const dados = await resposta.data

      const listaDelegacias = (dados.delegacias || [])
        .filter(item =>
          item.latitudedelegacia != null &&
          item.longitudedelegacia != null
        ).map(item => ({
          ...item,
          latitude: Number(item.latitudedelegacia),
          longitude: Number(item.longitudedelegacia),
          nome: item.nomeDelegacia,
          tipo: item.tipoDelegacia,
          distancia: Number(item.distanciaKm) * 1000
        })).filter(item =>
          Number.isFinite(item.latitude) &&
          Number.isFinite(item.longitude)
        )

      console.log('Resposta da API:', resposta)
      console.log('Dados recebidos:', resposta.data)

      setDelegacias(listaDelegacias)

    } catch (erro) {
      console.log('Erro ao buscar delegacias:', erro.response?.data)
    } finally {
      setDelegaciasCarregando(false)
    }
  }

  useEffect(() => {
    if (vitimaLogada?.idVitima) {
      buscarDelegacia()
    }
  }, [vitimaLogada?.idVitima]
  )

  const delegaciasFiltradas = delegacias.filter(item => {
    if (filtroDelegacia === 'Todas') return true

    return item.tipoDelegacia === filtroDelegacia
  })

  const zoomDelegaciaProxima = () => {
    if (delegacias.length === 0) {
      console.log('Nenhuma delegacia disponível.')
      return
    }

    const delegaciaProxima = [...delegaciasFiltradas].sort(
      (a, b) => a.distancia - b.distancia
    )[0]

    darZoom(delegaciaProxima)

    console.log(
      'Delegacia mais próxima:',
      delegaciaProxima.nome,
      `${(delegaciaProxima.distancia / 1000).toFixed(2)} km`
    )
  }

  //Agressor - Funções

  const calcularDistanciaAgressor = (vitima, agressor) => {
    const R = 6371000

    const rad = (valor) => valor * Math.PI / 180

    const dLat = rad(agressor.latitude - vitima.latitude)
    const dLon = rad(agressor.longitude - vitima.longitude)

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(vitima.latitude)) *
      Math.cos(rad(agressor.latitude)) *
      Math.sin(dLon / 2) ** 2

    return R * 2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  }

  const teste = () => {
    console.log('funciona')
  }

  const buscarLocalAgressor = async () => {
    try {
      const resposta = await axios.get(`${API_AGRESSOR}/${vitimaLogada.idVitima}`)

      const dados = resposta.data.localizacoesAgressor || []

      const localizacoes = dados.filter(item =>
        item.latitude != null &&
        item.longitude != null
      ).map(item => ({
        idAgressor: item.idAgressor,
        idMedida: item.idMedida,
        nomeAgressor: item.nomeAgressor,
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        distanciaMedida: Number(item.distanciaMedida),
        raioAlertaMedida: Number(item.raioAlertaMedida),
        dataHora: item.dataHora,
      })).filter(item =>
        Number.isFinite(item.latitude) &&
        Number.isFinite(item.longitude)
      )

      setLocalizacaoAgressor(localizacoes)
      console.log('Localizações dos agressores:', localizacoes);
    } catch (error) {
      console.log('Erro ao buscar a localização do agressor', error.response?.data || error.message)
    }
  }

  useEffect(() => {
    if (!vitimaLogada?.idVitima) return


    buscarLocalAgressor()

    const intervalo = setInterval(() => {
      buscarLocalAgressor();
    }, 30000);

    return () => clearInterval(intervalo)
  }, [vitimaLogada?.idVitima])

  const distanciasAgressores = localizacaoAtual
    ? localizacaoAgressor.map(agressor => ({
      ...agressor,
      distancia: calcularDistanciaAgressor(
        {
          latitude: localizacaoAtual.coords.latitude,
          longitude: localizacaoAtual.coords.longitude,
        },
        agressor
      )
    }))
    : [];

  const agressorMaisProximo = distanciasAgressores.length > 0
    ? [...distanciasAgressores].sort((a, b) => a.distancia - b.distancia)[0]
    : null

  const distanciaAgressor = agressorMaisProximo
    ? agressorMaisProximo.distancia
    : null

  const limiteMedida = agressorMaisProximo?.distanciaMedida ?? Infinity
  const limiteAproximacao = agressorMaisProximo?.raioAlertaMedida ?? Infinity

  const ultimoStatus = useRef(null)

  const alerta = distanciaAgressor === null ? {
    cor: '#6B7280',
    titulo: 'BUSCANDO LOCALIZAÇÃO DO AGRESSOR',
    mensagem: 'Obtendo as coordenadas para o monitoramento!',
    icone: 'shield',
  } : distanciaAgressor <= limiteMedida ? {
    cor: '#EF4444',
    titulo: 'ALERTA CRÍTICO!',
    mensagem: 'O agressor ultrapassou o limite da medida protetiva, as autoridades foram alertadas!',
    icone: 'alert-triangle',

    teste
  } : distanciaAgressor <= limiteAproximacao ? {
    cor: '#eece6d',
    titulo: 'ALERTA DE APROXIMAÇÃO',
    mensagem: 'Atenção! o agressor está nas proximidades',
    icone: 'alert-triangle',
  } : {
    cor: '#53997B',
    titulo: 'VOCÊ ESTÁ EM SEGURANÇA!',
    mensagem: 'O agressor está fora da zona de alerta.',
    icone: 'shield',
  }
  const enviarLocalizacaoDB = async (latitude, longitude) => {
    if (!vitimaLogada?.idVitima) {
      console.log('Nenhuma vítima logada.')
      return
    }

    try {
      await axios.put(
        `${API_LOCAL}/${vitimaLogada.idVitima}`, {
        latitude,
        longitude
      }
      )

      console.log(
        'Localização enviada:',
        latitude,
        longitude
      )
    } catch (error) {
      console.log(
        'Erro ao atualizar localização:',
        error.response?.data || error.message
      )
    }
  }

  //Endereço da vitima

  const buscarEndereco = async () => {
    try {
      const response = await axios.get(
        `${AXIOS_ENDERURL}/${vitimaLogada.idVitima}`
      )

      console.log("Endereço da vítima: ", response.data)

      const endereco = response.data

      setEnderecoVitima(endereco)

    } catch (error) {
      if (error.response?.status === 404) {
        console.log('A vitima ainda não possui endereço cadastrado')
        return
      }
    }
  }

  const notificarAproximacao = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'ALERTA DE APROXIMAÇÃO',
          body: 'Atenção! O agressor está se aproximando da sua localização.',
          sound: true,
        },
        trigger: null,
      })

      console.log('Notificação de aproximação enviada!')
    } catch {
      console.log('Erro ao enviar notificação: ', error)
    }
  }

  const notificarCritico = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'ALERTA DE QUEBRA DE LIMITE',
          body: 'Atenção! O agressor está na zona limite da medida, busque um lugar para se proteger imediatamente!.',
          sound: true,
        },
        trigger: null,
      })

      console.log('Notificação de aproximação enviada!')
    } catch (error) {
      console.log('Erro ao enviar notificação: ', error)
    }
  }

  useEffect(() => {
    buscarEndereco()
  }, [vitimaLogada])

  useEffect(() => {
    let subscription = null

    const startLocationTracking = async () => {
      if (!vitimaLogada?.idVitima) {
        console.log('Nenhuma vítima logada.')
        return
      }

      try {

        const { status } = await Location.requestForegroundPermissionsAsync()
        const permissaoNotificacao = await solicitarPermissaoNotificacao()

        if (!permissaoNotificacao) {
          console.log('Permissão de notificação negada.')
        }
        if (status !== 'granted') {
          setErroLocalizacao('A permissão para acessar a localização foi negada.')
          return
        }

        const localizacaoInicial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })

        setLocalizacaoAtual(localizacaoInicial)

        const { latitude, longitude } = localizacaoInicial.coords

        enviarLocalizacaoDB(latitude, longitude)

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 60000,
            distanceInterval: 5,
          },
          (newLocation) => {
            setLocalizacaoAtual(newLocation)

            const { latitude, longitude } = newLocation.coords

            enviarLocalizacaoDB(
              latitude,
              longitude
            )
          }
        )
      } catch (error) {
        console.log('Erro ao obter localização',
          error)

        setErroLocalizacao(
          'Não foi possível obter sua localização'
        )
      }
    }

    startLocationTracking()

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [vitimaLogada])

  useEffect(() => {

    if (distanciaAgressor === null) return
    setDistanciaAgressor(distanciaAgressor)

    let novoStatus


    if (distanciaAgressor <= limiteMedida) {
      novoStatus = 'critico'
    } else if (distanciaAgressor <= limiteAproximacao) {
      novoStatus = 'aproximacao'
    } else {
      novoStatus = 'seguro'
    }

    setStatusAlerta(novoStatus)

    if (novoStatus === 'aproximacao' && ultimoStatus.current !== 'aproximacao') {
      notificarAproximacao()
    }

    if (novoStatus === 'critico' && ultimoStatus.current !== 'critico' && agressorMaisProximo) {
      notificarCritico()
      EnviarAlerta(agressorMaisProximo)
    }

    ultimoStatus.current = novoStatus

  }, [distanciaAgressor, limiteMedida, limiteAproximacao]
  )

  const solicitarPermissaoNotificacao = async () => {
    const { status: atual } = await Notifications.getPermissionsAsync()

    if (atual === 'granted') return true

    const { status } = await Notifications.requestPermissionsAsync()

    return status === 'granted'
  }

  const EnviarAlerta = async (agressor) => {
    try {
      if (!agressor.idMedida) {
        console.log('Erro: ID da medida não encontrado.')
        return
      }

      const resposta = await axios.post(`${API_VIOLACAO}/${agressor.idMedida}`, {
        latitude: Number(agressor.latitude),
        longitude: Number(agressor.longitude),
        descricaoViolacao: `O agressor ultrapassou o limite de ${limiteMedida} M imposto pela medida.`
      })

      console.log('Resposta do registro de violação: ', resposta.data)

    } catch (error) {
      console.log('Erro ao enviar alerta', error.response?.data || error.message)
    }
  }


  const darZoom = (local) => {
    if (!mapRef.current) return

    fecharModal()

    mapRef.current.animateCamera(
      {
        center: {
          latitude: Number(local.latitude),
          longitude: Number(local.longitude,)
        },
        zoom: 17,
      },
      {
        duration: 1000,
      }
    )
  }

  const localSeguro = [
    ...(filtroDelegacia === 'Todas' && 
        enderecoVitima?.latitudeVitima != null && enderecoVitima?.longitudeVitima != null
      ? [
        {
          id: enderecoVitima.id,
          nome: "Sua Residência",
          latitude: Number(enderecoVitima.latitudeVitima),
          longitude: Number(enderecoVitima.longitudeVitima),
        }
      ] : []
    ),
    ...delegaciasFiltradas,
  ]

  const renderEndereco = ({ item }) => (
    <TouchableOpacity
      style={styles.buttonEndereco}
      onPress={() => darZoom(item)}>
      <View style={styles.textos}>
        <Text style={styles.nome}>{item.nome}</Text>

        {item.distancia != null && (
          <Text>
            {(item.distancia / 1000).toFixed(2)} KM de distância
          </Text>
        )}

      </View>
      <Ionicons
        name={
          item.nome === 'Sua Residência'
            ? 'home'
            : 'shield-checkmark'
        }
        size={25}
        color={
          item.tipoDelegacia === 'Convencional'
            ? '#2563EB'
            : '#EC6E99'
        }
        siz
      />
    </TouchableOpacity>

  )

  const translateY = useRef(new Animated.Value(height)).current
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5
      },

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy)
        }
      },

      onPanResponderRelease: (_, gestureState) => {

        if (gestureState.dy > 120 || gestureState.vy > 1) {

          Animated.timing(translateY, {
            toValue: height,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setModalVisible(false)
          })

        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start()

        }
      },
    })
  ).current
  const abrirModal = () => {

    setModalVisible(true)

    translateY.setValue(height)

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const fecharModal = () => {

    Animated.timing(translateY, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false)
    })

  }

  return (
    <View style={styles.container}>

      {localizacaoAtual ? (<MapView
        ref={mapRef}
        style={styles.mapaLocal}
        initialRegion={{
          latitude: localizacaoAtual.coords.latitude,
          longitude: localizacaoAtual.coords.longitude,
          latitudeDelta: 0.0092,
          longitudeDelta: 0.0041,
        }}
      >
        <Marker
          coordinate={{
            latitude: localizacaoAtual.coords.latitude,
            longitude: localizacaoAtual.coords.longitude
          }}
          title="Sua Localização atual"
        >
          <Ionicons name='location-sharp' size={40} color={'#EC6E99'}></Ionicons>
        </Marker>

        {localizacaoAgressor.map((agressor) => (
          <Marker
            key={agressor.idAgressor}
            coordinate={{
              latitude: agressor.latitude,
              longitude: agressor.longitude
            }}
            title={agressor.nomeAgressor}
            description="Monitorado por nosso sistema.">
            <Ionicons name="person" size={40} color={'#EF4444'} />
          </Marker>
        ))}

        {enderecoVitima?.latitudeVitima != null && enderecoVitima?.longitudeVitima != null && (
          <Marker
            key={enderecoVitima.id}
            coordinate={{ latitude: Number(enderecoVitima.latitudeVitima), longitude: Number(enderecoVitima.longitudeVitima) }}
            title="Sua residência"
          >
            <Ionicons name='home' color={'#EC6E99'} size={40}></Ionicons>
          </Marker>
        )}
        {delegaciasFiltradas.map(item => (
          <Marker
            key={String(item.id)}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }}
            title={item.nome}
            description={`${(item.distancia / 1000).toFixed(2)} km de distância`}
          >
            <Ionicons
              name="shield-checkmark"
              color={
                item.tipoDelegacia === 'DDM'
                  ? '#EC6E99'
                  : '#2563EB'
              }
              siz
              size={40}
            />
          </Marker>
        ))}
      </MapView>) : (
        <View style={styles.erroLoc}>
          <Text style={styles.textErro}>
            {erroLocalizacao || 'Obtendo sua localização...'}
          </Text>
        </View>
      )}

      <View style={styles.buttonSectionMapa}>
        <TouchableOpacity
          onPress={abrirModal}
          style={styles.buttonMapa}>
          <Ionicons name='map' size={30} color={'#D7A6BF'}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (!localizacaoAtual) { return }
            darZoom({
              latitude: localizacaoAtual.coords.latitude,
              longitude: localizacaoAtual.coords.longitude
            })
          }
          }
          style={styles.buttonMapa}>
          <Ionicons name='location' size={30} color={'#D7A6BF'}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (localizacaoAgressor.length === 0) return;

            const agressorMaisProximo = [...distanciasAgressores]
              .sort((a, b) => a.distancia - b.distancia)[0];

            darZoom(agressorMaisProximo);
          }}
          style={styles.buttonMapa}
        >
          <Ionicons name='person' size={30} color={'#ea0444'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={zoomDelegaciaProxima}
          style={styles.buttonMapa}
          disabled={delegacias.length === 0}
        >
          <Ionicons
            name="shield-checkmark"
            size={30}
            color={delegacias.length === 0 ? '#9CA3AF' : '#EC6E99'}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.containerAlerta}>
        <View style={{
          backgroundColor: alerta.cor,
          padding: 15,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          opacity: 0.9,
          marginHorizontal: 10
        }}>
          <Feather name={alerta.icone} size={34} color="#FFFFFF" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
              {alerta.titulo}
            </Text>

            <Text style={{ color: '#ffffff', marginTop: 4 }}>
              {alerta.mensagem}
            </Text>

            {distanciaAgressor !== null && (
              <Text style={{ color: '#FFFFFF' }}>
                Distância: {distanciaAgressor.toFixed()} metros
              </Text>
            )}

          </View>
        </View>
      </View>

      <Modal
        visible={ModalVisible}
        transparent
        animationType="none"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlaySlide}>
          <Animated.View
            style={[
              styles.modalGaveta,
              {
                transform: [
                  {
                    translateY: translateY,
                  },
                ],
              },
            ]
            }
          >

            <View style={styles.areaArrastar}{...panResponder.panHandlers}>
              <Text style={styles.modalTitle}>
                Seus Locais Seguros
              </Text>
            </View>

            <View style={styles.botaoFiltro}>
              {['Todas', 'DDM', 'Convencional'].map(opcao => (
                <TouchableOpacity
                  key={opcao}
                  onPress={() => setFiltroDelegacia(opcao)}
                  style={{
                    backgroundColor:
                      filtroDelegacia === opcao
                        ? '#EC6E99'
                        : '#F3F4F6',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10
                  }}
                >
                  <Text style={{
                    color: filtroDelegacia === opcao
                      ? '#FFFFFF'
                      : '#EC6E99',
                    fontWeight: 'bold'
                  }}>
                    {opcao === 'Convencional' ? 'DP' : opcao}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={localSeguro}
              keyExtractor={(item) => item.id}
              renderItem={renderEndereco}
            />

          </Animated.View>
        </View>
      </Modal >
    </View >
  )
}