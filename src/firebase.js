// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNf8z2_ILiNnMs_7gsnSxGilryKRvxTSo",
  authDomain: "chat-d3b56.firebaseapp.com",
  projectId: "chat-d3b56",
  storageBucket: "chat-d3b56.appspot.com",
  messagingSenderId: "567003491900",
  appId: "1:567003491900:web:b0fa137a350161b5fcdd39",
  measurementId: "G-HNB2PRYHQ0"
};

// Initialize Firebase

 export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);
 export const auth =  getAuth();
 export const storage = getStorage();
 export const db = getFirestore();