import axios from "axios";
import Constants from "./const.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, collection, query, where, doc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { firebaseConfig } from "./firebase-config.js";

import { setProjectCollections, setRichTextElements, setProjectSymbols, setPreRenderedStyles, setProjectPages, setProjectFirebaseId, setProjectSwatches, setProjectSections, setActiveSectionFolder } from '../features/pre-rendered-html-nodes'
import { setProjectImages } from "../features/project-images"

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
  dispatch(setProjectSymbols([...projectData.data()?.symbols]));
  dispatch(setProjectSwatches([...projectData.data()?.swatches]));
  dispatch(setProjectSections([...projectData.data()?.sections]));
  dispatch(setActiveSectionFolder(projectData.data()?.sections?.[0]?.id));
  dispatch(setRichTextElements([...projectData.data()?.richTextElements]));
  if(projectData.data()?.images !== undefined) {
    dispatch(setProjectImages([...projectData.data()?.images]));
  }
  
  

  

  

  


  // Storage

  // const storage = getStorage(firebaseApp);
  // const storageRef = ref(storage);


}

