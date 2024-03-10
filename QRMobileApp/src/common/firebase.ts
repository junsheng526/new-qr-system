// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCEalTc18YMvVa6DbyHaEm0FjHwV7syI4U',
  authDomain: 'qr-code-ordering-system-21b61.firebaseapp.com',
  databaseURL:
    'https://qr-code-ordering-system-21b61-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'qr-code-ordering-system-21b61',
  storageBucket: 'qr-code-ordering-system-21b61.appspot.com',
  messagingSenderId: '644900094439',
  appId: '1:644900094439:web:ebc9ec0c7382308180bd42',
  measurementId: 'G-8J3EMZNSJC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;