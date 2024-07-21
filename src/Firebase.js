
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6Atc6rJ3AlKCS9tal1_jIJSX6EYFiFjo",
  authDomain: "invoice-management-c42e0.firebaseapp.com",
  projectId: "invoice-management-c42e0",
  storageBucket: "invoice-management-c42e0.appspot.com",
  messagingSenderId: "498840425422",
  appId: "1:498840425422:web:791604f3f537f32969119f",
  measurementId: "G-K4ZSC2QPKJ",
  databaseURL: ''
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
