import React from 'react';

import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import HomeStack from '../navigations/HomeStack';
import LocalizacaoStack from '../navigations/LocalizacaoStack';
import AnjoStack from '../navigations/AnjoStack';
import PerfilStack from '../navigations/PerfilStack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {
  const insets = useSafeAreaInsets();
  return (
      <Tab.Navigator
        tabBarPosition='bottom'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4084e4',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom,
            elevation:6
          },
          tabBarIndicatorStyle: {
            display: 'none'
          }
        }}
      >

        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size}) =>(
              <Ionicons name="home" size={size} color={color}/>
            ),
          }}
        />

        <Tab.Screen
          name="Local"
          component={LocalizacaoStack}
          options={{
            tabBarIcon: ({ color, size}) =>(
              <Ionicons name="location" size={size} color={color}/>
            ),
          }}
        />

        <Tab.Screen
          name="Guardiões"
          component={AnjoStack}
          options={{
            tabBarIcon: ({ color, size}) =>(
              <Ionicons name="call" size={size} color={color}/>
            ),
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={PerfilStack}
          options={{
            tabBarIcon: ({ color, size}) =>(
              <Ionicons name="person" size={size} color={color}/>
            ),
          }}
        />

      </Tab.Navigator>
  );
}