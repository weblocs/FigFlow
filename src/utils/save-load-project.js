import axios from "axios";
import Constants from "./const.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, collection, query, where, doc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { firebaseConfig } from "./firebase-config.js";
import { v4 as uuidv4 } from "uuid";

import { setProjectCollections, setRichTextElements, setProjectSymbols, setPreRenderedStyles, setProjectPages, setProjectFirebaseId, setProjectSwatches, setprojectLayouts, setactiveLayoutFolder, setProjectPageFolders, setProjectPageFolderStructure } from '../features/pre-rendered-html-nodes'
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
  const offlineMode = useSelector((state) => state.designerProjectState.offlineMode)
  const offlineProjectName = useSelector((state) => state.designerProjectState.offlineProjectName)
  
  let params = useParams();

  if(!offlineMode) {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const userProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", params.projectSlug)));
    
    userProjects.forEach((doc) => {
      dispatch(setProjectFirebaseId(doc.id));
    });

    if(projectFirebaseId !== "" ) {
      const projectData = await getDoc(doc(db, "projects", projectFirebaseId));
      dispatch(setProjectPages([...projectData.data().pages]));
      dispatch(setProjectCollections([...projectData.data().collections]));
      dispatch(setPreRenderedStyles([...projectData.data().preRenderedStyles]));
      dispatch(setProjectSymbols([...projectData.data()?.symbols]));
      dispatch(setProjectSwatches([...projectData.data()?.swatches]));
      dispatch(setProjectPageFolders([...projectData.data()?.projectPageFolders]));
      dispatch(setProjectPageFolderStructure([...projectData.data()?.projectPageFolderStructure]));
      dispatch(setRichTextElements([...projectData.data()?.richTextElements]));
      dispatch(setProjectImages([...projectData.data()?.images]));
      dispatch(setprojectLayouts([...projectData.data()?.sections]));
    }
  } else {
    let projectPagesStorage = localStorage.getItem(offlineProjectName+"pages");
    if (JSON.stringify(projectPagesStorage) !== "null" ) {
      dispatch(setProjectPages(JSON.parse(projectPagesStorage)));
      dispatch(setProjectPageFolderStructure(JSON.parse(localStorage.getItem(offlineProjectName+"projectPageFolderStructure"))));
    } else {
      let firstPageInProjectId = uuidv4();
      dispatch(setProjectPages([{name: "Home", id: firstPageInProjectId, preRenderedHTMLNodes:[]}]));
      dispatch(setProjectPageFolderStructure([{name: "Home", id: firstPageInProjectId}]));
    }
    if(JSON.stringify(localStorage.getItem(offlineProjectName+"collections")) !== "null") {
      dispatch(setProjectCollections(JSON.parse(localStorage.getItem(offlineProjectName+"collections"))));
      dispatch(setPreRenderedStyles(JSON.parse(localStorage.getItem(offlineProjectName+"preRenderedStyles"))));
      dispatch(setProjectSymbols(JSON.parse(localStorage.getItem(offlineProjectName+"symbols"))));
      dispatch(setProjectSwatches(JSON.parse(localStorage.getItem(offlineProjectName+"swatches"))));
      dispatch(setProjectPageFolders(JSON.parse(localStorage.getItem(offlineProjectName+"projectPageFolders"))));
      dispatch(setRichTextElements(JSON.parse(localStorage.getItem(offlineProjectName+"richTextElements"))));
      dispatch(setProjectImages(JSON.parse(localStorage.getItem(offlineProjectName+"images"))));
      dispatch(setprojectLayouts(JSON.parse(localStorage.getItem(offlineProjectName+"sections"))));
    }
  }
}

