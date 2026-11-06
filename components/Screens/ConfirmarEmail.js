
import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    ActivityIndicator,
} from 'react-native';

import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';

import { styles } from '../Styles/StyleEsqueciMinhaSenha.js';

const API_URL = 'http://seuip:8000/api';

export default function ConfirmarEmail({ navigation, route }) {

    const email = route.params?.email || '';

    const [codigo, setCodigo] = useState('');
    const [carregando, setCarregando] = useState(false);

    const [modalErroVisible, setModalErroVisible] = useState(false);
    const [modalSucessoVisible, setModalSucessoVisible] = useState(false);

    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const [reenviando, setReenviando] = useState(false);

    // CONFIRMAR CÓDIGO
    const verificarCodigo = async () => {

        if (codigo.length !== 6) {
            setMensagemErro('Digite o código completo de 6 dígitos!');
            setModalErroVisible(true);
            return;
        }

        try {
            setCarregando(true);

            const response = await axios.post(
                `${API_URL}/verificarCodigo`,
                {
                    email: email,
                    codigo: codigo
                }
            );

            await axios.post(
                `${API_URL}/recuperarSenha`,
                {
                    email: email
                }
            );

            setMensagemSucesso(
                response.data.mensagem || 'E-mail verificado com sucesso!'
            );

            setModalSucessoVisible(true);

        } catch (erro) {

            setMensagemErro(
                erro.response?.data?.erro ||
                erro.response?.data?.message ||
                'Não foi possível verificar o código. Tente novamente.'
            );

            setModalErroVisible(true);

        } finally {
            setCarregando(false);
        }
    };

    // REENVIAR CÓDIGO
    const reenviarCodigo = async () => {

        try {
            setReenviando(true);

            await axios.post(
                `${API_URL}/enviarCodigo`,
                {
                    email: email
                }
            );

            setMensagemSucesso('Um novo código foi enviado para seu e-mail!');
            setModalSucessoVisible(true);

        } catch (erro) {

            setMensagemErro(
                erro.response?.data?.message ||
                'Não foi possível reenviar o código.'
            );

            setModalErroVisible(true);

        } finally {
            setReenviando(false);
        }
    };

    return (
        <View style={styles.container}>

            <StatusBar style="auto" />

            {/* CABEÇALHO */}
            <View style={styles.box}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.voltar}
                >
                    <Ionicons
                        name="arrow-back"
                        size={40}
                        color="#50333D"
                    />
                </TouchableOpacity>

                <Image
                    source={require('../../assets/logoSosMulher.png')}
                    style={styles.logo}
                />

                <Text style={styles.title}>
                    Confirmar e-mail
                </Text>

                <Text style={styles.subtitle}>
                    Enviamos um código de verificação para:
                </Text>

                <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
                    {email}
                </Text>

            </View>

            {/* CAMPO DO CÓDIGO */}
            <View style={styles.box}>

                <Text style={styles.subtitle}>
                    Código de verificação
                </Text>

                <View style={styles.inputContainer}>

                    <Feather
                        name="shield"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite os 6 números"
                        placeholderTextColor="#915e70"
                        value={codigo}
                        onChangeText={(texto) =>
                            setCodigo(texto.replace(/[^0-9]/g, '').slice(0, 6))
                        }
                        keyboardType="number-pad"
                        maxLength={6}
                    />

                </View>

            </View>

            {/* BOTÃO CONFIRMAR */}
            <View style={styles.box}>

                <TouchableOpacity
                    onPress={verificarCodigo}
                    style={styles.button}
                    disabled={carregando}
                >

                    {carregando ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.textButton}>
                            Confirmar e-mail
                        </Text>
                    )}

                </TouchableOpacity>

                {/* REENVIAR */}
                <TouchableOpacity
                    onPress={reenviarCodigo}
                    disabled={reenviando}
                    style={{ marginTop: 20, alignItems: 'center' }}
                >

                    {reenviando ? (
                        <ActivityIndicator color="#50333D" />
                    ) : (
                        <Text style={styles.subtitle}>
                            Não recebeu o código? Reenviar
                        </Text>
                    )}

                </TouchableOpacity>

            </View>

            {/* MODAL DE ERRO */}
            <Modal
                visible={modalErroVisible}
                transparent
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.deleteModal}>

                        <Text style={styles.modalTitle}>
                            Erro na verificação
                        </Text>

                        <Text style={styles.modalText}>
                            {mensagemErro}
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonCancelar}
                            onPress={() => setModalErroVisible(false)}
                        >
                            <Text style={styles.textButtonCancelar}>
                                OK
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

            {/* MODAL DE SUCESSO */}
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
                            {mensagemSucesso}
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonCancelar}
                            onPress={() => {
                                setModalSucessoVisible(false);

                                if (mensagemSucesso.includes('verificado')) {
                                    navigation.navigate('Login');
                                }
                            }}
                        >
                            <Text style={styles.textButtonCancelar}>
                                OK
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </View>
    );
}
