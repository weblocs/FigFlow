import React from "react";
import { useDispatch } from "react-redux";
import {setActiveProjectTab} from "../features/pre-rendered-html-nodes"

export default function ProjectSidebarButton(props){
    const dispatch = useDispatch();
    return(
        <div className="projectSidebarButton" onClick={() => dispatch(setActiveProjectTab(props.tab))}>
           {props.letter}
        </div>
    )
}