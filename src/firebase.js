import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMR3UOdSap3fVLUWPYsfcx10fXUtUTNQw",
  authDomain: "visitasmiip.firebaseapp.com",
  projectId: "visitasmiip",
  storageBucket: "visitasmiip.firebasestorage.app",
  messagingSenderId: "226168595128",
  appId: "1:226168595128:web:37b1033ca3ee91e4074a4d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);