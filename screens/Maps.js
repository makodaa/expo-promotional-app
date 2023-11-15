import { BlurView } from "expo-blur";
import React, {useState, useEffect} from "react";
import { 
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  ImageBackground,
  FlatList } from "react-native";

import { COLORS, FONTS } from "../constants/theme";

const Maps = () => {
  const [maps, setMaps] = useState([]);
  const fetchMapsFromAPI = async () => {
    const response = await fetch("https://valorant-api.com/v1/maps");
    const maps = await response.json();
    setMaps(maps.data);
    console.log(maps.data);
  };
  useEffect(() => {
    fetchMapsFromAPI();
  }, []);

  const renderShowcase = () => {
    return (
        <FlatList
          data={maps}
          horizontal
          pagingEnabled
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.uuid}`}
          renderItem={({ item }) => (
            <ImageBackground
            style={styles.imageBackground}
            resizeMode="cover"
            source={{ uri: item.splash }}
          >
            <BlurView
            intensity={20}
            tint="dark"
            style={[StyleSheet.absoluteFill, styles.imageBackground]}
            >
              {
                item.displayName == "Ascent" ?
                <Text
                  style={[
                    FONTS.h1,
                    {
                      fontSize: 48,
                      color: COLORS.surface,
                      marginTop: 12,
                    },
                  ]}
                >
                  MAPS
                </Text>
                :
                <></>
                }
              <Image
                resizeMode="contain"
                style={styles.map}
                source={{ uri: item.displayIcon }}
              />
              <Text
                style={[
                  FONTS.h1,
                  {
                    fontSize: 48,
                    color: COLORS.surface,
                    marginTop: 12,
                  },
                ]}
              >
                {item.displayName.toUpperCase()}
              </Text>
              <Text
                style={[
                  FONTS.body,
                  {
                    color: COLORS.surface,
                    marginTop: 6,
                  },
                ]}>
                  {item.narrativeDescription}
                </Text>
                {
                  item.tacticalDescription ?
                  <View>
                  <Text
                    style={{
                      ...FONTS.h1,
                      color: COLORS.surface,
                      marginTop: 12,
                    }}>
                      SITES
                      </Text>
                  <Text
                    style={{
                      ...FONTS.h1,
                      color: COLORS.surface,
                      marginTop: 6,
                    }}>
                      {item.tacticalDescription}
                      </Text>
                </View>
                :
                <></>
                }
            </BlurView>
            </ImageBackground>
          )}
        />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={maps}
        ListHeaderComponent={<>{renderShowcase()}</>}
        renderItem={null}
      />
    </SafeAreaView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    width: 393,
    height: 803,
    alignItems: "flex-start",
    padding: 18,
  },
  map: {
    width: 393,
    height: 393,
    alignSelf: "center",
    marginTop: 24,
  }
});
