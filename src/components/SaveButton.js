import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import {updateProjectPagesBeforeSaving, setSaveButtonStateText} from "../features/pre-rendered-html-nodes"

import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "../utils/firebase-config.js";

export default function SaveButton() {
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const projectFirebaseId = useSelector((state) => state.designerProjectState.projectFirebaseId)
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const saveButtonStateText = useSelector((state) => state.designerProjectState.saveButtonStateText)

    const dispatch = useDispatch()
    
    const [buttonText, setButtonText] = useState("Save");


    async function saveProjectToFirebasePreRenderedNodesAndStyles() {
      setButtonText("Saving");
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      await updateDoc(doc(db, "projects", projectFirebaseId), {
        pages: projectPages,
        collections: projectCollections,
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
      dispatch(setSaveButtonStateText("Saving"));
      dispatch(updateProjectPagesBeforeSaving());
      dispatch(setSaveButtonStateText("Saved"));
      setTimeout(function () {
        dispatch(setSaveButtonStateText("Save"));
    }, 2000);
    }

    return (
    <button className="saveButton" onClick={handleOnClick}>
        {saveButtonStateText}
    </button>
    )
}