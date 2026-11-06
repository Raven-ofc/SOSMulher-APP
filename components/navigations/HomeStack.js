
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/home';
import Alerta from '../Screens/alertaEnviado';
import RegistrarViolacao from '../Screens/RegistrarViolacao';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="Alerta"
        component={Alerta}
      />
      <Stack.Screen
        name="RegistrarViolacao"
        component={RegistrarViolacao}
      />

    </Stack.Navigator>
  );
}