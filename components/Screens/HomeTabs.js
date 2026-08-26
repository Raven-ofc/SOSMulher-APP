import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './home';
import Localizacao from './localizacao';
import AnjosDaGuarda from './anjosDaGuarda';
import Perfil from './meuPerfil';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: 'gray',
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
      />

      <Tab.Screen
        name="Localização"
        component={Localizacao}
      />

      <Tab.Screen
        name="Anjos da Guarda"
        component={AnjosDaGuarda}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />

    </Tab.Navigator>
  );
}