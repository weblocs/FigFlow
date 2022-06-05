import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setActiveProjectResolution } from "../features/pre-rendered-html-nodes"

export default function TopNavbarResolutionChangeButton({resolutionNumber}) {

    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)

    const dispatch = useDispatch()

    return (
        <div 
        className={"addNodeButton " + ((activeProjectResolution === resolutionNumber) ? "active" : "")} 
        onClick={() => dispatch(setActiveProjectResolution(resolutionNumber))}>
            {resolutionNumber}
        </div>  
    )
}