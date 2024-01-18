import { View, Text,StyleSheet, TextInput, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, updateProfile  } from 'firebase/auth';
import {  auth } from '../../firebase';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const SignUp = ({navigation}) => {
    

        
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const[username, setUsername] = useState('');
    const [photo, setPhoto] = useState('');


    const signIn = async () =>{
        navigation.navigate('Login')
        }
    const signUp = async () => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
           updateProfile(auth.currentUser, {
            displayName: username, // You can set a display name
            photoURL: 'https://www.bootdey.com/img/Content/avatar/avatar3.png'
          }).then(() => {
            // Profile updated!
            // ...
          navigation.navigate('MusicPlayer');

          }).catch((error) => {
            // An error occurred
            // ...
            alert('nu mere de la update')
          });
        //   const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          alert('nu mere de la signup')
          // ..
        }).finally(()=>{
            setLoading(false);
            navigation.navigate('MusicPlayer');

        });
    }

  return (
    <View style={styles.container}>
        <TextInput  value={username} style={styles.input} placeholder="Username" autoCapitalize="none" onChangeText={(text)=> setUsername(text) }></TextInput>
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text)=> setEmail(text) }></TextInput>
        {/* <TextInput value={photo} style={styles.input} placeholder="PhotoURL" autoCapitalize="none" onChangeText={(text) => setPhoto(text)}></TextInput> */}
      
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="password" autoCapitalize="none" onChangeText={(text)=> setPassword(text) }></TextInput>

        {loading ? <ActivityIndicator size="large" color="#0000ff" />
        :<>
        {/* <Button title="login" onPress={signIn} /> */}
        <Button title="Create account" onPress={signUp} />
        <TouchableOpacity onPress={ signIn}>
            <Text style={styles.signupText}>Already have an account? Log in</Text>
          </TouchableOpacity>

        </>
}
    </View>
    
  )
  
}

export default SignUp;


const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input:{
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    signupText: {
        marginTop: 10,
        color: 'blue',
      },
   
})