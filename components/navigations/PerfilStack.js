
import { createStackNavigator } from '@react-navigation/stack';

import MeuPerfil from '../Screens/meuPerfil';
import EditarPerfil from '../Screens/dadosPessoais';
import SobreApp from '../Screens/sobreApp';
import Privacidade from '../Screens/privacidade';
import GuiaApp from '../Screens/guiaApp';
import RedefinirSenha from '../Screens/redefinirSenha'

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
        name="Redefinir"
        component={RedefinirSenha}
      />

      <Stack.Screen
        name='GuiaApp'
        component={GuiaApp}
      />

      <Stack.Screen
        name="SobreAPP"
        component={SobreApp}
      />

      <Stack.Screen
        name="Privacidade"
        component={Privacidade}
      />


      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
      />

    </Stack.Navigator>
  );
}