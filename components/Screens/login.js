import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect, useCallback} from 'react';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../Styles/StyleLogin.js';

export default function Login({navigation}) {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const logar = async ()=> {
    if(!email || !senha){
      Alert.alert('Atenção', 'Preencha o e-mail e a senha!')
      return
    }

    try{
      setCarregando(true)
      const response = await fetch(
          `http://seuip:8000/api/vitima/${encodeURIComponent(email)}/${encodeURIComponent(senha)}`
      )

      const data = await response.json()

      if(!response.ok){
        Alert.alert(
          'Erro',
          data.message || 'E-mail ou senha incorretos.'
        )
        return
      }

      console.log('Vitima logada com sucesso:', data)

      navigation.navigate('HomeTabs',{
        vitimaLogada: data
      })

    }catch(error){
      console.log('Erro ao logar', error)

      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor.'
      )
    }finally{
      setCarregando(false)
    }

  }

  return (
    <View style={styles.container}>

      <View style={styles.inicio}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.voltar}>
          <Ionicons name="arrow-back" size={40} color="#50333D" />
        </TouchableOpacity>
        <Image source={require('../../assets/logoSosMulher.png')} style={styles.logo} />
        <Text style={styles.title}>Bem-vinda!</Text>
        <Text style={styles.subtitle}>Faça login para continuar!</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={24} color="black" />
          <TextInput style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#915e70"}
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={()=> setMostrarSenha(!mostrarSenha)}>
            <Feather name={mostrarSenha ? "eye-off" : "eye"} size={24} color="black" style={styles.icon}/>
          </TouchableOpacity>
          <TextInput style={styles.input}
            placeholder="Senha"
            placeholderTextColor={"#915e70"}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          ></TextInput>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EsqueciMinhaSenha')}>
          <Text style={styles.textButton2}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.links}>
        <TouchableOpacity 
          onPress={logar}
          style={styles.button}
          disabled={carregando}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

