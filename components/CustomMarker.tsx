import React from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomMarker = ({ image, title }) => (
  <View style={styles.markerWrapper}>
    {/* Contenedor Circular */}
    <View style={styles.circleContainer}>
      <Image source={image} style={styles.markerImage} />
    </View>
    
    <Text style={styles.titleText}>{title}</Text>


  </View>
);

const styles = StyleSheet.create({
    markerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedMarkerWrapper: {
      borderWidth: 2,
      borderColor: 'blue', // Cambia el color o el estilo para el marcador seleccionado
      borderRadius: 30,
      padding: 5, // Espacio adicional para el contorno
    },
    circleContainer: {
      width: 50,
      height: 50,
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
        textShadowOffset: { width: 1, height: 1}, // Desplazamiento de la sombra
        textShadowRadius: 1, // Radio de la sombra
      },

  });

export default CustomMarker;