import React from "react"
import { useDispatch } from "react-redux"
import {setActiveRightSidebarTab} from "../features/pre-rendered-html-nodes" 

export default function ProjectRightSidebarButton(props) {
    const dispatch = useDispatch();
    
    return (
        <div className="projectRightSidebarNav" onClick={() => dispatch(setActiveRightSidebarTab(props.tab))}>
            {props.letter}
        </div>
    )
}