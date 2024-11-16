// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TextInput, ScrollView, Linking, TouchableOpacity, Dimensions } from 'react-native';
// import { markers } from '../../assets/markers';
// import Colors from "../../constants/Colors";
// import * as Speech from 'expo-speech'; // Importar la biblioteca de voz
// import Tts from 'react-native-tts'; // Importar Tts
// import Icon from 'react-native-vector-icons/FontAwesome'; // Importar el icono

// const screenWidth = Dimensions.get('window').width;



// const MarkerDetailsScreen = () => {
//     const [selectedId, setSelectedId] = useState<number | null>(null);
//     const selectedMarker = markers.find(marker => marker.id === selectedId);

    

//     // Función para reproducir la descripción
//     // const speakDescription = () => {
//     //      if (selectedMarker && selectedMarker.description) {
//     //          console.log("Descripción a hablar:", selectedMarker.description);
//     //          try {
//     //              Speech.speak(selectedMarker.description, {
//     //                  language: 'es-ES', // Cambia el idioma si es necesario
//     //              });
//     //          } catch (error) {
//     //             console.error("Error al hablar:", error);
//     //          }
//     //      } else {
//     //          console.log("No hay descripción para hablar.");
//     //      }
//     //  };
//     const speakDescription = () => {
//         const greeting = 'City Tour La Plata';
//         Speech.speak(greeting)
//     };

//     // const speakDescription = () => {
//     //     if (selectedMarker && selectedMarker.description) {
//     //         console.log("Descripción a hablar:", selectedMarker.description);
//     //         Tts.setDefaultLanguage('es-ES'); // Cambia el idioma si es necesario
//     //         Tts.speak(selectedMarker.description);
//     //     } else {
//     //         console.log("No hay descripción para hablar.");
//     //     }
//     // };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.label}>Seleccione el ID del marcador:</Text>
//             <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 placeholder="Ingrese un ID"
//                 onChangeText={(text) => setSelectedId(parseInt(text) || null)}
//             />
            
//             {selectedMarker ? (
//                 <View style={styles.detailsContainer}>
//                     <Image source={selectedMarker.image} style={styles.image} resizeMode="cover"/>

//                     {/* Contenedor para el título y el botón */}
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>{selectedMarker.title}</Text>
//                         <TouchableOpacity onPress={speakDescription} style={styles.circleButton}>
//                             <Icon name="volume-up" size={20} color="#fff" />
//                             <Text style={styles.buttonText}>Escuchar</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <Text style={styles.description}>{selectedMarker.description}</Text>

//                     {selectedMarker.instagram && (
//                         <TouchableOpacity onPress={() => Linking.openURL(selectedMarker.instagram)} style={styles.linkContainer}>
//                             <Text style={styles.textlink}>Visite la página de </Text>
//                             <Text style={styles.link}>Instagram</Text>
//                         </TouchableOpacity>
//                     )}

//                     {selectedMarker.sitioOficial && (
//                         <TouchableOpacity onPress={() => Linking.openURL(selectedMarker.sitioOficial)} style={styles.linkContainer}>
//                             <Text style={styles.textlink}>Visite el </Text>
//                             <Text style={styles.link}>Sitio Oficial</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             ) : (
//                 <Text style={styles.noMarkerText}>No hay marcador con el ID seleccionado.</Text>
//             )}
//         </ScrollView>
//     );
// };
// export default MarkerDetailsScreen;

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: Colors.varios.background,
//         alignItems: 'center',
//     },
    
//     linkContainer: {
//         flexDirection: 'row',  // Alinea los textos horizontalmente
//         alignItems: 'center',   // Centra verticalmente los elementos
//         marginBottom: 8,        // Espacio inferior
//     },
//     label: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     input: {
//         width: '80%',
//         padding: 10,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     detailsContainer: {
//         padding: 0,
//         backgroundColor: Colors.varios.subicon,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 5,
//         elevation: 5,
//     },
//     titleContainer: {
//         flexDirection: 'row', // Alinea el título y el botón en una fila
//         alignItems: 'center', // Centra verticalmente los elementos
//         justifyContent: 'space-between', // Espacia los elementos
//         width: '100%', // Toma el ancho completo del contenedor
//         marginVertical: 10, // Espaciado vertical
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 8,
//         fontFamily: "outfit",
//         color: 'black', 
//         textAlign: 'left',
//         paddingLeft: 25,
        
//     },
//     description: {
//         fontSize: 16,
//         textAlign: 'justify',
//         marginBottom: 15,
//         fontFamily: "outfit",
//         color: 'black',
//         paddingLeft: 25,
//         paddingRight: 25,
//     },
//     textlink: {
//         fontSize: 16,
//         textAlign: 'justify',
//         marginBottom: 15,
//         fontFamily: "outfit",
//         color: 'black',
//         paddingLeft: 25,
//         lineHeight: 20, 
//     },
//     image: {
//         width: screenWidth,   // Ancho completo de la pantalla
//         height: screenWidth * 0.6,  // Ajusta la altura según el ancho
//         marginBottom: 16,
//     },
//     link: {
//         color: 'blue',      // Color azul para indicar que es un link
//         textDecorationLine: 'underline', // Subrayado para el texto del link
//         marginBottom: 15,
//         lineHeight: 20, 
//         fontFamily: "outfit",

//     },
//     noMarkerText: {
//         fontSize: 16,
//         color: 'white',
//         textAlign: 'center',
//         marginTop: 20,
//         fontFamily: "outfit",

//     },
 
//     icon: {
//         marginRight: 5, // Espacio entre el icono y el borde del botón
//     },
//         button: {
//         flexDirection: 'row', // Para alinear el icono y el texto horizontalmente
//         alignItems: 'center', // Centra verticalmente los elementos
//         backgroundColor: Colors.varios.background,
//         padding: 10,
//         borderRadius: 5,
//         marginVertical: 10,
//     },
//     circleButton: {
//         width: 50, // Ancho del botón
//         height: 50, // Alto del botón
//         borderRadius: 30, // Hace el botón circular
//         backgroundColor: Colors.varios.background, // Color de fondo del botón
//         justifyContent: 'center', // Centra el contenido verticalmente
//         alignItems: 'center', // Centra el contenido horizontalmente
//         marginRight: 2, // Margen derecho para el botón

//     },
//     buttonText: {
//         color: 'white',
//         textAlign: 'center',
//         fontSize: 6,
//         fontFamily: "outfit-bold",
//         marginLeft: 5, // Espacio entre el icono y el texto
//     },
// });
