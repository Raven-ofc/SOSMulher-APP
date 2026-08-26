import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../Styles/StyleLogin.js';

export default function Login({navigation}) {
  return (
    <View style={styles.container}>

      <View style={styles.inicio}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={30} color="#EC6E99" />
        </TouchableOpacity>
        <Image source={require('../../assets/logoSosMulher.png')} style={styles.logo} />
        <Text style={styles.title}>Bem-vinda!</Text>
        <Text style={styles.subtitle}>Faça login para continuar!</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={24} color="black" />
          <TextInput style={styles.input} placeholder="Email"></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Feather name="eye" size={24} color="black" style={styles.icon}/>
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}></TextInput>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EsqueciMinhaSenha')}>
          <Text style={styles.textButton2}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')} style={styles.button}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.link1}>Ainda não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link2}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

