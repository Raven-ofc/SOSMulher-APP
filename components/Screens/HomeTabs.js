import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeStack from '../navigations/HomeStack';
import LocalizacaoStack from '../navigations/LocalizacaoStack';
import PerfilStack from '../navigations/PerfilStack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorVitima } from '../contextos/vitimaContexto';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs({ route }) {
  const { vitimaLogada } = route.params

  const insets = useSafeAreaInsets();
  return (
    <ProvedorVitima vitimaLogada={vitimaLogada}>
      <Tab.Navigator
        tabBarPosition='bottom'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#EE5388',
          tabBarInactiveTintColor: '#eba8bf',
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom,
            elevation: 9,
            backgroundColor: '#ffffff'
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
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Local"
          component={LocalizacaoStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={PerfilStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />

      </Tab.Navigator>
    </ProvedorVitima>
  );
}