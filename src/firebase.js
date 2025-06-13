import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hagyma-ipos.firebaseapp.com",
  projectId: "hagyma-ipos",
  storageBucket: "hagyma-ipos.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Firebase inicializálása
const app = initializeApp(firebaseConfig);

// Firestore példány létrehozása
const db = getFirestore(app);

export { db }; 