import React, { useState } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { markers } from '../../assets/markers';
import Colors from "../../constants/Colors";
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams } from "expo-router";

const screenWidth = Dimensions.get('window').width;


export default function MarkerDetailsScreen() {
    const { markerId } = useLocalSearchParams();
    const [urlToShow, setUrlToShow] = useState<string | null>(null); 

    const selectedMarker = markers.find(marker => marker.id === parseInt(markerId as string));

    const speakDescription = () => {
        if (selectedMarker?.description) {
            Speech.speak(selectedMarker.description, { language: 'es-ES' });
        }
    };

    const openMap = (mapsUrl?: string) => {
        if (mapsUrl) {
            Linking.openURL(mapsUrl);
        } else {
            console.log("No se encontró un enlace de Google Maps.");
        }
    };

    if (!selectedMarker) {
        return <Text style={styles.noMarkerText}>No se encontró el marcador con el ID proporcionado.</Text>;
    }

    if (urlToShow) {
        return (
            <WebView
                style={styles.webView}
                source={{ uri: urlToShow }}
                onError={() => setUrlToShow(null)}
            />
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imageContainer}>
            <Image source={selectedMarker.image} style={styles.image} resizeMode="cover" />
            
            {/* Botón "Escuchar" en la esquina inferior izquierda */}
            <TouchableOpacity onPress={speakDescription} style={styles.buttonOverlayRight}>
                <Icon name="volume-up" size={25} color="#fff" />
                {/* <Text style={styles.buttonText}>Escuchar</Text> */}
            </TouchableOpacity>

            {/* Botón "Mapas" al lado del otro botón */}
            <TouchableOpacity onPress={() => openMap(selectedMarker.maps)} style={styles.buttonOverlay}>
                <Icon name="map-marker" size={25} color="#fff" />
                <Text style={styles.buttonText}>Ir</Text>
            </TouchableOpacity>
        </View>


                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{selectedMarker.title}</Text>
                </View>

                <Text style={styles.description}>{selectedMarker.description}</Text>

                {selectedMarker.instagram && (
                    <TouchableOpacity onPress={() => setUrlToShow(selectedMarker.instagram)} style={styles.linkContainer}>
                        <Text style={styles.textlink}>Visite la página de </Text>
                        <Text style={styles.link}>Instagram</Text>
                    </TouchableOpacity>
                )}

                {selectedMarker.sitioOficial && (
                    <TouchableOpacity onPress={() => setUrlToShow(selectedMarker.sitioOficial)} style={styles.linkContainer}>
                        <Text style={styles.textlink}>Visite el </Text>
                        <Text style={styles.link}>Sitio Oficial</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        width: '90%',  // Ajusta el ancho 
        maxWidth: 400, // Limita el ancho máximo para que no se estire demasiado
        padding: 15,
        backgroundColor: Colors.varios.subicon,  
        borderRadius: 15,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,  // opacidad de la sombra
        shadowRadius: 4,
        elevation: 5,  // Sombra para Android
        overflow: 'hidden',  // Esto asegura que la imagen no se salga del contenedor con bordes redondeados
      },
      // Contenedor de scroll para contenido dinámico
      scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Alinea el contenido al centro
        alignItems: 'center', // Alinea el contenido al centro
      },
    webView: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        fontFamily: "outfit",
        color: 'black',
        marginLeft: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 15,
        fontFamily: "outfit",
        color: 'black',
        paddingHorizontal: 25,
    },
    textlink: {
        fontSize: 16,
        textAlign: 'justify',
        fontFamily: "outfit",
        color: 'black',
        lineHeight: 20,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontFamily: "outfit",
    },
    noMarkerText: {
        fontSize: 16,
        color: 'grey', // Mejor contraste si el fondo es claro
        textAlign: 'center',
        marginTop: 20,
        fontFamily: "outfit",
    },
  
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15, // Tamaño mejorado para visibilidad
        fontFamily: "outfit-Bold",
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Alinea los botones a la derecha
        alignItems: 'center',
        marginBottom: 10,
        width: '100%', // Asegura que ocupe el ancho completo del contenedor
        paddingRight: 5, // Añade un margen derecho para separar los botones del borde de la pantalla
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.varios.background,
        justifyContent: 'center', // Centrado vertical y horizontal
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative', // Necesario para posicionar los botones sobre la imagen
        width: screenWidth,
        height: screenWidth * 0.6,
        marginBottom: 16,
    },
    
    image: {
        width: screenWidth,
        height: screenWidth * 0.6,
        marginBottom: 16,
        borderRadius: 35,  // Si quieres bordes redondeados
      },
    buttonOverlay: {
        position: 'absolute',
        bottom: -25,
        right: 40,    // Ajustado para que no se solapen
        width: 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: Colors.varios.background,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      },
    
      buttonOverlayRight: {
        position: 'absolute',
        bottom: -25,
        right: 105,    // Asegura que no se solapen con el primer botón
        width: 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: Colors.varios.background,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      },
});