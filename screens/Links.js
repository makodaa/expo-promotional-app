import { 
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  Linking,
  Animated
 } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
const Links = () => {
  const links = [
    {link: 'https://twitter.com/valorant', icon: 'twitter'},
    {link: 'https://www.youtube.com/@Valorant', icon: 'youtube'},
    {link: 'https://instagram.com/valorant', icon: 'instagram'},
    {link: 'https://www.facebook.com/playvalorant/', icon: 'facebook'},
    {link: 'https://discord.gg/valorant', icon:'discord'},
  ]
  return (
    <SafeAreaView style = {styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require('../assets/images/background.jpg')}
      >
        <BlurView intensity={60} style={[StyleSheet.absoluteFill, styles.container]} tint="dark">
        <Text
          style={[
            FONTS.h1,
            {
              fontSize: 32,
              color: COLORS.surface,
              textAlign: 'center'
            },
          ]}
        >
          Learn More, and Join the Protocol
        </Text>
        <View style = {{marginTop: 18, marginBottom:27}}>
        <FlatList
          data={links}
          horizontal
          keyExtractor={(item, index) => item.key}
          renderItem={({ item }) => (
            <View style ={{}}>
              <Pressable
              onPress={() => Linking.openURL(item.link)}
              >
              <MaterialCommunityIcons name={item.icon} size={32} style= {{marginRight: 6}} color={COLORS.surface} />
              </Pressable>
            </View>
          )}
        />
        </View>
        <View style={[styles.border]}>
          <Pressable
            style={[styles.button]}
            onPress={() => Linking.openURL('https://playvalorant.com/en-us/')}
          >
            <Text style={[FONTS.h2, { color: COLORS.primary }]}>
              GET THE GAME HERE
            </Text>
          </Pressable>
        </View>
          </BlurView>
      </ImageBackground>
      </SafeAreaView>
  )
}

export default Links

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    height: 803,
    width: 393,
  },
  border: {
    borderWidth: 0.4,
    borderColor: COLORS.primary,
    borderStyle: "solid",
    padding: 9,
    marginVertical: 9
  },

})