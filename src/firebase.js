import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAwIFz2PLIN157Zdet8A1u4uC_4z7w1E4",
    authDomain: "prism-ai-3573c.firebaseapp.com",
    projectId: "prism-ai-3573c",
    storageBucket: "prism-ai-3573c.firebasestorage.app",
    messagingSenderId: "851165947510",
    appId: "1:851165947510:web:aceca34e9e62ef4b9ee157",
    measurementId: "G-950S1DPXKV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
