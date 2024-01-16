import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login'
import MusicPlayer from './screens/MusicPlayer';
import Welcome from './app/screens/Welcome';
import SignUp from './app/screens/SignUp';
import TrackPlayer from 'react-native-track-player';
import Profile from './app/screens/Profile';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
   <NavigationContainer >
    <Stack.Navigator   screenOptions={{
    headerShown: false,
  }}
   initialRouteName='Welcome'>
    <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}} />

      <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} />

      <Stack.Screen name='MusicPlayer' component={MusicPlayer} options={{headerShown: false}} />
    </Stack.Navigator>

   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
