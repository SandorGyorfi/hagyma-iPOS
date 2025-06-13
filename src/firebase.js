import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHV6P5bJt_4OvOgwDuDKQRBBguEmgHpNY",
  authDomain: "hagyma-ipos.firebaseapp.com",
  projectId: "hagyma-ipos",
  storageBucket: "hagyma-ipos.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef0123456789"
};

// Firebase inicializálása
const app = initializeApp(firebaseConfig);

// Firestore példány létrehozása
export const db = getFirestore(app); 