import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';  
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleAnjo'
export default function DetalheAnjo({navigation}) {
  const route = useRoute()
  const {contato} = route.params
  const [podeAcompanhar, setPodeAcompanhar] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <View style={styles.container}>
          {/* Header */}
      <View style={styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons name='arrow-back' size={40} color={'#50333D'}/>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.principalCard}>
          <Image source={{ uri: contato.foto }} style={styles.fotoCard} />
          <Text style={styles.nomeCard}>{contato.nome}</Text>
        </View>
        <Text style={styles.foneCard}>Número: {contato.telefone}</Text>
        <Text style={styles.foneCard}>Email: {contato.email}</Text>
        <TouchableOpacity
          style={styles.opcao}
          onPress={() => setPodeAcompanhar(!podeAcompanhar)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.radio,
            podeAcompanhar && styles.radioSelecionado
          ]}>
            {podeAcompanhar && (
              <View style={styles.radioInterno} />
            )}
          </View>

          <Text style={styles.foneCard}>
            esta pessoa pode acompanhar{'\n'}
            minha localização
          </Text>
        </TouchableOpacity>

          <TouchableOpacity
          onPress={()=> {
              setDeleteModalVisible(true)
          }}
          style={styles.buttonExcluirDetalhe}>
            <Text style={styles.textButtonExcluir}>Excluir</Text>
          </TouchableOpacity>

      </View>

      <Modal
        visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>

            <Text style={styles.modalTitle}>
              Deseja Excluir esse contato?
            </Text>

            <Text style={styles.modalText}>
              Ao excluir o contaro de segurança, ele não será mais alertado em situações de emergências
            </Text>

            <View style={styles.buttonSection}>

              <TouchableOpacity
                style={styles.buttonExcluir}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.textButtonExcluir}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonEditar}
              >
                <Text style={styles.textButtonEditar}>Excluir</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}