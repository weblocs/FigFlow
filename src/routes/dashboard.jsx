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
        } else {
            window.location.href = "/login";
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
<div className="dashboard-section">
<div className="container">
  <div className="new-project-header">
    <div className="dashboard-email-box">
        
        <div className="dashboard-log-out">Account:</div>
        <Link to="/login" className="user-link">
        <div className="dashboard-email">{userEmail}</div>
        </Link>
    </div>
    <CreateNewProject userid={uid} />
    
  </div>
  <div className="project-grid">
        {projects.map((project) => 
            <Link
                className="project-item"
                to={`/create/${project.projectId}`}
                key={project.projectId}>
                <div className="project-title">{project.projectId}</div>
            </Link>
        )} 
        <Outlet />
  </div>
</div>
</div>
    );
}