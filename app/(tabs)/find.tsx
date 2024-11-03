import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation, Link } from "expo-router";
import { LA_PLATA_COORDENADAS } from "../../constants/Coordenadas";
import { markers } from "../../assets/markers";
import CustomMarker from "@/components/CustomMarker";
import MapViewDirections from "react-native-maps-directions";
import Card from "@/components/Card";
import Colors from "@/constants/Colors";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function HomeScreen() {
  interface LocationCoords {
    latitude: number;
    longitude: number;
  }

  const [ubicacionUsuario, setUbicacionUsuario] =
    useState<LocationCoords | null>(null);
  const navigation = useNavigation();
  const _map = useRef(null);
  const _scrollView = useRef(null);
  const GOOGLE_MAPS_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;
  let mapIndex = 0;
  let mapAnimation = useRef(new Animated.Value(0)).current;
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { latitude, longitude } = markers[index];
          if (_map.current) {
            _map.current.animateToRegion(
              {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              350
            );
          }
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });
    return { scale };
  });

  //#region region // tiempo estimado

  const getRouteTime = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          markers[0].latitude
        },${markers[0].longitude}&destination=${
          markers[markers.length - 1].latitude
        },${markers[markers.length - 1].longitude}&waypoints=${markers
          .slice(1, -1)
          .map((m) => `${m.latitude},${m.longitude}`)
          .join("|")}&mode=walking&key=${GOOGLE_MAPS_KEY}`
      );
      const data = await response.json();
      console.log(data);
      const estimatedTime = data.routes[0].legs.reduce(
        (total, leg) => total + leg.duration.value,
        0
      ); // Total duration in seconds
      setEstimatedTime(estimatedTime);
    } catch (error) {
      console.error(error);
    }
  };

  const startTrackingUser = async () => {
    await Location.requestForegroundPermissionsAsync();
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 1 },
      (location) => {
        setUbicacionUsuario({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        // Update map region if necessary
      }
    );
  };

  useEffect(() => {
    getRouteTime();
    console.log(estimatedTime);
    startTrackingUser();
  }, []);
  //#endregion

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
          ref={_map}
          style={styles.map}
          initialRegion={{
            latitude: LA_PLATA_COORDENADAS.latitude,
            longitude: LA_PLATA_COORDENADAS.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          showsUserLocation={true}
        >
          {markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };

            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
              >
                <Animated.View style={[styles.markerWrap, scaleStyle]}>
                  <CustomMarker image={marker.image} title={marker.title} />
                </Animated.View>
              </Marker>
            );
          })}

          {markers.map((marker, index) => {
            if (index < markers.length - 1) {
              const nextMarker = markers[index + 1];

              return (
                <MapViewDirections
                  key={index}
                  origin={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  destination={{
                    latitude: nextMarker.latitude,
                    longitude: nextMarker.longitude,
                  }}
                  apikey={GOOGLE_MAPS_KEY}
                  strokeWidth={3}
                  mode="WALKING"
                  strokeColor="black"
                  precision="low"
                />
              );
            }
          })}
        </MapView>
      )}
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image source={marker.image} style={styles.cardImage} />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
            </View>
            <View style={styles.button}>
              <Link
                href={{
                  pathname: "/place-details/[markerId]",
                  params: { markerId: marker.id },
                }}
                asChild
              >
                <TouchableOpacity
                  style={[
                    styles.textSign,
                    {
                      borderColor: Colors.text.primary,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.signIn,
                      {
                        color: Colors.text.primary,
                      },
                    ]}
                  >
                    Ver más
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  animatedWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    // alignItems: "center",
    // justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
