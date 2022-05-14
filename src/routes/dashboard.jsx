import React, {useState, useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDocs, setDoc, doc, where,query, collection } from "firebase/firestore";
import { func } from "prop-types";
import { v4 as uuidv4 } from "uuid";

import CreateNewProject from "../components/CreateNewProject"

export default function Dashboard() {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    const [uid,setUid] = useState("");
    const [userEmail,setUserEmail] = useState(""); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [projects, setProjects] = useState([]);
    const [testVar, setTestVar] = useState("");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
            setUserEmail(user.email);
            setIsLoggedIn(true);
        }
    });

    async function readProjects(){
        const querySnapshot = await getDocs(query(collection(db, "projects"), where("userid", "==", uid)) );
        let tempProjects = [];
        querySnapshot.forEach((doc) => {
            tempProjects = [...tempProjects, doc.data()];
        });
        setProjects(tempProjects);
    }

    useEffect(() => {
        readProjects();
    },[uid]);

    return (
        <div>

            {isLoggedIn ?
            <div>
                <CreateNewProject userid={uid} />
                <div>user: {userEmail}</div>
            </div> : <Link to="/login" key="login">Login</Link> }
            
            {isLoggedIn &&

            
            projects.map((project,index) =>
                <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/design/${project.projectId}`}
                key={project.projectId}>
                    {project.projectId}
                </Link>
            )} 
            <Outlet />
        </div>
    );
}