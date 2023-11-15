import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, FONTS } from "../constants/theme";

const Agents = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [agents, setAgents] = useState([]);
  const roleIconLinks = {
    'Controller': "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
    'Duelist': "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
    'Initiator': "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
    'Sentinel': "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
  }
  
  const fetchAgentsFromAPI = async () => {
    const response = await fetch("https://valorant-api.com/v1/agents");
    const agents = await response.json();
    setAgents(agents.data);
    console.log(agents.data);
  };

  useEffect(() => {
    fetchAgentsFromAPI();
  }, []);

  const renderShowcase = () => {
    return (
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="cover"
          source={require("../assets/images/background.jpg")}
        >
          <FlatList
            data={agents.filter((agent) => agent.isPlayableCharacter)}
            horizontal
            pagingEnabled
            decelerationRate={0}
            snapToInterval={393 + 20}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.uuid}`}
            renderItem={({ item }) => (
              <View
                style={styles.portraitContainer}
              >
                <Image
                  resizeMode="cover"
                  style={styles.portrait}
                  source={{ uri: item.bustPortrait }}
                />
                <View style = {styles.absolute}>
                  <View style = {[styles.container, {flexDirection: "row", alignItems: 'flex-start', columnGap: 9}]}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.primary,
                      lineHeight: 32,
                    }}
                  >
                    {missingData[item.displayName.toUpperCase()]['agentNumber']}
                  </Text>
                  <Text style={{
                    ...FONTS.h1,
                    color: COLORS.primary,
                    fontSize: 40,
                    }}>
                    {item.displayName.toUpperCase()}
                  </Text>
                  </View>
                </View>
                <View style ={[{
                  position: 'absolute',
                  bottom: 130,
                  right: 18,  
                  width: 293,
                }]}>
                  <Text
                    style={{
                      ...FONTS.h1,
                      color: COLORS.onsurfacevariant,
                      textAlign: "right",
                    }}>
                      ROLE
                  </Text>
                  <View style = {{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: "contain",
                      alignSelf: "flex-end",
                      marginHorizontal: 6,
                    }}
                    source={{ uri: roleIconLinks[missingData[item.displayName.toUpperCase()]['role']] }}
                  />
                  <Text
                    style={{
                      ...FONTS.h1,
                      fontSize: 42,
                      color: COLORS.onsurfacevariant,
                      textAlign: "right",
                    }}
                    >
                      {missingData[item.displayName.toUpperCase()]['role'].toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...FONTS.h1,
                      fontSize: 18,
                      color: COLORS.onsurfacevariant,
                      textAlign: "right",
                    }}
                  >
                    //  BIOGRAPHY
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body,
                      color: COLORS.onsurfacevariant,
                      textAlign: "right",
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h1,
                      fontSize: 42,
                      color: COLORS.onsurfacevariant,
                      textAlign: "right",
                      marginTop: 18,
                      marginBottom: 9,
                    }}
                    >
                      ABILITIES
                    </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                  <Image
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: "contain",
                      alignSelf: "flex-end",
                      marginHorizontal: 6,
                    }}
                    source={{ uri: item.abilities[0].displayIcon }}
                  />
                                    <Image
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: "contain",
                      alignSelf: "flex-end",
                      marginHorizontal: 6,
                    }}
                    source={{ uri: item.abilities[1].displayIcon }}
                  />
                                    <Image
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: "contain",
                      alignSelf: "flex-end",
                      marginHorizontal: 6,
                    }}
                    source={{ uri: item.abilities[2].displayIcon }}
                  />
                                    <Image
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: "contain",
                      alignSelf: "flex-end",
                      marginHorizontal: 6,
                    }}
                    source={{ uri: item.abilities[3].displayIcon }}
                  />

                  </View>
                </View>
              </View>
            )}
          />
        </ImageBackground>
    );
  };
  
  const missingData = {
    'BRIMSTONE': {
      agentNumber: 1,
      role: 'Controller',
    },
    'PHOENIX': {
      agentNumber: 2,
      role: 'Duelist',
    },
    'SAGE': {
      agentNumber: 3,
      role: 'Sentinel',
    },
    'SOVA': {
      agentNumber: 4,
      role: 'Initiator',
    },
    'VIPER': {
      agentNumber: 5,
      role: 'Controller',
    },
    'CYPHER': {
      agentNumber: 6,
      role: 'Sentinel',
    },
    'REYNA': {
      agentNumber: 7,
      role: 'Duelist',
    },
    'KILLJOY': {
      agentNumber: 8,
      role: 'Sentinel',
    },
    'BREACH': {
      agentNumber: 9,
      role: 'Initiator',
    },
    'OMEN': {
      agentNumber: 10,
      role: 'Controller',
    },
    'JETT': {
      agentNumber: 11,
      role: 'Duelist',
    },
    'RAZE': {
      agentNumber: 12,
      role: 'Duelist',
    },
    'SKYE': {
      agentNumber: 13,
      role: 'Initiator',
    },
    'YORU': {
      agentNumber: 14,
      role: 'Duelist',
    },
    'ASTRA': {
      agentNumber: 15,
      role: 'Controller',
    },
    'KAY/O': {
      agentNumber: 16,
      role: 'Duelist',
    },
    'CHAMBER': {
      agentNumber: 17,
      role: 'Sentinel',
    },
    'NEON': {
      agentNumber: 18,
      role: 'Duelist',
    },
    'FADE': {
      agentNumber: 19,
      role: 'Initiator',
    },
    'HARBOR': {
      agentNumber: 20,
      role: 'Controller',
    },
    'GEKKO': {
      agentNumber: '21',
      role: 'Initiator',
    },
    'DEADLOCK': {
      agentNumber: 22,
      role: 'Sentinel',
    },
    'ISO': {
      agentNumber: 23,
      role: 'Duelist',
    },
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={agents}
        ListHeaderComponent={<>{renderShowcase()}</>}
        renderItem={null}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Agents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  portrait: {
    width: 393,
    height: 650,
  },
  portraitContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 803
  },
  absolute: {
    position: "absolute",
    top: 20,
    left: 18,
  }
});
