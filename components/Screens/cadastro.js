import { StatusBar } from 'expo-status-bar';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { styles } from '../Styles/StyleCadastro.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function Cadastro({navigation}) {
  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={30} color="#EC6E99" />
        </TouchableOpacity>
        <Image source={require('../../assets/logoSosMulher.png')} style={styles.logo} />
        <Text style={styles.title}>Bem-vinda!</Text>
        <Text style={styles.subtitle}>Faça seu cadastro para continuar!</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-remove-outline" size={24} color="black" />
          <TextInput style={styles.input} placeholder="Nome"></TextInput>
        </View>
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
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Feather name="eye" size={24} color="black" style={styles.icon}/>
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder="Confirmar Senha" secureTextEntry={true}></TextInput>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EsqueciMinhaSenha')}>
          <Text style={styles.textButton2}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')} style={styles.button}>
                  <Text style={styles.textButton}>Cadastro</Text>
                </TouchableOpacity>
                <Text style={styles.link1}>Já tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link2}>Fazer Login</Text>
                </TouchableOpacity>
      </View>
    </View>
  );
}

