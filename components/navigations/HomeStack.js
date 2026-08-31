
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/home';
import Alerta from '../Screens/alertaEnviado';

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

        </Stack.Navigator>
  );
}