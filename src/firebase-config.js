import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWKYWyGg4a90kEtT4N525Zu_WjPCJ3zPY",
  authDomain: "havenem-e1992.firebaseapp.com",
  projectId: "havenem-e1992",
  storageBucket: "havenem-e1992.appspot.com",
  messagingSenderId: "219721630382",
  appId: "1:219721630382:web:f1b41c3f81bdde5a85233f",
  measurementId: "G-HWSJDC3BNX"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const usersRef = collection(db, "users"); 
export const postsRef = collection(db, "posts"); 
export const favsRef = collection(db, "favorites");