// Likes.tsx
import React from 'react';
import Colors from "../../constants/Colors";
import { StyleSheet, Text, View } from 'react-native';

const listadoPuntos: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntos Turísticos</Text>
      <Text style={styles.subtitle}>de la Ciudad de La Plata</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    backgroundColor: Colors.varios.background, // Fondo claro
  },
  title: {
    fontSize: 24, // Tamaño del título
    fontWeight: 'bold', // Negrita
    color: Colors.varios.text, // Color del título
    marginBottom: 10, // Espacio debajo del título
  },
  subtitle: {
    fontSize: 16, // Tamaño del subtítulo
    color: '#666', // Color del subtítulo
  },
});

export default listadoPuntos;
