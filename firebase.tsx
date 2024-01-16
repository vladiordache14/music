// Import the functions you need from the SDKs you need
import { initializeApp,   } from "firebase/app";
import { connectAuthEmulator, getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: "AIzaSyC-INAlG7aDwscxJR2WLQf6fr2fQGvJC0Y",
  authDomain: "myapp-67f4b.firebaseapp.com",
  databaseURL: "https://myapp-67f4b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myapp-67f4b",
  storageBucket: "myapp-67f4b.appspot.com",
  messagingSenderId: "110157564644",
  appId: "1:110157564644:web:abd5a149d0ece22d8c3af1",
  measurementId: "G-NKQV58Y3H6"
  });
// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// const auth  = getAuth(app)
const db = getFirestore(app)
export {  auth, db };

//sooo on web browser works as expected, but on Android emulator I get this annoying error. Probably should install android dependecies