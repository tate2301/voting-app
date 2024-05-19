import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
import "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMaDvonTHF4LQVN05wC-MJ_eBajB6q2pA",
  authDomain: "voting-b2235.firebaseapp.com",
  projectId: "voting-b2235",
  storageBucket: "voting-b2235.appspot.com",
  messagingSenderId: "376331568382",
  appId: "1:376331568382:web:0f777446013d9a632191af",
  measurementId: "G-401KBKM1VD",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
