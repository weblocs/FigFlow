import React from "react"
import { useSelector } from 'react-redux'
import saveProject from "../../utils/save-load-project";

export default function SaveButton() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)

    return (
    <button className="saveButton" onClick={() => saveProject(preRenderedHTMLNodes,preRenderedStyles)}>
        Save
    </button>
    )
}