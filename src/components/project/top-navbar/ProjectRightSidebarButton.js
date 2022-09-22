import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {setActiveRightSidebarTab} from "../../../features/project" 

export default function ProjectRightSidebarButton(props) {
    const dispatch = useDispatch();

    const activeRightSidebarTab = useSelector((state) => state.project.activeRightSidebarTab)
    
    return (
        <div 
        className={"projectRightSidebarNav" + ((activeRightSidebarTab === props.tab) ? " active" : "")}
        onClick={() => dispatch(setActiveRightSidebarTab(props.tab))}>
            <img src={props.icon} style={{width: "14px"}} />
        </div>
    )
}