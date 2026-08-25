import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';

import { styles } from '../Styles/StyleInicio.js';

export default function Inicio({navigation}) {
  return (
    //C:\expo\SOSMulher\assets -- C:\expo\SOSMulher\assets\logoSosMulher.png
    <LinearGradient colors={['#FEF9FB', '#F6C9D6']} style={styles.container}>
        <View>
          <Image source={require('../../assets/logoSosMulher.png')} style={styles.logo} />
          <Text style={styles.title}>SOS Mulher</Text>
          <Text style={styles.subtitle}>Você não está sozinha</Text>
          <Feather name="heart" size={24} color="#EC6E99"  style={styles.icon}/>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
            <Text style={styles.textButton}>Começar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </LinearGradient>
  );
}
