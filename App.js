import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './components/Screens/inicio';
import Login from './components/Screens/login';
import EsqueciMinhaSenha from './components/Screens/EsqueciMinhaSenha';
import ConfirmarEmail from './components/Screens/ConfirmarEmail'
import RegistrarViolacao from './components/Screens/RegistrarViolacao';

import HomeTabs from './components/Screens/HomeTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetalheAnjo from './components/Screens/detalheAnjo';
import * as Notifications from 'expo-notifications'
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go',
])


const Stack = createStackNavigator();

export default function App() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

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
            name="EsqueciMinhaSenha"
            component={EsqueciMinhaSenha}
          />
          <Stack.Screen
            name="ConfirmarEmail"
            component={ConfirmarEmail}
            options={{ headerShown: false }}
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