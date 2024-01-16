import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth,updateProfile,updateEmail  } from "firebase/auth";
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';
// const options = {
//   title: 'Select Avatar',
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

const Profile = ({navigation}) => {
  const auth = getAuth();
  const user = auth.currentUser;
if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);

    


  });
}
  const profile = {
    name: user.displayName,
    email: user.email,
    bio: 'Software engineer and cat lover',
    avatar: user.photoURL,
  }
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };
  const goToMusic =() =>{
    navigation.navigate('MusicPlayer')
  }

  const handleSubmit = () => {
    updateEmail(auth.currentUser, email).then(() => {
      // Email updated!
      // logic still needed
      alert("Email updated successfully!")
    }).catch((error) => {
      // An error occurred
      // ...
      alert("error at email ")
    });

    updateProfile(auth.currentUser, {
      displayName: name, // You can set a display name
      photoURL: avatar
    }).then(() => {
      // Profile updated!
      // ...
      alert("Profile updated successfully!")

    }).catch((error) => {
      // An error occurred
      // ...
      alert('nu mere de la update')
    });

  }

  const openImagePicker = () => {
    

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      setModalVisible(false);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);

      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      setModalVisible(false);

      if (response.didCancel) {
        console.log('User cancelled camera');

      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setAvatar(imageUri);
        console.log(imageUri);
        profile.avatar=imageUri;

      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          // source={{uri: 'https://www.bootdey.com/img/Content/avatar/avatar3.png'}}
          source={{uri: profile.avatar}}

        />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={toggleModal}>
          <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
        </TouchableOpacity>


      </View>
       {/* Modal for camera/gallery options */}
       <Modal isVisible={isModalVisible} >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={handleCameraLaunch}>
            <Text style={styles.modalButtonText}>Use Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={openImagePicker}>
            <Text style={styles.modalButtonText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Avatar</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter AvatarURL"
          value={avatar}
          onChangeText={setAvatar}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit({name, email, bio, avatar})}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMusic}>
            <Text style={styles.signupText}>Go back to music Player</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});



export default Profile