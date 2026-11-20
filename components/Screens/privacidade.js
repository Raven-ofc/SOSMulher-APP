import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/StylePrivacidade.js';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';


export default function Privacidade({ navigation }) {

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
                    <Text style={styles.headerTitulo}>Privacidade</Text>
                </View>

                <View style={styles.cont}>
                    <View style={styles.principalCont}>
                        <View style={styles.containerFoto}>
                            <Feather name='lock' size={70} color={'#EC6E99'} />
                        </View>

                    </View>
                    <View style={styles.sectionTextos}>
                        <Text style={styles.titulo}>Sigilo Absoluto</Text>
                        <Text style={styles.SobreApp}>Suas informações e o uso do botão de pânico são mantidos em total sigilo, protegidos contra o acesso de pessoas não autorizadas..</Text>

                        <View style={styles.divisao}></View>

                        <Text style={styles.titulo}>Compartilhamento Controlado</Text>
                        <Text style={styles.SobreApp}>O aplicativo só compartilha a sua localização e os alertas com os contatos de confiança que você escolheu cadastrar e com as autoridades competentes em caso de emergência.</Text>

                        <View style={styles.divisao}></View>

                        <Text style={styles.titulo}>Controle Total</Text>
                        <Text style={styles.SobreApp}>Você tem autonomia para gerenciar seus dados a qualquer momento, garantindo que sua privacidade e sua segurança venham sempre em primeiro lugar.</Text>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}