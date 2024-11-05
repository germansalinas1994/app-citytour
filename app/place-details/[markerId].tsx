import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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
    const [urlToShow, setUrlToShow] = useState<string | null>(null); // Estado para almacenar el URL a mostrar en WebView

    const selectedMarker = markers.find(marker => marker.id === parseInt(markerId as string));

    const speakDescription = () => {
        if (selectedMarker && selectedMarker.description) {
            Speech.speak(selectedMarker.description, { language: 'es-ES' });
        }
    };

    if (!selectedMarker) {
        return <Text style={styles.noMarkerText}>No se encontró el marcador con el ID proporcionado.</Text>;
    }

    // Renderiza WebView si hay un URL seleccionado
    if (urlToShow) {
      console.log(urlToShow);
        return (
            <WebView
                style={styles.webView}
                source={{ uri: urlToShow }}
                onError={() => setUrlToShow(null)} // Maneja errores de carga del URL
            />
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={selectedMarker.image} style={styles.image} resizeMode="cover" />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{selectedMarker.title}</Text>
                <TouchableOpacity onPress={speakDescription} style={styles.circleButton}>
                    <Icon name="volume-up" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Escuchar</Text>
                </TouchableOpacity>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.varios.subicon,
        alignItems: 'center',
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
    image: {
        width: screenWidth,
        height: screenWidth * 0.6,
        marginBottom: 16,
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
        marginBottom: 8,
        fontFamily: "outfit",
        color: 'black',
        textAlign: 'left',
        paddingLeft: 25,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 15,
        fontFamily: "outfit",
        color: 'black',
        paddingLeft: 25,
        paddingRight: 25,
    },
    textlink: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 15,
        fontFamily: "outfit",
        color: 'black',
        paddingLeft: 25,
        lineHeight: 20,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 15,
        lineHeight: 20,
        fontFamily: "outfit",
    },
    noMarkerText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: "outfit",
    },
    circleButton: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: Colors.varios.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 6,
        fontFamily: "outfit-Bold",
        marginLeft: 5,
    },
});
