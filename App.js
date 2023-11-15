import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Home, Agents, Maps, Modes, Links} from './screens/index';
import { COLORS, FONTS } from './constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Root() {
  return (
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
      swipeEnabled: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.onsurfacevariant,
      tabBarStyle: {
        backgroundColor: COLORS.surfacevariant,
        borderTopWidth: 0,
        elevation: 0,
      },
      tabBarIndicatorStyle: {
        backgroundColor: COLORS.primary,
        height: 3,
      },
    }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Agents" component={Agents} />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="Modes" component={Modes} />
      <Tab.Screen name="Links" component={Links} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'DinNextW1G': require('./assets/fonts/dinnextw1g.otf'),
    'DinNextW1G-Bold': require('./assets/fonts/dinnextw1g_bold.otf'),
    'DinNextW1G-Medium': require('./assets/fonts/dinnextw1g_medium.otf'),
    'Tungsten-Bold': require('./assets/fonts/Tungsten-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Root"
          component={Root}
          options={{headerShown: false}}
          />
        <Stack.Screen
          name="Links"
          component={Links}
          options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
