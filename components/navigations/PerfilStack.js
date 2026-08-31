
import { createStackNavigator } from '@react-navigation/stack';

import MeuPerfil from '../Screens/meuPerfil';
import EditarPerfil from '../Screens/dadosPessoais';

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="MeuPerfil"
            component={MeuPerfil}
          />
          
          <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
          />

        </Stack.Navigator>
  );
}