import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/StyleAnjo.js';

const contatos = [
  {
    id: '1',
    nome: 'Mãe',
    telefone: '(11) 99999-9999',  
    email: 'mainha@gmail.com',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEjKT1AN18ljRhugPc_-kzVHcLiK2QZNcxgfvmYn5F_g&s=10',
  },
  {
    id: '2',
    nome: 'Irmã',
    telefone: '(11) 99997-9999',  
    email: 'Marilene@gmail.com',
    foto: 'https://i.pinimg.com/236x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg',
  },
  {
    id: '3',
    nome: 'Prima',
    telefone: '(11) 99998-9999',  
    email: 'Marcilene@gmail.com',
    foto: 'https://i.pinimg.com/236x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg',
  }
];

export default function AnjosDaGuarda({navigation}) {
  const renderConversa = ({ item }) => (
    <TouchableOpacity 
      onPress={() => 
      navigation.navigate('DetalheAnjo', {
        contato: item
      })} 
      style={styles.item}>
      <Image source={{ uri: item.foto }} style={styles.foto} />
      <View style={styles.textos}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.fone}>{item.telefone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Anjos da Guarda</Text>
        <Text style={styles.headerSubtitulo}>Seus contatos de segurança que serão 
          notificados em caso de emergência!
        </Text>
      </View>

      {/* Lista de conversas */}
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderConversa}
      />

      <TouchableOpacity
        onPress={()=>
          navigation.navigate('AdicionarAnjo')
        } 
        style={styles.button}
      >
        <Text style={styles.textButton}>+ Adicionar Contato</Text>
      </TouchableOpacity>
    </View>
  );
}