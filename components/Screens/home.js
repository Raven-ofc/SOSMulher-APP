import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Bem-vinda!
      </Text>

      <Text style={styles.subtitle}>
        Esta é a tela inicial do aplicativo.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
});