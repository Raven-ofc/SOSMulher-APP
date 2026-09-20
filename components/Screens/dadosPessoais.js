import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StylePerfil'
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';
import { usarVitima } from '../contextos/vitimaContexto.js';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://seuip:8000/api/atualizarVitima'

export default function DadosPessoais({ navigation }) {
  const { vitimaLogada, atualizarVitima } = usarVitima()
  const [nome, setNome] = useState(vitimaLogada.nomeVitima)
  const [email, setEmail] = useState(vitimaLogada.emailVitima)
  const [fone, setFone] = useState(vitimaLogada.telefoneVitima)
  const [carregando, setCarregando] = useState(false)
  const [saveModalVisible, setSaveModalVisible] = useState(false)
  const [erroImagem, setErroImagem] = useState(false)
  const [imagem, setImagem] = useState(null);
  const [ModalErroVisible, setModalErroVisible] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  const urlImagem = vitimaLogada?.imagemVitima ? `http://seuip:8000/storage/${vitimaLogada.imagemVitima}` : null
  const AXIOS_IMGURL = 'http://seuip:8000/api/atualizarImagem'

  const atualizarImagem = async (imagemSelecionada) => {
    try {
      const formData = new FormData()

      formData.append('imagem', {
        uri: imagemSelecionada.uri,
        name: imagemSelecionada.fileName || 'foto-perfil.jpg',
        type: imagemSelecionada.mimeType || 'image/jpeg',
      })

      const response = await axios.post(
        `${AXIOS_IMGURL}/${vitimaLogada.idVitima}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      )

      atualizarVitima({
        imagemVitima: response.data.imagemVitima
      })

      setImagem(imagemSelecionada)
      setErroImagem(false)


    } catch (error) {
      console.error(
        'Erro ao atualizar imagem:',
        error.response?.data || error.message
      );

      setModalErroVisible(true)
      setMensagemErro('Não foi possível atualizar sua imagem.')
    }
  }

  const escolherImagem = async () => {
    const permissaoImagem = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissaoImagem.granted) {
      setModalErroVisible(true)
      setMensagemErro('Permissão Necessária!',
        'Precisamos de acesso à galeria para escolher a foto.')
      return
    }

    const resultadoGaleria = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    })

    if (!resultadoGaleria.canceled) {
      const foto = resultadoGaleria.assets[0]
      setImagem(foto)
      setErroImagem(false)
      await atualizarImagem(foto);
    }
  }

  const enviarDadosVitima = () => {

    if(!nome || !fone || !email){
      setMensagemErro('Não deixe os campos em branco!')
      setSaveModalVisible(false)
      setModalErroVisible(true)
      return
    }

    setCarregando(true)

    const dados = {
      nome: nome,
      email: email,
      numeroTelefone: fone
    }

    axios.put(`${API_URL}/${vitimaLogada.idVitima}`, dados)
      .then((response) => {
        setNome('');
        setFone('');
        setEmail('');
        atualizarVitima({
          nomeVitima: nome,
          emailVitima: email,
          telefoneVitima: fone
        });
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Erro na requisição PUT Axios:", err);
        setModalErroVisible(true)
        setMensagemErro("Não foi possível atualizar seus dados. Verifique a conexão e tente novamente.")
      })
      .finally(() => {
        setCarregando(false);
      });


  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.voltar}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Ionicons name='arrow-back' size={40} color={'#50333D'} />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <Text style={styles.headerTitulo}>Seus Dados</Text>
          </View>

          <View style={styles.principalCont}>
            <View style={styles.containerFoto}>
              <TouchableOpacity onPress={escolherImagem}>
                <Image
                  source={
                    imagem
                      ? { uri: imagem.uri }
                      : urlImagem && !erroImagem
                        ? { uri: urlImagem }
                        : require('../../assets/img_sem_foto.jpg')
                  }
                  onError={() => setErroImagem(true)}
                  style={styles.fotoCont} />
                <View style={styles.mudarFoto}>
                  <Ionicons name="create-outline" size={25} color={"#EC6E99"}></Ionicons>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>

            <Text style={styles.cardTitulo}>Seu Perfil</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nome completo..."
                placeholderTextColor={"#915e70"}
                value={nome}
                onChangeText={setNome}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor={"#915e70"}
                placeholder="Telefone..."
                value={fone}
                onChangeText={setFone}
              />

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

            <View style={styles.buttonSection}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
                style={styles.buttonExcluir}>
                <Text style={styles.textButtonExcluir}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSaveModalVisible(true)} style={styles.buttonEditar}>
                <Text style={styles.textButtonEditar}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={saveModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>

            <Text style={styles.modalTitle}>
              Deseja Salvar esse contato?
            </Text>

            <Text style={styles.modalText}>
              Ao salvar o contato os dados atuais serão substituidos pelos dados escolhidos.
            </Text>

            <View style={styles.buttonSection}>

              <TouchableOpacity
                style={styles.buttonExcluir}
                onPress={() => setSaveModalVisible(false)}
              >
                <Text style={styles.textButtonExcluir}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => enviarDadosVitima()}
                style={styles.buttonEditar}
              >
                <Text style={styles.textButtonEditar}>Salvar</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
      <Modal
        visible={ModalErroVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>

            <Text style={styles.modalTitle}>
              Erro ao Fazer o Login.
            </Text>

            <Text style={styles.modalText}>
              {mensagemErro}
            </Text>

              <TouchableOpacity
                style={styles.buttonCancelar}
                onPress={() => [
                  setSaveModalVisible(false),
                  setModalErroVisible(false)]}
              >
                <Text style={styles.textButtonCancelar}>OK</Text>
              </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View >
  );
}