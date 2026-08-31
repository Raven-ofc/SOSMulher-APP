import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './components/Screens/inicio';
import Login from './components/Screens/login';
import Cadastro from './components/Screens/cadastro';
import EsqueciMinhaSenha from './components/Screens/EsqueciMinhaSenha';

import HomeTabs from './components/Screens/HomeTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetalheAnjo from './components/Screens/detalheAnjo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >

          <Stack.Screen
            name="Inicio"
            component={Inicio}
          />

          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
          />

          <Stack.Screen
            name="EsqueciMinhaSenha"
            component={EsqueciMinhaSenha}
          />

          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
          />
          
          <Stack.Screen
            name="DetalheAnjo"
            component={DetalheAnjo}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}