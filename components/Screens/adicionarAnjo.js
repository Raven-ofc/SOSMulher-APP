import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleAnjo'

export default function AdicionarAnjo({ navigation }) {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [fone, setFone] = useState()

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name='arrow-back' size={40} color={'#50333D'} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do anjo..."
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite o telefone do anjo..."
            value={fone}
            onChangeText={setFone}
          />

          <TextInput
            style={styles.input}
            placeholder="Email do anjo..."
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
    </View>
  );
}