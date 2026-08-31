
import { createStackNavigator } from '@react-navigation/stack';

import AdicionarAnjo from '../Screens/adicionarAnjo';
import DetalheAnjo from '../Screens/detalheAnjo';
import AnjosDaGuarda from '../Screens/anjosDaGuarda';

const Stack = createStackNavigator();

export default function AnjoStack() {
  return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="AnjosDaGuarda"
            component={AnjosDaGuarda}
          />
          
          <Stack.Screen
            name="AdicionarAnjo"
            component={AdicionarAnjo}
          />

          <Stack.Screen
            name="DetalheAnjo"
            component={DetalheAnjo}
          />

        </Stack.Navigator>
  );
}