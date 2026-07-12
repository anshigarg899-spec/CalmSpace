// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApS3kDxsybv0xhEBqiu9aVEglRO1aCpXg",
  authDomain: "mental-health-app-454d9.firebaseapp.com",
  projectId: "mental-health-app-454d9",
  storageBucket: "mental-health-app-454d9.appspot.com",
  messagingSenderId: "1005410279643",
  appId: "1:1005410279643:web:7fe9f7a00fc1fc5ad56cfe",
  measurementId: "G-QTVP8TTX1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

export { auth };
