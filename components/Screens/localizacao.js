import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ImageBackground, Animated, PanResponder, Dimensions, FlatList, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'
import { styles } from '../Styles/StyleLocal'
import Feather from '@expo/vector-icons/Feather';
import * as Location from 'expo-location'
import axios from 'axios'
import { usarVitima } from '../contextos/vitimaContexto'
import { ZoomIn } from 'react-native-reanimated'

const AXIOS_ENDERURL = 'http://seuip:8000/api/endereco'

const { height } = Dimensions.get('window');

const endereco = [
  {
    id: '3',
    nome: '44º Distrito Policial',
    bairro: 'Guaianazes',
    rua: 'Salvador Gianetti',
    num: '386',
    complemento: '',
    latitude: -23.542582,
    longitude: -46.418777,
  },
  {
    id: '4',
    nome: '7ª DDM',
    bairro: 'Itaquera',
    rua: "Sabbado D'Ângelo",
    num: '',
    complemento: '',
    latitude: -23.534242,
    longitude: -46.451615,
  },

];
const API_LOCAL = 'http://seuip:8000/api/atualizarLocalizacao'

export default function Localizacao({ navigation }) {

  const mapRef = useRef(null)

  const { vitimaLogada } = usarVitima();

  const [localizacaoAtual, setLocalizacaoAtual] = useState(null)
  const [erroLocalizacao, setErroLocalizacao] = useState(null)
  const [enderecoVitima, setEnderecoVitima] = useState(null)
  const [ModalVisible, setModalVisible] = useState(false);

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

  const buscarEndereco = async () => {
    try {
      const response = await axios.get(
        `${AXIOS_ENDERURL}/${vitimaLogada.idVitima}`
      );

      console.log("Endereço da vítima: ", response.data)

      const endereco = response.data;

      setEnderecoVitima(endereco)

    } catch (error) {
      if (error.response?.status === 404) {
        console.log('A vitima ainda não possui endereço cadastrado')
        return
      }
    }
  }

  useEffect(() => {
    buscarEndereco();
  }, [vitimaLogada]);

  useEffect(() => {
    let subscription = null

    const startLocationTracking = async () => {
      if (!vitimaLogada?.idVitima) {
        console.log('Nenhuma vítima logada.')
        return
      }

      try {

        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          setErroLocalizacao('A permissão para acessar a localização foi negada.');
          return
        }

        const localizacaoInicial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocalizacaoAtual(localizacaoInicial);

        const { latitude, longitude } = localizacaoInicial.coords;

        enviarLocalizacaoDB(latitude, longitude);

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
    ...(enderecoVitima?.latitudeVitima != null && enderecoVitima?.longitudeVitima != null
      ? [
        {
          id: enderecoVitima.id,
          nome: "Sua Residência",
          latitude: Number(enderecoVitima.latitudeVitima),
          longitude: Number(enderecoVitima.longitudeVitima),
        }
      ] : []
    ),
    ...endereco,
  ]

  const renderEndereco = ({ item }) => (
    <TouchableOpacity
      style={styles.buttonEndereco}
      onPress={() => darZoom(item)}>
      <View style={styles.textos}>
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <Ionicons
        name={
          item.nome === 'Sua Residência'
            ? 'home'
            : 'shield-checkmark'
        }
        size={25}
        color="#EC6E99"
      />
    </TouchableOpacity>

  );

  const translateY = useRef(new Animated.Value(height)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (_, gestureState) => {

        if (gestureState.dy > 120 || gestureState.vy > 1) {

          Animated.timing(translateY, {
            toValue: height,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setModalVisible(false);
          });

        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();

        }
      },
    })
  ).current;
  const abrirModal = () => {

    setModalVisible(true);

    translateY.setValue(height);

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const fecharModal = () => {

    Animated.timing(translateY, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });

  };

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
        {enderecoVitima?.latitudeVitima != null && enderecoVitima?.longitudeVitima != null && (
          <Marker
            key={enderecoVitima.id}
            coordinate={{ latitude: Number(enderecoVitima.latitudeVitima), longitude: Number(enderecoVitima.longitudeVitima) }}
            title="Sua residência"
          >
            <Ionicons name='home' color={'#EC6E99'} size={40}></Ionicons>
          </Marker>
        )}
        {endereco.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.nome}
          >
            {item.nome == 'Casa' ? (<Ionicons name='home' color={'#EC6E99'} size={40}></Ionicons>)
              : (<Ionicons name='shield-checkmark' color={'#EC6E99'} size={40}></Ionicons>)}
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

      </View>

      <View style={styles.containerAlerta}>
        <View style={styles.alertaVerde}>
          <Feather name="shield" size={34} color="#53997B" />
          <Text style={styles.tituloAviso}>Você está em segurança!</Text>
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

            <FlatList
              data={localSeguro}
              keyExtractor={(item) => item.id}
              renderItem={renderEndereco}
            />

          </Animated.View>
        </View>
      </Modal >
    </View >
  );
}