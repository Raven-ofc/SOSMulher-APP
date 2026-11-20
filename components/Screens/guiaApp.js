
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity
} from 'react-native';

import { styles } from '../Styles/StyleInfos.js';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

export default function GuiaApp({ navigation }) {

    const [abaSelecionada, setAbaSelecionada] = useState(0);

    const abas = [
        'Botão pânico',
        'Nosso mapa'
    ];


    const onda1 = useRef(new Animated.Value(0)).current
    const onda2 = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const animacao1 = Animated.loop(

            Animated.sequence([

                Animated.timing(onda1, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),

                Animated.timing(onda1, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),

            ])

        )
        const animacao2 = Animated.loop(

            Animated.sequence([

                Animated.delay(1000),

                Animated.timing(onda2, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),

                Animated.timing(onda2, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),

            ])

        )

        animacao1.start()
        animacao2.start()
        return () => {
            animacao1.stop()
            animacao2.stop()
        }

    }, [])

    const escalaOnda1 = onda1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    })

    const opacidadeOnda1 = onda1.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.5, 0.2, 0],
    })

    const escalaOnda2 = onda2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    })

    const opacidadeOnda2 = onda2.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.5, 0.2, 0],
    })

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.voltar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={40}
                            color="#50333D"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerTitulo}>
                        Guia do App
                    </Text>
                </View>

                {/* Navegação das abas */}
                <View style={styles.abasContainer}>
                    {abas.map((aba, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.aba, abaSelecionada === index && styles.abaAtiva]}
                            onPress={() => setAbaSelecionada(index)}
                        >
                            <Text style={[styles.textoAba, abaSelecionada === index && styles.textoAbaAtiva]}>
                                {aba}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Conteúdo principal */}
                <View style={styles.cont}>

                    {/* ABA 1 - BOTÃO DE PÂNICO */}
                    {abaSelecionada === 0 && (

                        <View style={styles.sectionTextos}>

                            <Text style={styles.titulo}>O que é?</Text>

                            <Text style={styles.SobreApp}>
                                É a função principal de segurança do aplicativo, criada para avisar rapidamente quem você está correndo perigo e notificar a polícia quando houver perigo.
                            </Text>

                            <View style={styles.divisor} />

                            <Text style={styles.titulo}>Como funciona?</Text>
                            <Text style={styles.subtitulo}>1.Indicador de segurança</Text>

                            <Text style={styles.SobreApp}>
                                Na tela principal, você verá uma indicação do seu status (se está em segurança com o agressor longe, ou em alerta se ele estiver se aproximando).
                            </Text>


                            <View style={[styles.alerta, { backgroundColor: '#53997B' }]}>
                                <Feather name="shield" size={34} color="#FFFFFF" />

                                <Text style={styles.tituloAlerta}>
                                    VOCÊ ESTÁ EM SEGURANÇA!
                                </Text>

                                <Text style={styles.mensagemAlerta}>
                                    O agressor está fora da zona de alerta.
                                </Text>
                            </View>

                            <Text style={styles.expAlerta}>Indica que o agressor está no raio de distância adequado</Text>

                            {/* Indicador de alerta */}
                            <View style={[styles.alerta, { backgroundColor: '#eece6d' }]}>
                                <Feather name="shield" size={34} color="#FFFFFF" />

                                <Text style={styles.tituloAlerta}>
                                    ALERTA DE APROXIMAÇÃO
                                </Text>

                                <Text style={styles.mensagemAlerta}>
                                    Atenção! o agressor está nas proximidades
                                </Text>
                            </View>

                            <Text style={styles.expAlerta}>O agressor violou o raio de distância. Recomenda-se buscar um lugar seguro e entrar em contato com alguém de confiança</Text>

                            {/* Indicador de perigo */}
                            <View style={[styles.alerta, { backgroundColor: '#EF4444' }]}>
                                <Feather name="shield" size={34} color="#FFFFFF" />

                                <Text style={styles.tituloAlerta}>
                                    ALERTA CRÍTICO!
                                </Text>

                                <Text style={styles.mensagemAlerta}>
                                    O agressor ultrapassou o limite da medida protetiva, as autoridades foram alertadas!
                                </Text>
                            </View>

                            <Text style={styles.expAlerta}>Vá imediatamente até a delegacia mais proxima ou a um local seguro.
                                A policia já foi automaticamente acionada</Text>

                            <Text style={styles.subtitulo}>2.Botão do pânico</Text>

                            <Text style={styles.SobreApp}>
                                Se você se sentir ameaçada ou o agressor se aproximar, basta tocar nesse botão. O aplicativo enviará um aviso imediato para os seus contatos de confiança e acionará as autoridades competentes.
                            </Text>

                            <View style={styles.animeContainer}>

                                <Animated.View
                                    pointerEvents="none"
                                    style={[
                                        styles.onda,
                                        {
                                            opacity: opacidadeOnda1,
                                            transform: [
                                                { scale: escalaOnda1 }
                                            ],
                                        },
                                    ]}
                                />
                                <Animated.View
                                    pointerEvents="none"
                                    style={[
                                        styles.onda,
                                        {
                                            opacity: opacidadeOnda2,
                                            transform: [
                                                { scale: escalaOnda2 }
                                            ],
                                        },
                                    ]}
                                />
                                <View style={styles.button}>
                                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                                        Botão do Pânico
                                    </Text>
                                </View>

                            </View>

                            <Text style={styles.SobreApp}>
                                Uma tela de confirmação aparecerá dizendo "Alerta enviado!" e dará orientações simples de o que fazer, como procurar um local seguro, manter o celular ligado e aguardar a ajuda chegar.
                            </Text>

                            <View style={styles.cardConfirmacao}>
                                <View style={styles.box}>
                                    <Ionicons name="shield-checkmark-outline" size={100} color="#EC6E99" />
                                    <Text style={styles.titulo}>Alerta Enviado!</Text>
                                    <Text style={styles.subTituloAlerta}>Seus contatos e autoridades foram notificados.</Text>
                                </View>
                            </View>

                        </View>
                    )}

                    {abaSelecionada === 1 && (

                        <View style={styles.sectionTextos}>

                            <Text style={styles.titulo}>O que é?</Text>

                            <Text style={styles.SobreApp}>
                                Um mapa personalizado com o seu endereço, as delegacias convencionais e as DDMS (delegacias da mulher) para facilitar a orientação rápida em caso de necessidade.
                            </Text>

                            <View style={styles.divisor} />

                            <Text style={styles.titulo}>Como funciona?</Text>

                            <Text style={styles.expAlerta}>
                                Para filtrar as localizações e dar zoom no seu endereço ou numa delegacia basta clicar nesse botão com símbolo de mapa.
                            </Text>
                            <View style={styles.buttonSectionMapa}>
                                <View
                                    style={styles.buttonMapa}>
                                    <Ionicons name='map' size={30} color={'#D7A6BF'}></Ionicons>
                                </View>
                            </View>

                            <Text style={styles.expAlerta}>
                                Para dar zoom na própria localização basta clicar nesse botão com símbolo de Localização.
                            </Text>

                            <View style={styles.buttonSectionMapa}>
                                <View
                                    style={styles.buttonMapa}>
                                    <Ionicons name='location' size={30} color={'#D7A6BF'}></Ionicons>
                                </View>
                            </View>

                            <Text style={styles.expAlerta}>
                                Para dar zoom na delegacia mais próxima clique no botão com um escudo.
                            </Text>

                            <View style={styles.buttonSectionMapa}>
                                <View
                                    style={styles.buttonMapa}
                                >
                                    <Ionicons
                                        name="shield-checkmark"
                                        size={30}
                                        color={'#EC6E99'}
                                    />
                                </View>

                            </View>

                            <Text style={styles.SobreApp}>
                                {/* Explique como utilizar o mapa */}
                            </Text>

                        </View>
                    )}

                </View>

            </ScrollView>

        </View>
    );
}
