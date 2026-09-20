import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/StylePerfil.js';
import { Ionicons } from '@expo/vector-icons';
import { usarVitima } from '../contextos/vitimaContexto.js';

const ENDERECO_URL = `http://seuip:8000/api/endereco`

export default function MeuPerfil({ navigation }) {
  const { vitimaLogada, sairDaConta } = usarVitima()
  const [erroImagem, setErroImagem] = useState(false)
  const urlImagem = vitimaLogada?.imagemVitima
    ? `http://seuip:8000/storage/${vitimaLogada.imagemVitima}`
    : null

  const sair = () => {

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });

    sairDaConta();

  }

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitulo}>Meu Perfil</Text>
          </View>

          <View style={styles.cont}>
            <View style={styles.principalCont}>
              <View style={styles.containerFoto}>
                <Image
                  source={urlImagem && !erroImagem
                    ? { uri: urlImagem }
                    : require('../../assets/img_sem_foto.jpg')
                  }
                  onError={() => setErroImagem(true)}
                  style={styles.fotoCont} />
              </View>
              <Text style={styles.nomeCont}>{vitimaLogada?.nomeVitima}</Text>
            </View>
            <Text style={styles.foneCont}>{vitimaLogada?.telefoneVitima ? vitimaLogada.telefoneVitima : "Nenhum Telefone Registrado."}</Text>
            <Text style={styles.foneCont}>{vitimaLogada?.emailVitima}</Text>
          </View>

          <View style={styles.containerButtons}>

            <View style={styles.buttonPerfilFlex}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditarPerfil')
                }
                style={styles.buttonPerfil}
              >
                <Text style={styles.textoButtonContainer}>Dados Pessoais</Text>
                <Ionicons name="arrow-forward" size={25} color={"#FBB0C6"}></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonPerfilFlex}>
              <TouchableOpacity style={styles.buttonPerfil}>
                <Text style={styles.textoButtonContainer}>Dicas de segurança</Text>
                <Ionicons name="arrow-forward" size={25} color={"#FBB0C6"}></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonPerfilFlex}>
              <TouchableOpacity style={styles.buttonPerfil}>
                <Text style={styles.textoButtonContainer}>Ajuda e suporte</Text>
                <Ionicons name="arrow-forward" size={25} color={"#FBB0C6"}></Ionicons>
              </TouchableOpacity>

            </View>
            <View style={styles.buttonPerfilFlex}>
              <TouchableOpacity style={styles.buttonPerfil}>
                <Text style={styles.textoButtonContainer}>Privacidade</Text>
                <Ionicons name="arrow-forward" size={25} color={"#FBB0C6"}></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonPerfilFlex}>
              <TouchableOpacity style={styles.ultimoButton}>
                <Text style={styles.textoButtonContainer}>Sobre o app</Text>
                <Ionicons name="arrow-forward" size={25} color={"#FBB0C6"}></Ionicons>
              </TouchableOpacity>
            </View>

          </View>

          <TouchableOpacity
            onPress={sair}
            style={styles.Exitbutton}>
            <Text style={styles.textExitButton}>Sair</Text>
          </TouchableOpacity>
        </ScrollView>
    </View>
  );
}