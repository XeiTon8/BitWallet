import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjs6hxteUahHACFu0EYvuckHmIxpCcORY",
  authDomain: "bitwallet-56e26.firebaseapp.com",
  projectId: "bitwallet-56e26",
  storageBucket: "bitwallet-56e26.appspot.com",
  messagingSenderId: "677464180830",
  appId: "1:677464180830:web:48cc665d0697adc9328ccf"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;