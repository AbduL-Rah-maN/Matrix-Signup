
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRz0-gmjH-8u0L-p92UxrTwIYYYZ_lWgM",
  authDomain: "matrix-page.firebaseapp.com",
  projectId: "matrix-page",
  storageBucket: "matrix-page.firebasestorage.app",
  messagingSenderId: "400142694339",
  appId: "1:400142694339:web:fd32d6fd562ee8a425af76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app
export { auth, db }
