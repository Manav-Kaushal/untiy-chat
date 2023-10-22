import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGwWKWrw2a7oFMjzXSRo3QhYJ8EmhLqCk",
  authDomain: "unity-chat-app-247a3.firebaseapp.com",
  projectId: "unity-chat-app-247a3",
  storageBucket: "unity-chat-app-247a3.appspot.com",
  messagingSenderId: "945709278736",
  appId: "1:945709278736:web:b53f4887f2dcd0b3708c95",
  measurementId: "G-H2S86L736Y",
};

// Initialize firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
