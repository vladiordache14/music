import React from 'react';
import { View, Text, ImageBackground, Button, StyleSheet, AppRegistry } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const Welcome = ({navigation}) => {
 
  return (
    <ImageBackground
      source={require("C:/Users/vladi/OneDrive/Desktop/music/app/screens/bckg.png")} // replace with your actual image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to our Music App</Text>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => {console.log('Login button pressed'),   navigation.navigate('Login');}} />
          <Button title="Sign Up" onPress={() => {console.log('Sign Up button pressed'),navigation.navigate('SignUp');}} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Set text color to white or another suitable color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default Welcome;
