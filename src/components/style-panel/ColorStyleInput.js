import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function ColorStyleInput (props) {

    const activeNodeStyles = useSelector((state) => state.designerProjectState.activeNodeStyles)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex) 
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId) 


    const activeNodeStyle = document.querySelector(`[el_id="${activeNodeId}"]`);
    let activeNodeStyleValue = "";
    if(activeNodeId !== "" ) {
        try {
            activeNodeStyleValue = getComputedStyle(activeNodeStyle)?.[props.style.replace("_","-")];
        } catch (error) {
        }
    }

    const editedStyleValue = useSelector((state) => {
        const nodeStyles = state.designerProjectState.preRenderedStyles[activeStyleIndex];
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style] !== undefined) {
            return nodeStyles[activeProjectResolutionStylesListName][props.style]
        } 
        return "empty";    
    })
    
    const dispatch = useDispatch()

    const inputRef = useRef();

    const [styleValue, setStyleValue] = useState("");

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("");

    useEffect(() => {
        if (activeNodeStyles !== undefined) {
            if (activeNodeStyles.hasOwnProperty(props.style)) {
                setStyleValue(activeNodeStyles [props.style]);
            } else {
                setStyleValue("inherit");
            }
        } else {
            setStyleValue("inherit");
        }
    },[activeNodeStyles]);

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup color active") : setEditorPopUpClass("space-editor-popup color");
    },[openEditor]);

    useEffect(() => {
        if(openEditor === true) {
            inputRef.current.focus();
            if(editedStyleValue === undefined) {
                inputRef.current.value = "";
            } else {
                inputRef.current.value = editedStyleValue;
            }
            dispatch(setArrowNavigationOn(false));
        } else {
            dispatch(setArrowNavigationOn(true));
        }
    },[editorPopUpClass]);

    function handleOnClick () {
        setOpenEditor(!openEditor);
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value]));
            setOpenEditor(false);
        }
    }



    return (
        <div className="text">
            <div className="space-editor">
                <div className="space-editor-text-box">
                    <div 
                    onClick={handleOnClick} 
                    className={"space-editor-toggle " + 
                    ((editedStyleValue !== "empty") ? "active" : "")}>
                        {activeNodeStyleValue}
                    </div>
                </div>    
                
                <input 
                ref={inputRef}
                type="text"
                onBlur={() => setOpenEditor(false)}
                onKeyDown={handleKeyPress}
                className={editorPopUpClass} />

            </div>
         </div>
    )
}