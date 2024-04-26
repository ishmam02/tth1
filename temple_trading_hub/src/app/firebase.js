// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLVJKgqIE9CaG4-zCqOqBeoqpF_f_cfQ4',
  authDomain: 'temple-trading-hub.firebaseapp.com',
  projectId: 'temple-trading-hub',
  storageBucket: 'temple-trading-hub.appspot.com',
  messagingSenderId: '841578627735',
  appId: '1:841578627735:web:2a7f662f2105350b365fd2',
  measurementId: 'G-VMJV7M1R0Z',
  databaseURL: 'https://temple-trading-hub-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
