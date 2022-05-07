import React, {useState} from "react"
import { useSelector, useDispatch } from 'react-redux'

import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"

export default function ProjectStylePropertyEditor(props) {

    const [showEditor, setShowEditor] = useState(false);

    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)

    let activeStyleClass = "panelStyleEditorWrapper";

    (preRenderedStyles[activeStyleIndex]?.styles [props.name.replace(" ","_")] !== undefined) && (activeStyleClass = "panelStyleEditorWrapper active")

    const dispatch = useDispatch()

    return (
        <div className={activeStyleClass}>
          <div>{props.name}: {preRenderedStyles[activeStyleIndex]?.styles [props.name.replace(" ","_")]} 
          <span className="setShowEditorToggle" onClick={() => setShowEditor(!showEditor)}>edit</span> </div>
          <div className={"panelStyleEditor " + (showEditor && "show")} >
            <div style={{fontSize:"10px"}}>change to</div>
            <input onKeyPress={(e) => e.key === 'Enter' && dispatch(editStyleInPreRenderedStyles([props.name.replace(" ","_"),e.target.value]))  } />
          </div>
        </div>
    )
}