import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyADyGoEHruXnnvUA_NQtLrcLju06mpGo3I",
    authDomain: "haseebtodo.firebaseapp.com",
    projectId: "haseebtodo",
    storageBucket: "haseebtodo.appspot.com",
    messagingSenderId: "1085532058198",
    appId: "1:1085532058198:web:6982c26ff4140b74b441f7"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
