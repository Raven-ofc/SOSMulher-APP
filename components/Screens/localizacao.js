import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ImageBackground, Animated, PanResponder, Dimensions, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleLocal'

const { height } = Dimensions.get('window');

const endereco = [
  {
    id: '1',
    nome: 'Casa',
    bairro: 'Guaianazes',
    rua: 'Inácio Moreira',
    num: '444',
    complemento: ''
  },
  {
    id: '2',
    nome: 'Escola',
    bairro: 'Guaianazes',
    rua: 'Feliciano Fonseca',
    num: '235',
    complemento: ''
  },
  {
    id: '3',
    nome: 'Escola',
    bairro: 'Guaianazes',
    rua: 'Feliciano Fonseca',
    num: '235',
    complemento: ''
  },
  {
    id: '4',
    nome: 'Escola',
    bairro: 'Guaianazes',
    rua: 'Feliciano Fonseca',
    num: '235',
    complemento: ''
  },

];

export default function Localizacao({ navigation }) {
  const remoteImage = { uri: 'https://previews.123rf.com/images/ket4up/ket4up1707/ket4up170700042/81563570-gps-navigation-background-road-map-vector-illustration.jpg' };

  const [ModalVisible, setModalVisible] = useState(false);

  const renderEndereco = ({ item }) => (
    <TouchableOpacity
      onPress={() =>{
        fecharModal()
        navigation.navigate('EditarLocalizacao', {
          endereco: item
        }
        )}}
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

      {/* Header */}

      <ImageBackground
        source={remoteImage}
        resizeMode="cover"
        style={styles.imageFundo}
      >
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={abrirModal}
            style={styles.buttonMapa}>
            <Ionicons name='map' size={30} color={'#D7A6BF'}></Ionicons>
          </TouchableOpacity>

        </View>
      </ImageBackground>

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

            <View style = {styles.areaArrastar}{...panResponder.panHandlers}>
              <Text style={styles.modalTitle}>
                Seus Locais Seguros
              </Text>
            </View>

            <FlatList
              data={endereco}
              keyExtractor={(item) => item.id}
              renderItem={renderEndereco}
            />

            <TouchableOpacity 
              onPress={()=>{
                fecharModal()
                navigation.navigate('AdicionarLocal')
              }}
              style={styles.button}
            >
              <Text style={styles.textButton}>+ Adicionar Local</Text>
            </TouchableOpacity>

          </Animated.View>
        </View>
      </Modal >
    </View >
  );
}