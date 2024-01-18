import { View, Text,StyleSheet, TextInput, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {  auth } from '../../firebase';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const Login = ({navigation}) => {
    

        
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () =>{
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email, password);
            console.log(response);
            navigation.navigate('MusicPlayer')
        }catch(error){
            console.log(error);
            alert('Log in failed: ' + error.message)

        }finally{
            setLoading(false);
        }
        }

    const signUp = async () => {
        navigation.navigate('SignUp');
    }

  return (
    <View style={styles.container}>
        <TextInput value={email} 
        style={styles.input}
         placeholder="Email"
          autoCapitalize="none"
           onChangeText={(text)=> setEmail(text) }></TextInput>
        <TextInput secureTextEntry={true}
         value={password} 
         style={styles.input}
          placeholder="password"
           autoCapitalize="none"
            onChangeText={(text)=> setPassword(text) }></TextInput>
        {loading ? <ActivityIndicator size="large" color="#0000ff" />
        :<>
        <Button title="login" onPress={signIn} />
        <TouchableOpacity onPress={ signUp }>
            <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>

        </>
}
    </View>
  )
}

export default Login

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