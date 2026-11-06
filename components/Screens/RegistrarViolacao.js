
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Modal,
    ActivityIndicator,
    Platform,
    StyleSheet
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import * as Location from 'expo-location';
import { usarVitima } from '../contextos/vitimaContexto.js';
import {styles} from '../Styles/StyleViolacao.js'
// Ajuste o endereço conforme o IP do seu Laravel.
const API_URL = 'http://seuip:8000/api';
const API_AGRESSOR = 'http://seuip:8000/api/localAgressor'

// Substitua pelos tipos exatos apresentados na sua tabela.
const TIPOS_VIOLACAO = [
    'Invasão de zona de exclusão',
    'Perseguição(Stalking)',
    'Ameaça'
];

export default function RegistrarViolacao({ navigation }) {
    const { vitimaLogada } = usarVitima();

    const [medidaAgressor, setMedidaAgressor] = useState(null);
    const [tipoSelecionado, setTipoSelecionado] = useState('');
    const [descricao, setDescricao] = useState('');
    const [carregando, setCarregando] = useState(false);

    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [modalErro, setModalErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    const buscarMedidaAgressor = async () => {
        try {
            if (!vitimaLogada?.idVitima) return;

            const resposta = await axios.get(
                `${API_AGRESSOR}/${vitimaLogada.idVitima}`
            );

            const agressores = resposta.data.localizacoesAgressor || [];

            const agressor = agressores.find(
                item => item.idMedida != null
            );

            if (!agressor) {
                console.log('Nenhuma medida protetiva encontrada.');
                setMedidaAgressor(null);
                return;
            }

            setMedidaAgressor({
                idMedida: agressor.idMedida,
                distanciaMedida: Number(agressor.distanciaMedida),
                raioAlertaMedida: Number(agressor.raioAlertaMedida),
                latitude: Number(agressor.latitude),
                longitude: Number(agressor.longitude)
            });

            console.log('Medida protetiva:', agressor.idMedida);

        } catch (error) {
            console.log(
                'Erro ao buscar medida:',
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        buscarMedidaAgressor();
    }, [vitimaLogada?.idVitima]);

    const enviarViolacao = async () => {
        if (!tipoSelecionado || !descricao.trim()) {
            setMensagemErro('Selecione o tipo de violação e descreva o ocorrido.');
            setModalErro(true);
            return;
        }

        try {
            setCarregando(true);

            if (
                !medidaAgressor?.idMedida ||
                !Number.isFinite(medidaAgressor.latitude) ||
                !Number.isFinite(medidaAgressor.longitude)
            ) {
                setMensagemErro(
                    'Não foi possível obter a localização atual do agressor. Tente novamente.'
                );
                setModalErro(true);
                return;
            }

            const dados = {
                tipoViolacao: tipoSelecionado,
                descricaoViolacao: descricao.trim(),
                latitudeViolacao: medidaAgressor.latitude,
                longitudeViolacao: medidaAgressor.longitude,
            };

            console.log('Medida recebida:', medidaAgressor);

            console.log('Dados enviados:', {
                tipoViolacao: tipoSelecionado,
                descricaoViolacao: descricao.trim(),
                latitudeViolacao: medidaAgressor.latitude,
                longitudeViolacao: medidaAgressor.longitude,
            });

            const response = await axios.post(
                `${API_URL}/registrarViolacao/${medidaAgressor.idMedida}`,
                dados
            );

            setModalConfirmacao(false);

            // O alerta foi registrado no servidor.
            navigation.navigate('Alerta');

        } catch (erro) {
            console.error(
                'Erro ao registrar violação:',
                erro.response?.data || erro.message
            );

            setMensagemErro(
                erro.response?.data?.message ||
                'Não foi possível registrar a ocorrência. Tente novamente.'
            );

            setModalErro(true);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Cabeçalho */}
                    <View style={styles.voltar}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="arrow-back"
                                size={35}
                                color="#50333D"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headerTitulo}>
                            Registrar Violação
                        </Text>

                        <Text style={styles.headerDescricao}>
                            Informe o que aconteceu para que sua ocorrência
                            seja registrada.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.alerta}>
                            <Ionicons
                                name="warning"
                                size={25}
                                color="#EC6E99"
                            />

                            <Text style={styles.alertaTexto}>
                                Selecione a situação que está acontecendo.
                            </Text>
                        </View>

                        {/* Tipos de violação */}
                        <Text style={styles.tituloCampo}>
                            Tipo de violação
                        </Text>

                        <View style={styles.listaTipos}>
                            {TIPOS_VIOLACAO.map((tipo, index) => {
                                const selecionado = tipoSelecionado === tipo;

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.opcaoTipo,
                                            selecionado && styles.opcaoSelecionada
                                        ]}
                                        onPress={() => setTipoSelecionado(tipo)}
                                        activeOpacity={0.8}
                                    >
                                        <View style={styles.opcaoConteudo}>
                                            <Ionicons
                                                name="alert-circle-outline"
                                                size={23}
                                                color={selecionado ? '#FFFFFF' : '#915E70'}
                                            />

                                            <Text
                                                style={[
                                                    styles.textoTipo,
                                                    selecionado && styles.textoSelecionado
                                                ]}
                                            >
                                                {tipo}
                                            </Text>
                                        </View>

                                        <Ionicons
                                            name={
                                                selecionado
                                                    ? 'radio-button-on'
                                                    : 'radio-button-off'
                                            }
                                            size={22}
                                            color={selecionado ? '#FFFFFF' : '#915E70'}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Descrição */}
                        <Text style={styles.tituloCampo}>
                            Descreva o ocorrido
                        </Text>

                        <Text style={styles.subtituloCampo}>
                            Conte o que aconteceu, quando aconteceu e
                            qualquer informação importante.
                        </Text>

                        <TextInput
                            style={styles.textArea}
                            placeholder="Descreva a situação..."
                            placeholderTextColor="#A98793"
                            multiline
                            textAlignVertical="top"
                            maxLength={1000}
                            value={descricao}
                            onChangeText={setDescricao}
                        />

                        <Text style={styles.contador}>
                            {descricao.length}/1000
                        </Text>

                        {/* Botões */}
                        <View style={styles.buttonSection}>
                            <TouchableOpacity
                                style={styles.buttonCancelar}
                                onPress={() => navigation.goBack()}
                                disabled={carregando}
                            >
                                <Text style={styles.textCancelar}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonEnviar}
                                onPress={() => setModalConfirmacao(true)}
                                disabled={carregando}
                            >
                                <Text style={styles.textEnviar}>
                                    Enviar alerta
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Modal de confirmação */}
            <Modal
                visible={modalConfirmacao}
                transparent
                animationType="fade"
                onRequestClose={() => setModalConfirmacao(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <Ionicons
                            name="alert-circle"
                            size={45}
                            color="#EC6E99"
                        />

                        <Text style={styles.modalTitulo}>
                            Confirmar violação?
                        </Text>

                        <Text style={styles.modalTexto}>
                            Deseja registrar essa violação e enviar as
                            informações?
                        </Text>

                        <View style={styles.buttonSection}>
                            <TouchableOpacity
                                style={styles.buttonCancelar}
                                onPress={() => setModalConfirmacao(false)}
                                disabled={carregando}
                            >
                                <Text style={styles.textCancelar}>
                                    Voltar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonEnviar}
                                onPress={enviarViolacao}
                                disabled={carregando}
                            >
                                {carregando ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.textEnviar}>
                                        Confirmar
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de erro */}
            <Modal
                visible={modalErro}
                transparent
                animationType="fade"
                onRequestClose={() => setModalErro(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <Ionicons
                            name="close-circle"
                            size={45}
                            color="#D9534F"
                        />

                        <Text style={styles.modalTitulo}>
                            Não foi possível continuar
                        </Text>

                        <Text style={styles.modalTexto}>
                            {mensagemErro}
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonEnviar}
                            onPress={() => setModalErro(false)}
                        >
                            <Text style={styles.textEnviar}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
