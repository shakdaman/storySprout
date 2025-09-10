// Re-export from service account for consistency
export { 
  auth, 
  db, 
  functions, 
  googleProvider, 
  firebaseConfig,
  default as app 
} from './serviceAccount';
