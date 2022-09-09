import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {setActiveProjectTab} from "../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'

export default function ProjectSidebarButton(props){
    const dispatch = useDispatch();
    const keyboardNavigationOn = useSelector((state) => state.designerProjectState.keyboardNavigationOn)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)


    const { openNavigatorShortcut } = useKeyboardShortcut(
        [props.shortcode],
        shortcutKeys => {
            if(keyboardNavigationOn && !window.event.metaKey) {
                dispatch(setActiveProjectTab(props.tab))
            }
        },
        { 
          overrideSystem: false,
          ignoreInputFields: false, 
          repeatOnHold: false 
        }
    );
    
    return(
        <div className={"projectSidebarButton" + ((activeProjectTab === props.tab) ? " active" : "")} onClick={() => dispatch(setActiveProjectTab(props.tab))}>
            {props?.img ? 
            <img className="sidebar-button_image" src={props.img} /> :
            <div>{props.letter}</div>
            }
           
        </div>
    )
}