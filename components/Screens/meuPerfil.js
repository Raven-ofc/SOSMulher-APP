import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/StylePerfil.js';
import { Ionicons } from '@expo/vector-icons';

export default function MeuPerfil({ navigation }) {
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
              <Image source={{ uri: 'https://brasil.un.org/sites/default/files/styles/featured_image/public/2021-08/maria-da-penha_foto-jarbas-oliveira.jpeg?itok=oGsF8sGD' }} style={styles.fotoCont} />
              <TouchableOpacity style={styles.mudarFoto}>
                <Ionicons name="create-outline" size={25} color={"#EC6E99"}></Ionicons>
              </TouchableOpacity>
            </View>
            <Text style={styles.nomeCont}>Maria da Penha</Text>
          </View>
          <Text style={styles.foneCont}>Número: (11) 91134-2006</Text>
          <Text style={styles.foneCont}>Email: MariaPn@gmail.com</Text>
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

        <TouchableOpacity style={styles.Exitbutton}>
          <Text style={styles.textExitButton}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}