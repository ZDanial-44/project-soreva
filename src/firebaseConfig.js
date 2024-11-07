// src/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCflY5bU9A4a70X--REZ30R3ZkTB-uXQcg",
  authDomain: "project-77798.firebaseapp.com",
  projectId: "project-77798",
  storageBucket: "project-77798.appspot.com",
  messagingSenderId: "506707884059",
  appId: "1:506707884059:android:83a461ca9c07beba5060be"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

export default app;
