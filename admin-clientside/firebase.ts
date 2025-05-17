// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCF3gNb0Zot8BqzmZLzzEFxOjiFmr0lE8U",
  authDomain: "skillshare-34eb7.firebaseapp.com",
  projectId: "skillshare-34eb7",
  storageBucket: "skillshare-34eb7.firebasestorage.app",
  messagingSenderId: "150486970263",
  appId: "1:150486970263:web:4837ae847cd3602c341ed2",
  measurementId: "G-3WG3FVH7CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)