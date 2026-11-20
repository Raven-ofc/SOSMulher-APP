import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Linking
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { styles } from '../Styles/StyleHome'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Ionicons } from '@expo/vector-icons'
import { usarVitima } from '../contextos/vitimaContexto'
import axios from 'axios'

const API_ALERTA = 'http://seuip:8000/api/Panico-Violacao'
const API_AGRESSOR = 'http://seuip:8000/api/localAgressor'


export default function Home() {

  const { vitimaLogada, distanciaAgressor, statusAlerta } = usarVitima()
  const [medidaAgressor, setMedidaAgressor] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const navigation = useNavigation()

  const onda1 = useRef(new Animated.Value(0)).current
  const onda2 = useRef(new Animated.Value(0)).current

  const openUrl = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('Erro ao abrir discador:', error);
    }
  };

  useEffect(() => {
    const animacao1 = Animated.loop(

      Animated.sequence([

        Animated.timing(onda1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),

        Animated.timing(onda1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),

      ])

    )
    const animacao2 = Animated.loop(

      Animated.sequence([

        Animated.delay(1000),

        Animated.timing(onda2, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),

        Animated.timing(onda2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),

      ])

    )

    animacao1.start()
    animacao2.start()
    return () => {
      animacao1.stop()
      animacao2.stop()
    }

  }, [])

  const escalaOnda1 = onda1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  })

  const opacidadeOnda1 = onda1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.2, 0],
  })

  const escalaOnda2 = onda2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  })

  const opacidadeOnda2 = onda2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.2, 0],
  })

  const configuracaoAlerta = {
    aguardando: {
      cor: '#6B7280',
      icone: 'shield',
      titulo: 'BUSCANDO LOCALIZAÇÃO DO AGRESSOR',
      mensagem: 'Obtendo as coordenadas para o monitoramento!'
    },

    seguro: {
      cor: '#53997B',
      icone: 'shield',
      titulo: 'VOCÊ ESTÁ EM SEGURANÇA!',
      mensagem: 'O agressor está fora da zona de alerta.'
    },

    aproximacao: {
      cor: '#eece6d',
      icone: 'alert-triangle',
      titulo: 'ALERTA DE APROXIMAÇÃO',
      mensagem: 'Atenção! o agressor está nas proximidades'
    },

    critico: {
      cor: '#EF4444',
      icone: 'alert-triangle',
      titulo: 'ALERTA CRÍTICO!',
      mensagem: 'O agressor ultrapassou o limite da medida protetiva, as autoridades foram alertadas!'
    }
  }

  console.log('STATUS RECEBIDO NA HOME:', statusAlerta)

  const alertaAtual = configuracaoAlerta[statusAlerta] || configuracaoAlerta.aguardando

  const buscarMedidaAgressor = async () => {
    try {
      if (!vitimaLogada?.idVitima) return;

      const resposta = await axios.get(
        `${API_AGRESSOR}/${vitimaLogada.idVitima}`
      );

      const agressores = resposta.data.localizacoesAgressor || [];

      const agressor = agressores.find(
        item => item.idMedida != null
      );

      if (!agressor) {
        console.log('Nenhuma medida protetiva encontrada.');
        setMedidaAgressor(null);
        return;
      }

      setMedidaAgressor({
        idMedida: agressor.idMedida,
        distanciaMedida: Number(agressor.distanciaMedida),
        raioAlertaMedida: Number(agressor.raioAlertaMedida),
        latitude: Number(agressor.latitude),
        longitude: Number(agressor.longitude)
      });

      console.log('Medida protetiva:', agressor.idMedida);

    } catch (error) {
      console.log(
        'Erro ao buscar medida:',
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    buscarMedidaAgressor();
  }, [vitimaLogada?.idVitima]);

  const enviarViolacao = async () => {

    try {
      setCarregando(true);

      console.log('Medida recebida:', medidaAgressor);

      const response = await axios.post(
        `${API_ALERTA}/${medidaAgressor.idMedida}`
      );

      // O alerta foi registrado no servidor.
      navigation.navigate('Alerta');

    } catch (erro) {
      console.error(
        'Erro ao registrar violação:',
        erro.response?.data || erro.message
      );

      setMensagemErro(
        erro.response?.data?.message ||
        'Não foi possível registrar a ocorrência. Tente novamente.'
      );

    } finally {
      setCarregando(false);
    }
  };

  return (

    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View
          style={{
            backgroundColor: alertaAtual.cor,
            padding: 10,
            borderRadius: 10,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 40,
            elevation: 2,
          }}
        >
          <Feather name={alertaAtual.icone} size={34} color="#FFFFFF" />

          <View style={{ flex: 1, }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16
              }}
            >
              {alertaAtual.titulo}
            </Text>

            <Text style={{ color: '#FFFFFF', marginTop: 4, textAlign: 'center', }}>
              {alertaAtual.mensagem}
            </Text>

          </View>
        </View>


        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={styles.animeContainer}>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.onda,
                {
                  opacity: opacidadeOnda1,
                  transform: [
                    { scale: escalaOnda1 }
                  ],
                },
              ]}
            />
            <Animated.View
              pointerEvents="none"
              style={[
                styles.onda,
                {
                  opacity: opacidadeOnda2,
                  transform: [
                    { scale: escalaOnda2 }
                  ],
                },
              ]}
            />
            <TouchableOpacity
              onPress={enviarViolacao}
              disabled={carregando || !medidaAgressor}

              style={styles.button}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                Botão do Pânico
              </Text>
            </TouchableOpacity>

          </View>


          <Text style={styles.textMainHome}>
            Seus contatos e autoridades serão notificados imediatamente!
          </Text>

        </View>

        <View style={styles.centerAcesso}>
          <View style={styles.acesso}>
            <Text style={styles.textAcesso}>Acesso Rápido</Text>
            <View style={styles.viewAcesso}>

              <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.chamar} onPress={() => openUrl('tel:190')}>
                  <MaterialIcons name="local-police" size={32} color="#FEF9FB" />
                </TouchableOpacity>
                <Text style={styles.textBotao}>Polícia</Text>
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.chamar} onPress={() => navigation.navigate('RegistrarViolacao')}>
                  <MaterialIcons name="crisis-alert" size={32} color="#FEF9FB" />
                </TouchableOpacity>
                <Text style={styles.textBotao}>Relatar Incidente</Text>
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.chamar} onPress={() => navigation.navigate('Perfil', {
                  screen: 'GuiaApp'
                })}>
                  <Ionicons name="shield-checkmark" size={32} color={"#FEF9FB"}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.textBotao}>Dicas de Segurança</Text>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>

    </View>

  )
}

