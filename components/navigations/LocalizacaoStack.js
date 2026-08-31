
import { createStackNavigator } from '@react-navigation/stack';

import Localizacao from '../Screens/localizacao';
import EditarLocalizacao from '../Screens/editarLocalizacao';
import AdicionarLocal from '../Screens/adicionarLocal'
const Stack = createStackNavigator();

export default function LocalizacaoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Localizacao"
        component={Localizacao}
      />

      <Stack.Screen
        name="EditarLocalizacao"
        component={EditarLocalizacao}
      />

      <Stack.Screen
        name="AdicionarLocal"
        component={AdicionarLocal}
      />

    </Stack.Navigator>
  );
}