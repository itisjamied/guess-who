// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_3hTefh34socwxgD6j-QV_D00y5n7Zkk",
  authDomain: "guess-who-9d136.firebaseapp.com",
  projectId: "guess-who-9d136",
  storageBucket: "guess-who-9d136.appspot.com",
  messagingSenderId: "70846150247",
  appId: "1:70846150247:web:ffb5aec4129d0a8fe706c2",
  measurementId: "G-N05971GC10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initializes Firestore

// Export the Firebase services
export { auth, analytics, db };