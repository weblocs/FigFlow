import axios from "axios";
import Constants from "./const.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, collection, query, where, doc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

import { setProjectCollections, setPreRenderedStyles, setProjectPages, setProjectFirebaseId } from '../features/pre-rendered-html-nodes'

export default function saveProject(items,preRenderedStyles) {
  axios
    .put(
      Constants.BASE_API + "update",
      { items: [...items], preRenderedStyles: [...preRenderedStyles] },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then((res) => {
      return "Saved";
    });
}

export function loadProjectPreRenderedNodesAndStyles(projectId) {
  const project_id = "test";
  const dispatch = useDispatch()
  useEffect(() => {
  axios
      .get(
        Constants.BASE_API + "items?project_id=" + projectId
      )
      .then((res) => {
        // sending data from MongoDB
        // dispatch(setPreRenderedHTMLNodes([...res.data[0].items]));
        // dispatch(setPreRenderedStyles([...res.data[0].preRenderedStyles]));  
      });
  }, []);
}

export async function loadProjectFromFirebasePreRenderedNodesAndStyles(projectSlug) {

  const dispatch = useDispatch()
  const projectFirebaseId = useSelector((state) => state.designerProjectState.projectFirebaseId)
  
  let params = useParams();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const userProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", params.projectSlug)));
  
  userProjects.forEach((doc) => {
    dispatch(setProjectFirebaseId(doc.id));
  });
  
  const projectData = await getDoc(doc(db, "projects", projectFirebaseId));

  dispatch(setProjectPages([...projectData.data().pages]));
  dispatch(setProjectCollections([...projectData.data().collections]));
  dispatch(setPreRenderedStyles([...projectData.data().preRenderedStyles]));
}

