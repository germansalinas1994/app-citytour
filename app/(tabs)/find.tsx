import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import { LA_PLATA_COORDENADAS } from "../../constants/Coordenadas";
import { markers } from "../../assets/markers"; 
import CustomMarker from "@/components/CustomMarker";

export default function HomeScreen() {
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        return;
      }
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
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            >
              <CustomMarker image={marker.image} title={marker.title} />
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
