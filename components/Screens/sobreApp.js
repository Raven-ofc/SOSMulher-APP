import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/StyleSobre.js';
import { Ionicons } from '@expo/vector-icons';


export default function SobreApp({ navigation }) {

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
                    <Text style={styles.headerTitulo}>Sobre o App</Text>
                </View>

                <View style={styles.cont}>
                    <View style={styles.principalCont}>
                        <View style={styles.containerFoto}>
                            <Image source={require('../../assets/logoSosMulher.png')} style={styles.fotoCont} />
                        </View>
                        <Text style={styles.titulo}>SOS Mulher</Text>
                        <View style={styles.divisao}></View>
                    </View>
                    <Text style={styles.SobreApp}>É onde você começar a usar a sua proteção no celular pra você mesmo sem se preocupar, nôs atentos com sua segurança e você livre de preocupações sem correr riscos.</Text>
                </View>
            </ScrollView>
        </View>
    );
}