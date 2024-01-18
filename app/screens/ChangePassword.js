import { View, Text,StyleSheet, TextInput, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, updateProfile ,updatePassword } from 'firebase/auth';
import {  auth } from '../../firebase';

const ChangePassword = ({navigation}) => {
    const auth = getAuth()
    const user = auth.currentUser;
    const isButtonDisabled = newPassword !== password || newPassword === '';
    const [loading, setLoading] = useState(false);


    const goToMusic =() =>{
        navigation.navigate('MusicPlayer')
      }

    const updateEmail=()=>{
    updatePassword(user,newPassword).then(() => {
        // Update successful.
        alert('Password updated sucessfully')
    }).catch((error) => {
        // An error occurred
        // ...
        alert(error)
    }).finally(goToMusic);
}
    const [password, setPassword] = useState('');
    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');


  return (
    <View style={styles.container}>
        <TextInput secureTextEntry={true} value={oldPassword} style={styles.input} placeholder="Old Password" autoCapitalize="none" onChangeText={(text)=> setoldPassword(text) }></TextInput>
        <TextInput secureTextEntry={true} value={newPassword} style={styles.input} placeholder="New Password" autoCapitalize="none" onChangeText={(text)=> setnewPassword(text) }></TextInput>
        {/* <TextInput value={photo} style={styles.input} placeholder="PhotoURL" autoCapitalize="none" onChangeText={(text) => setPhoto(text)}></TextInput> */}
      
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Repeat New Password" autoCapitalize="none" onChangeText={(text)=> setPassword(text) }></TextInput>

        {loading ? <ActivityIndicator size="large" color="#0000ff" />
        :<>
        {/* <Button title="login" onPress={signIn} /> */}
        <Button title="Update password" disabled={newPassword !== password || newPassword === ''} onPress={updateEmail}  />
        <TouchableOpacity onPress={ ()=>{}}>
            <Text style={styles.signupText}>Forgot password?</Text>
          </TouchableOpacity>

        </>
}
          <View style={styles.closeButtonContainer}>
            <Button title="Close" onPress={goToMusic} />
          </View>

    </View>
  )
}

export default ChangePassword;


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
      closeButtonContainer: {
        marginTop: 10,
        alignItems: 'center',
      },

   
})