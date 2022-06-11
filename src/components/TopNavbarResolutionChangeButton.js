import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setActiveProjectResolution } from "../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'

export default function TopNavbarResolutionChangeButton({resolutionNumber}) {

    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)
    const arrowNavigationOn = useSelector((state) => state.designerProjectState.arrowNavigationOn)

    const { copyShortcut } = useKeyboardShortcut(
        [resolutionNumber],
        shortcutKeys => {
            (arrowNavigationOn) && (
                dispatch(setActiveProjectResolution(resolutionNumber))
            );
        },
        { 
          overrideSystem: false,
          ignoreInputFields: false, 
          repeatOnHold: false 
        }
      );

    const dispatch = useDispatch()

    return (
        <div 
        className={"addNodeButton " + ((activeProjectResolution === resolutionNumber) ? "active" : "")} 
        onClick={() => dispatch(setActiveProjectResolution(resolutionNumber))}>
            {resolutionNumber}
        </div>  
    )
}