
import { createStackNavigator } from '@react-navigation/stack';

import Localizacao from '../Screens/localizacao';
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

    </Stack.Navigator>
  );
}