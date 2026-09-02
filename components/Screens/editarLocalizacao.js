import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleLocal'

export default function EditarAnjo({ navigation }) {
    const route = useRoute()
    const { endereco } = route.params
    const [podeAcompanhar, setPodeAcompanhar] = useState(false);
    const [nome, setNome] = useState(endereco.nome)
    const [bairro, setBairro] = useState(endereco.bairro)
    const [rua, setRua] = useState(endereco.rua)
    const [num, setNum] = useState(endereco.num)
    const [complemento, setComplemento] = useState(endereco.complemento)

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [ModalPedidoVisible, setModalPedidoVisible] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.voltar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Ionicons name='arrow-back' size={40} color={'#50333D'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerTitulo}>Local Seguro</Text>
                </View>


                <View style={styles.card}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do local..."
                            placeholderTextColor={"#915e70"}
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Bairro..."
                            placeholderTextColor={"#915e70"}
                            value={bairro}
                            onChangeText={setBairro}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Rua..."
                            placeholderTextColor={"#915e70"}
                            value={rua}
                            onChangeText={setRua}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="num..."
                            placeholderTextColor={"#915e70"}
                            value={num}
                            onChangeText={setNum}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="complemento..."
                            placeholderTextColor={"#915e70"}
                            value={complemento}
                            onChangeText={setComplemento}
                        />
                    </View>

                    <View style={styles.buttonSection}>
                        <TouchableOpacity
                            onPress={() => {
                                setDeleteModalVisible(true)
                            }}
                            style={styles.buttonExcluir}>
                            <Text style={styles.textButtonExcluir}>Excluir</Text>
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
                        visible={deleteModalVisible} transparent animationType="fade">
                        <View style={styles.modalOverlay}>
                            <View style={styles.deleteModal}>

                                <Text style={styles.modalTitle}>
                                    Deseja Excluir esse Local seguro?
                                </Text>

                                <Text style={styles.modalText}>
                                    Ao excluir o local, não será mais possível visualizá-lo no mapa.
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

                    <Modal
                        visible={ModalPedidoVisible} transparent animationType="fade">
                        <View style={styles.modalOverlay}>
                            <View style={styles.deleteModal}>

                                <Text style={styles.modalTitle}>
                                    Pedido de alteração enviado!
                                </Text>

                                <Text style={styles.modalText}>
                                    Enviamos seu pedido de edição de local seguro para as autoridades!, aguarde a confirmação
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
        </View>
    );
}