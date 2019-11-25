import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'pricing-mvp.firebaseapp.com',
  databaseURL: 'https://pricing-mvp.firebaseio.com',
  projectId: 'pricing-mvp',
  storageBucket: 'pricing-mvp.appspot.com',
  messagingSenderId: '862121447011',
  appId: '1:862121447011:web:d424c2b72ab48a8c4d3256'
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()