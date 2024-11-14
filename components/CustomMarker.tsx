import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomMarker = ({ image, title }) => (

  <View style={styles.circleContainer}>
    <Image source={image} style={styles.markerImage} />
  </View>

  
    



);

const styles = StyleSheet.create({


  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 25, // Hace el círculo perfecto
    overflow: 'hidden',
    borderWidth: 3, // Borde blanco
    borderColor: 'white',
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta la imagen dentro del círculo
  },
  titleText: {
    marginTop: -3, // Espacio entre el círculo y el texto
    color: 'black', // Color del texto
    fontWeight: 'normal', // Negrita
    textAlign: 'center', // Centrar el texto
    textShadowColor: 'rgba(255,255,255, 1)', // Color de la sombra
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra
    textShadowRadius: 1, // Radio de la sombra
  },

});

export default CustomMarker;