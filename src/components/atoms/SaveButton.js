import React, { useState } from "react"
import { useSelector } from 'react-redux'

import axios from "axios";
import Constants from "../../utils/const.js";

export default function SaveButton() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)


    const [buttonText, setButtonText] = useState("Save");

    function saveProject(items,preRenderedStyles) {
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
            setButtonText("Saved");
            setTimeout(function () {
                setButtonText("Save");
            }, 2000);
          });
    }

    function handleOnClick() {
        saveProject(preRenderedHTMLNodes,preRenderedStyles);
    }

    return (
    <button className="saveButton" onClick={handleOnClick}>
        {buttonText}
    </button>
    )
}