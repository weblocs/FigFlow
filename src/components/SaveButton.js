import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import axios from "axios";
import Constants from "../utils/const.js";

import {updateProjectPagesBeforeSaving} from "../features/pre-rendered-html-nodes"

import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "../utils/firebase-config.js";

export default function SaveButton() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const projectFirebaseId = useSelector((state) => state.designerProjectState.projectFirebaseId)
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const dispatch = useDispatch()

    const [updatedProjectPages, setUpdatedProjectPages] = useState([...projectPages]);
    let params = useParams();
    

    const [buttonText, setButtonText] = useState("Save");

    function saveProject(items,preRenderedStyles) {
      setButtonText("Saving");
        axios
          .put(
            Constants.BASE_API + "update?project_id=" + params.projectSlug,
            { items: [...items], preRenderedStyles: [...preRenderedStyles] },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then((res) => {
            setButtonText("Saved");
            setTimeout(function () {
                setButtonText("Save");
            }, 2000);
          });
    }

    async function saveProjectToFirebasePreRenderedNodesAndStyles(preRenderedHTMLNodes,preRenderedStyles) {
      // setUpdatedProjectPages([...projectPages]);
      // updatedProjectPages[0].preRenderedNodes = preRenderedHTMLNodes;
      setButtonText("Saving");
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      await updateDoc(doc(db, "projects", projectFirebaseId), {
        pages: projectPages,
        collections: projectCollections,
        // items: preRenderedHTMLNodes,
        preRenderedStyles: preRenderedStyles
      })
      .then((res) => {
        setButtonText("Saved");
        setTimeout(function () {
            setButtonText("Save");
        }, 2000);
      });
    } 

    function handleOnClick() {
      
        // saveProject(preRenderedHTMLNodes,preRenderedStyles);
        dispatch(updateProjectPagesBeforeSaving());
        saveProjectToFirebasePreRenderedNodesAndStyles(preRenderedHTMLNodes,preRenderedStyles);
    }

    return (
    <button className="saveButton" onClick={handleOnClick}>
        {buttonText}
    </button>
    )
}