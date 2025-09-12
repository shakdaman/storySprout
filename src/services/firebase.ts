// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwc4H9X7jJOuz8Y83SdfSPtoQIASatOi0",
  authDomain: "storysprout-a1166.firebaseapp.com",
  projectId: "storysprout-a1166",
  storageBucket: "storysprout-a1166.firebasestorage.app",
  messagingSenderId: "345007348347",
  appId: "1:345007348347:web:159787c453ac3d5af520de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;

