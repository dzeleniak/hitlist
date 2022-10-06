import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";

import { 
    getDatabase, 
    ref, 
    set, 
    onValue, 
    get 
} from 'firebase/database';


const config = {
    apiKey: "AIzaSyBwnZPpG3nrixn1fF3GfwACY_sfPAebhDY",
    authDomain: "hitlist-7825f.firebaseapp.com",
    databaseURL: "https://hitlist-7825f-default-rtdb.firebaseio.com",
    projectId: "hitlist-7825f",
    storageBucket: "hitlist-7825f.appspot.com",
    messagingSenderId: "1117199722",
    appId: "1:1117199722:web:90a6b6a5ce2d5f305b9913",
    measurementId: "G-H8YXEB9XX8"
};

const app = initializeApp(config);
const db = getDatabase(app);
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message)
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link set");
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}

const logout = () => {
    signOut(auth);
};



export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};