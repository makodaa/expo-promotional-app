import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingVertical: insets.top, paddingHorizontal: insets.left },
      ]}
    >
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../assets/images/hero.jpg")}
      >
        <View>
          <View style={[styles.hero]}>
            <Text style={[FONTS.h4, { color: COLORS.onsurfacevariant }]}>
              Welcome to
            </Text>
            <Image
                style={[styles.logo]}
                source={require("../assets/images/logo.png")}
            />
            <Text style={[FONTS.h4, { color: COLORS.onsurfacevariant }]}>
              A 5v5 character-based tactical shooter
            </Text>
            <View style={[styles.border]}>
              <Pressable
                style={[styles.button]}
                onPress={() => navigation.navigate("Links")}
              >
                <Text style={[FONTS.h2, { color: COLORS.onsurfacevariant }]}>
                  PLAY FREE
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
  },
  hero: {
    flex: 1,
    position: "absolute",
    right: 0,
    alignItems: "flex-end",
  },
  logo: {
    resizeMode: "contain",
    width: 280,
    height: 40,
    marginVertical: 18,
  },
  border: {
    borderWidth: 0.4,
    borderColor: COLORS.onsurfacevariant,
    borderStyle: "solid",
    padding: 9,
    marginVertical: 9
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 48,
  },
});
