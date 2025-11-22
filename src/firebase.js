import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB0NCQm8lGWmQAIWHHW_wCWATldeK9a5tE",
    authDomain: "prism-hackhatch.firebaseapp.com",
    projectId: "prism-hackhatch",
    storageBucket: "prism-hackhatch.firebasestorage.app",
    messagingSenderId: "1056562640260",
    appId: "1:1056562640260:web:26c60db67eacf6cfd6d9d1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
