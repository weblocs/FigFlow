import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setActiveProjectResolution } from "../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'

export default function TopNavbarResolutionChangeButton({resolutionNumber, image}) {

    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)
    const keyboardNavigationOn = useSelector((state) => state.designerProjectState.keyboardNavigationOn)

    const { copyShortcut } = useKeyboardShortcut(
        [resolutionNumber],
        shortcutKeys => {
            (keyboardNavigationOn) && (
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
            <img src={image} style={{width: "16px"}} />
        </div>  
    )
}