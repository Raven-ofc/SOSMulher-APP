import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleRedefinir.js'
import Feather from '@expo/vector-icons/Feather';
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';

const API_URL = 'http://seuip:8000/api/recuperarSenha'

export default function DadosPessoais({ navigation, route }) {
    const email = route.params?.email || ''
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const [senhaAtual, setSenhaAtual] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [carregando, setCarregando] = useState(false)
    const [saveModalVisible, setSaveModalVisible] = useState(false)
    const [ModalErroVisible, setModalErroVisible] = useState(false)
    const [modalSucessoVisible, setModalSucessoVisible] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')


    const enviarDadosVitima = async () => {

        if (!senhaAtual || !confirmarSenha) {
            setMensagemErro('Não deixe os campos em branco!');
            setSaveModalVisible(false);
            setModalErroVisible(true);
            return;
        }

        if (senhaAtual.length < 8) {
            setMensagemErro('A nova senha deve possuir pelo menos 8 caracteres.');
            setSaveModalVisible(false);
            setModalErroVisible(true);
            return;
        }

        if (senhaAtual !== confirmarSenha) {
            setMensagemErro('As senhas não coincidem!');
            setSaveModalVisible(false);
            setModalErroVisible(true);
            return;
        }

        try {
            setCarregando(true);
            setSaveModalVisible(false);

            const dados = {
                email: email,
                senha: senhaAtual,
                senha_confirmation: confirmarSenha
            };

            await axios.post(
                `${API_URL}`,
                dados
            );

            setSenhaAtual('');
            setConfirmarSenha('');

            setModalSucessoVisible(true)

        } catch (err) {
            console.error(
                'Erro ao alterar senha:',
                err.response?.data || err.message
            );

            setMensagemErro(
                err.response?.data?.message ||
                'Não foi possível alterar sua senha. Tente novamente.'
            );

            setModalErroVisible(true);

        } finally {
            setCarregando(false);
        }
    };


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
                        <Text style={styles.headerTitulo}>Alterar sua senha</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.form}>

                            <Text style={styles.textInput}>Nova Senha</Text>

                            <View style={styles.inputContainer}>

                                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                    <Feather name={mostrarSenha ? "eye-off" : "eye"} size={24} color="#bc5478" style={styles.icon} />
                                </TouchableOpacity>
                                <TextInput style={styles.input}
                                    placeholder="Nova Senha..."
                                    placeholderTextColor={"#915e70"}
                                    value={senhaAtual}
                                    color={'#b00c45'}
                                    onChangeText={setSenhaAtual}
                                    secureTextEntry={!mostrarSenha}
                                    autoCapitalize="none"
                                ></TextInput>
                            </View>

                            <Text style={styles.textInput}>Confirmar Nova Senha</Text>

                            <View style={styles.inputContainer}>

                                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                    <Feather name={mostrarSenha ? "eye-off" : "eye"} size={24} color="#bc5478" style={styles.icon} />
                                </TouchableOpacity>
                                <TextInput style={styles.input}
                                    placeholder="Confirmar Senha..."
                                    placeholderTextColor={"#915e70"}
                                    value={confirmarSenha}
                                    color={'#b00c45'}
                                    autoCapitalize="none"
                                    onChangeText={setConfirmarSenha}
                                    secureTextEntry={!mostrarSenha}
                                ></TextInput>

                            </View>

                        </View>

                        <View style={styles.buttonSection}>
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
                            Deseja redefinir sua senha?
                        </Text>

                        <Text style={styles.modalText}>
                            Ao redefinir sua senha, sua senha anterior será esquecida e somente a senha cadastrada neste momento será válida.
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
                            Erro ao editar o perfil.
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
            <Modal
                visible={modalSucessoVisible}
                transparent
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.deleteModal}>

                        <Text style={styles.modalTitle}>
                            Sucesso!
                        </Text>

                        <Text style={styles.modalText}>
                            Senha confirmada com sucesso!
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonCancelar}
                            onPress={() => {
                                setModalSucessoVisible(false)
                                navigation.navigate('Login')
                            }}
                        >
                            <Text style={styles.textButtonCancelar}>
                                OK
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </View >
    );
}