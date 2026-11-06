import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { styles } from '../Styles/StyleEsqueciMinhaSenha.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

const AXIOS_ENDERURL = 'http://seuip:8000/api/enviarCodigo'

export default function EsqueciMinhaSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false)
  const [ModalErroVisible, setModalErroVisible] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [modalSenhaVisible, setmodalSenhaVisible] = useState(false)

  const enviarEmail = async () => {
    if (!email.trim()) {
      setModalErroVisible(true)
      setMensagemErro('Atenção, digite seu email!')
      return
    }

    try {
      setCarregando(true)

      const response = await axios.post(
        AXIOS_ENDERURL, { email: email.trim() }
      )

      navigation.navigate('ConfirmarEmail', {
        email: email.trim()
      });
    } catch (erro) {
      setModalErroVisible(true)
      setMensagemErro(erro.response?.data?.message || 'Não foi possível processar a solicitação, Tente novamente')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
          <Ionicons name="arrow-back" size={40} color="#50333D" />
        </TouchableOpacity>
        <Image source={require('../../assets/logoSosMulher.png')} style={styles.logo} />
        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.subtitle}>Digite seu email para receber sua senha!</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Email cadastrado</Text>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email..."
            placeholderTextColor={"#915e70"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.box}>
        <TouchableOpacity onPress={enviarEmail} style={styles.button} disabled={carregando}>
          {carregando ? (
            <ActivityIndicator color='#FFFFFF' />
          ) : (<Text style={styles.textButton}>Enviar</Text>)}
        </TouchableOpacity>
      </View>
      <Modal
        visible={ModalErroVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>

            <Text style={styles.modalTitle}>
              Erro ao verificar Email.
            </Text>

            <Text style={styles.modalText}>
              {mensagemErro}
            </Text>

            <TouchableOpacity
              style={styles.buttonCancelar}
              onPress={() => [
                setmodalSenhaVisible(false),
                setModalErroVisible(false)]}
            >
              <Text style={styles.textButtonCancelar}>OK</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      <Modal
        visible={modalSenhaVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>

            <Text style={styles.modalTitle}>
              Sucesso ao redefinir a sua senha.
            </Text>

            <Text style={styles.modalText}>
              {mensagemSucesso}
            </Text>

            <TouchableOpacity
              style={styles.buttonCancelar}
              onPress={() => [
                setmodalSenhaVisible(false),
                setModalErroVisible(false),
                navigation.goBack()]
              }
            >
              <Text style={styles.textButtonCancelar}>OK</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}
