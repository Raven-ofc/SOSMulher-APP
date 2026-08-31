import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StylePerfil'
import { ScrollView } from 'react-native-gesture-handler';

export default function DadosPessoais({ navigation }) {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [fone, setFone] = useState()
  const [cidade, setCidade] = useState()
  const [bairro, setBairro] = useState()
  const [rua, setRua] = useState()
  const [num, setNum] = useState()
  const [complemento, setComplemento] = useState()

  const [ModalPedidoVisible, setModalPedidoVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.voltar}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons name='arrow-back' size={40} color={'#50333D'} />
          </TouchableOpacity>
        </View>

                <View style={styles.header}>
                    <Text style={styles.headerTitulo}>Seus Dados</Text>
                </View>

        <View style={styles.card}>

          <Text style={styles.cardTitulo}>Seu Perfil</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nome completo..."
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="Telefone..."
              value={fone}
              onChangeText={setFone}
            />

            <TextInput
              style={styles.input}
              placeholder="Email..."
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

            <TouchableOpacity style={styles.buttonEditar}>
              <Text style={styles.textButtonEditar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>

          <Text style={styles.cardTitulo}>Sua Residência</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
            />

            <TextInput
              style={styles.input}
              placeholder="Bairro..."
              value={bairro}
              onChangeText={setBairro}
            />

            <TextInput
              style={styles.input}
              placeholder="Rua..."
              value={rua}
              onChangeText={setRua}
            />

            <TextInput
              style={styles.input}
              placeholder="num..."
              value={num}
              onChangeText={setNum}
            />
            <TextInput
              style={styles.input}
              placeholder="complemento..."
              value={complemento}
              onChangeText={setComplemento}
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

            <TouchableOpacity
              onPress={() => {
                setModalPedidoVisible(true)
              }}
              style={styles.buttonEditar}
            >
              <Text style={styles.textButtonEditar}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={ModalPedidoVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.deleteModal}>

                <Text style={styles.modalTitle}>
                  Pedido de adição enviado!
                </Text>

                <Text style={styles.modalText}>
                  Enviamos seu pedido de adição de local seguro para as autoridades!, aguarde a confirmação
                </Text>

                <View style={styles.buttonSectionFechar}>

                  <TouchableOpacity
                    style={styles.buttonExcluir}
                    onPress={() => setModalPedidoVisible(false)}
                  >
                    <Text style={styles.textButtonExcluir}>Fechar</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View >
  );
}