import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import { db } from "../../config/FirebaseConfig";
import { LA_PLATA_COORDENADAS } from "../../constants/Coordenadas"; // Asegúrate de ajustar la ruta según tu estructura

import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen() {
  const [atracciones, setAtracciones] = useState([]);
  const [ubicacionUsuario, setUbicacionUsuario] =
    useState<Location.LocationObjectCoords | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // Solicitar permiso de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        return;
      }

      // Obtener ubicación del usuario
      let location = await Location.getCurrentPositionAsync({});
      setUbicacionUsuario(location.coords);
    })();
  }, []);



  return (
    <View style={styles.container}>
      {ubicacionUsuario && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LA_PLATA_COORDENADAS.latitude,
            longitude: LA_PLATA_COORDENADAS.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: ubicacionUsuario.latitude,
              longitude: ubicacionUsuario.longitude,
            }}
            title="Tu ubicación"
            description="Aquí te encuentras"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
