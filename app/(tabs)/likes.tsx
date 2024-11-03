// Likes.tsx
import React from 'react';
import Colors from "../../constants/Colors";
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import {markers} from '../../assets/markers';


export default function PuntosTuristicosScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Puntos Turísticos</Text>
        <Text style={styles.subtitleText}>de la Ciudad de La Plata</Text>
      </View>

      <View style={styles.separator}>
      <FlatList
        data={markers} // Usamos los markers importados como data
        keyExtractor={(item) => item.id.toString()} // Convierte el id a string para usarlo como clave
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.imagen} />
            <View style={styles.textContainer}>
              <Text style={styles.nombre}>{item.title}</Text>
              <Text style={styles.descripcion}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    marginTop:5, // Ajusta el margen inferior para controlar la separación
    backgroundColor: Colors.varios.background,
    padding: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.varios.background,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.varios.subicon,
    borderRadius: 15,
    padding: 10, //separacion entre lo que está adentro y el borde
    marginVertical: 8, //separacion entre rectangulos
    marginHorizontal: 15, //separacion de los costados de la pantalla del celular
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  separator: {
    height: 450, // Ajusta la altura si deseas un separador entre los contenedores
  },
   imagen: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  titleText: {
    fontFamily: "outfit-Medium",
    color: Colors.varios.text, // 
    fontSize: 32, // 
    textAlign: 'center', // Asegura que el texto esté centrado
    marginBottom: 10,
    marginTop:60,
  },
  subtitleText: {
    fontFamily: "outfit-Medium",
    color: Colors.varios.text, // Cambia 'blue' por el color deseado
    fontSize: 20, // Ajusta el tamaño de la fuente según sea necesario
    textAlign: 'center', // Asegura que el texto esté centrado
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "outfit",
    color: 'black',
  },
  descripcion: {
    fontSize: 14,
    fontFamily: "outfit",
    color: 'black',
  }
});




