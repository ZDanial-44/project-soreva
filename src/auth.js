// src/auth.js
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    console.log("Вход выполнен");
  } catch (error) {
    
    if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
      // Ignore
      console.log("Окно было закрыто пользователем или запрос был отменен.");
    } else {
      console.error("Ошибка аутентификации:", error);
    }
  }
};

export const signOutUser = () => {
  return signOut(auth);
};

export const subscribeToAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
