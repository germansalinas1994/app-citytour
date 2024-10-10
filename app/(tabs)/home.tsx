import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const [isPressed, setIsPressed] = useState(false);
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets(); // Para los márgenes de la safe area

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background.default,
        paddingTop: insets.top, // Aplicar padding dinámico
        paddingBottom: insets.bottom,
      }}
    >
      {/* Imagen de fondo */}
      <ImageBackground
        source={require("../../assets/images/catedral.jpg")}
        style={{
          flex: 1,
          width: width,
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      >
        {/* Capa semi-transparente para que el texto se distinga */}
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro semi-transparente
          }}
        />

        {/* Contenido sobre la imagen */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontFamily: "outfit-Bold",
              fontSize: 30,
              textAlign: "center",
              color: Colors.text.white,
              width: width * 0.8,
            }}
          >
            ¡Bienvenido a La Plata Tour!
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
              width: width * 0.8,
              color: Colors.text.white,
            }}
          >
            Explora la ciudad de La Plata y descubre todos sus rincones mágicos
            con nuestra app.
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: height * 0.1, // Ajusta este valor para mover el botón más arriba o abajo
            width: width * 0.5,
            alignItems: "center",
          }}
        >
          <Link href="/(tabs)/find" asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={{
                padding: 14,
                marginTop: 30,
                backgroundColor: Colors.background.primaryButton,
                width: width * 0.5,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: isPressed ? 2 : 5 },
                shadowOpacity: isPressed ? 0.5 : 0.3,
                shadowRadius: isPressed ? 3 : 6,
                elevation: isPressed ? 2 : 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-Medium",
                  fontSize: 20,
                  textAlign: "center",
                  color: Colors.text.white,
                }}
              >
                Comenzar Tour
              </Text>
            </Pressable>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}
