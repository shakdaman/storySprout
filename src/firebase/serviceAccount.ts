// Firebase Service Account Configuration
// This file contains the Firebase configuration for StorySprout
// Project: storysprout-a1166

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Firebase configuration for StorySprout project
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

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;

// Export configuration for reference
export { firebaseConfig };

