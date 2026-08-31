
import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../Styles/StyleHome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

  const navigation = useNavigation();

  const onda1 = useRef(new Animated.Value(0)).current;
  const onda2 = useRef(new Animated.Value(0)).current;

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

    );
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

    );

    animacao1.start();
    animacao2.start();
    return () => {
      animacao1.stop();
      animacao2.stop();
    };

  }, []);

  const escalaOnda1 = onda1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const opacidadeOnda1 = onda1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.2, 0],
  });

  const escalaOnda2 = onda2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const opacidadeOnda2 = onda2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.2, 0],
  });

  return (

    <View style={styles.container}>

      <ScrollView>

        <View style={styles.alertaVerde}>
          <Feather name="shield" size={34} color="#53997B" />
          <Text style={styles.titulo}>Você está em segurança!</Text>
          <Text style={styles.subTitulo}>O agressor se encontra longe do raio da medida.</Text>
        </View>


        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
            <TouchableOpacity onPress={() => navigation.navigate('Alerta')}
              style={styles.button}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                Botão do Pânico
              </Text>
            </TouchableOpacity>

          </View>


          <Text style={styles.textMainHome}>
            Seus contatos e autoridades serão notificados imediatamente!
          </Text>

        </View>


        <View style={styles.acesso}>
          <Text style={styles.textAcesso}>Acesso Rápido</Text>
          <View style={styles.viewAcesso}>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.chamar}>
                <MaterialIcons name="local-police" size={32} color="#FEF9FB" />
              </TouchableOpacity>
              <Text style={styles.textBotao}>Polícia</Text>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.chamar}>
                <MaterialIcons name="phone" size={32} color="#FEF9FB" />
              </TouchableOpacity>
              <Text style={styles.textBotao}>Contato de Emergência</Text>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.chamar}>
                <Ionicons name="shield-checkmark" size={32} color={"#FEF9FB"}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.textBotao}>Dicas de Segurança</Text>
            </View>

          </View>
        </View>

      </ScrollView>

    </View>

  );
}

