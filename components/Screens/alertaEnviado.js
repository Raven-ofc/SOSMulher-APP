import React from 'react';
import { View, 
         Text,
          TouchableOpacity,
         } 
  from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import {styles} from '../Styles/StyleAlertaEnviado';

export default function AlertaEnviado() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons name="shield-checkmark-outline" size={100} color="#EC6E99" />
        <Text style={styles.titulo}>Alerta Enviado!</Text>
        <Text style={styles.subTituloAlerta}>Seus contatos e autoridades foram notificados.</Text>
      </View>
      <View style={styles.boxCentral}>
        <Text style={styles.subtitulo}>O que ocorre agora?</Text>
        <View style={styles.view}>
          <Feather name="check-circle" size={24} color="#EC6E99" />
         <Text style={styles.textLista}>Procure um local seguro enquanto aguarda a chegada dos serviços de emergência.</Text>
        </View>
        <View style={styles.view}>
          <Feather name="check-circle" size={24} color="#EC6E99" />
          <Text style={styles.textLista}>Mantenha o celular ligado junto a você.</Text>
        </View>
        <View style={styles.view}>
          <Feather name="check-circle" size={24} color="#EC6E99" />
          <Text style={styles.textLista}>As autoridades mais próximas serão acionadas até você.</Text>
        </View>
      </View>
      <View style={styles.box}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.button}>
          <Text style={styles.textButton}>Entendi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
