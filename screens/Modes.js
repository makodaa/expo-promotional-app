import React, {useState, useEffect} from "react"; 
import { 
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
 } from 'react-native'
import { BlurView } from "expo-blur";
import { COLORS, FONTS } from '../constants/theme';


const Modes = () => {
  const [modes, setModes] = useState([]);
  const fetchModesFromAPI = async () => {
    const response = await fetch("https://valorant-api.com/v1/gamemodes");
    const modes = await response.json();
    setModes(modes.data);
  };
  useEffect(() => {
    fetchModesFromAPI();
  }, []);
  const renderShowcase = () => {
    return(
      <View style = {styles.imageBackground}>
      <Text
        style={[
          FONTS.h1,
          {
            fontSize: 48,
            color: COLORS.surface,
            marginVertical: 36,
          },
        ]}
      >
        MODES
      </Text>
      <FlatList
        data={modes}
        pagingEnabled
        decelerationRate={0}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.uuid}`}
        renderItem={({ item }) => (
          <View style = {[styles.container]}>
            <Image
              resizeMode="cover"
              style={styles.icon}
              source={{ uri: item.displayIcon ? item.displayIcon : "https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png" }}
            />
            <Text
              style={[
                FONTS.h1,
                {
                  fontSize: 18,
                  color: COLORS.surface,
                  marginTop: 12,
                },
              ]}
            >
              {item.displayName}
            </Text>
          </View>
        )}
      />
      </View>
    )
  }
  return (
    <SafeAreaView>
    <ImageBackground
      style={styles.imageBackground}
      resizeMode="cover"
      source={require("../assets/images/background.jpg")}
    >
      <FlatList
        data={modes}
        keyExtractor={({ id }, index) => id}
        renderItem={null}
        ListHeaderComponent={renderShowcase()}
        ListHeaderComponentStyle={{height: 803, width: 393}}
      />
    </ImageBackground>
    </SafeAreaView>
  )
}

export default Modes

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 128,
  },
  imageBackground: {
    height: "803",
    width: "393",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 64,
    height: 64,
  }
})