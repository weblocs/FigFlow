import React, {useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, where,query, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseConfig } from "../utils/firebase-config";
import { Link } from "react-router-dom";

export default function Login() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [uid,setUid] = useState("");
    const [userEmail,setUserEmail] = useState(""); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    function handleSignUpWithGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    function handleSignOut(){
        signOut(auth).then(() => {
        // Sign-out successful.
        setUid("");
        setUserEmail("");
        setIsLoggedIn(false);
        }).catch((error) => {
        // An error happened.
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
            setUserEmail(user.email);
            setIsLoggedIn(true);
        } else {

        }
    });

    return (
        <div className="loginSection">
            { !isLoggedIn ? 
            <button className="new-project-button" onClick={handleSignUpWithGoogle}>Log in with Google</button> :
            <div className="accountBox">
            Account: {userEmail}
            <Link className="new-project-button" to="/">Dashboard</Link>
            <button className="new-project-button outline" onClick={handleSignOut}>Log out</button>
            </div> }
            
        </div>
    )
}