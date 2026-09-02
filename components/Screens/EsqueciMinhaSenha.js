import { StatusBar } from 'expo-status-bar';
import { 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import {styles} from '../Styles/StyleEsqueciMinhaSenha.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function EsqueciMinhaSenha({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={30} color="#EC6E99" />
        </TouchableOpacity>
        <Image source={require('../../assets/logoSosMulher.png')} style={styles.logo} />
        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.subtitle}>Digite seu email para redefinir a senha!</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Email ou telefone cadastrado</Text>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={24} color="black" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={"#915e70"}></TextInput>
        </View>
      </View>

      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')} style={styles.button}>
                  <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
