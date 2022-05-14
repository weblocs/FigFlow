import React, { useState } from "react"
import { useSelector } from 'react-redux'

import axios from "axios";
import Constants from "../../utils/const.js";

import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "../../utils/firebase-config.js";

export default function SaveButton(props) {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const projectFirebaseId = useSelector((state) => state.designerProjectState.projectFirebaseId)

    

    const [buttonText, setButtonText] = useState("Save");

    function saveProject(items,preRenderedStyles) {
      setButtonText("Saving");
        axios
          .put(
            Constants.BASE_API + "update?project_id=" + props.projectSlug,
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
      setButtonText("Saving");
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      
      await updateDoc(doc(db, "projects", projectFirebaseId), {
        items: preRenderedHTMLNodes,
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
        saveProjectToFirebasePreRenderedNodesAndStyles(preRenderedHTMLNodes,preRenderedStyles);
    }

    return (
    <button className="saveButton" onClick={handleOnClick}>
        {buttonText}
    </button>
    )
}