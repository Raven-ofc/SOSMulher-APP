import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ImageBackground, Animated, PanResponder, Dimensions, FlatList, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'
import { styles } from '../Styles/StyleLocal'
import Feather from '@expo/vector-icons/Feather';
import * as Location from 'expo-location'

const { height } = Dimensions.get('window');

const endereco = [
  {
    id: '1',
    nome: 'Casa',
    bairro: 'Guaianazes',
    rua: 'Inácio Moreira',
    num: '444',
    complemento: '',
    latitude: -23.550093,
    longitude: -46.400124,
  },
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

export default function Localizacao({ navigation }) {

  const [localizacaoAtual, setLocalizacaoAtual] = useState(null)
  const [erroLocalizacao, setErroLocalizacao] = useState(null)

  useEffect(() => {
    let subscription = null

    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErroLocalizacao('A permissão para acessar a localização foi negada.');
        return
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (newLocation) => {
          setLocalizacaoAtual(newLocation)
        }
      )
    }

    startLocationTracking()

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }

    , [])

  const [ModalVisible, setModalVisible] = useState(false);

  const renderEndereco = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        fecharModal()
        navigation.navigate('EditarLocalizacao', {
          endereco: item
        }
        )
      }}
      style={styles.buttonEndereco}>
      <View style={styles.textos}>
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <Ionicons name='create-outline' size={30} color={'#D7A6BF'}></Ionicons>
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
        style={styles.mapaLocal}
        mapType='terrain'
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
        />
        {endereco.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.nome}
          />
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
              data={endereco}
              keyExtractor={(item) => item.id}
              renderItem={renderEndereco}
            />

          </Animated.View>
        </View>
      </Modal >
    </View >
  );
}