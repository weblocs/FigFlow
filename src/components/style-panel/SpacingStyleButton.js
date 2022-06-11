import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function SpacingStyleButton (props) {

    const activeNodeStyles = useSelector((state) => state.designerProjectState.activeNodeStyles)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)

    const dispatch = useDispatch()
    
    const inputRef = useRef();

    const [styleValue, setStyleValue] = useState("");
    const [styleValueUnit, setStyleValueUnit] = useState("");

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("space-editor-popup");

    const activeNodeStyle = document.querySelector(`[el_id="${activeNodeId}"]`);
    let activeNodeUnit = "";
    let activeNodeStyleValue = "";

    if(activeNodeId !== "" ) {
        try {
            activeNodeStyleValue = getComputedStyle(activeNodeStyle)?.[props.style.replace("_","-")].replace("px","").replace("%","");
            
            if(getComputedStyle(activeNodeStyle)?.[props.style.replace("_","-")].includes("px")) {
                activeNodeUnit = "px";
            } else if(getComputedStyle(activeNodeStyle)?.[props.style.replace("_","-")].includes("%")) {
                activeNodeUnit = "%";
            } else {
                activeNodeUnit = "";
            }
        } catch (error) {
        } 
    }

    const editedStyleValue = useSelector((state) => {
        const nodeStyles = state.designerProjectState.preRenderedStyles[activeStyleIndex];
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style] !== undefined) {
            if (props.placeholder) {
                activeNodeStyleValue = nodeStyles[activeProjectResolutionStylesListName][props.style].replace("px","").replace("%","");
            }
            return nodeStyles[activeProjectResolutionStylesListName][props.style]
        } 
        if (props.placeholder) {
            activeNodeStyleValue = props.placeholder;   
        }
        return "empty";    
    })
    

    useEffect(() => {
        if(editedStyleValue.includes("px")) {
            setStyleValueUnit("px");
        } else if(editedStyleValue.includes("%")) {
            setStyleValueUnit("%");
        } else 
        if(activeNodeStyleValue = props.placeholder) {
            setStyleValueUnit("");
        }
    },[editedStyleValue]);

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup active") : setEditorPopUpClass("space-editor-popup");
    },[openEditor]);

    useEffect(() => {
        if(openEditor === true) {
            inputRef.current.focus();
            if(styleValue === undefined) {
                inputRef.current.value = "";
            } else {
                inputRef.current.value = activeNodeStyleValue;
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
            if(styleValueUnit === "") {
                dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+"px"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+styleValueUnit]));
            }
            setOpenEditor(false);
        }
        if(e.key === 'ArrowUp') {
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)+1+styleValueUnit]));
        }
        if(e.key === 'ArrowDown') {
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)-1+styleValueUnit]));
        }
    }

    function handleChangeUnit() {
        

        if(activeNodeUnit == "px") {
            if(editedStyleValue !== "empty") {
                dispatch(editStyleInPreRenderedStyles([props.style,editedStyleValue+"%"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,0+"%"]));
            }
            
        }
        if(activeNodeUnit == "%") {
            if(editedStyleValue !== "empty") {
                dispatch(editStyleInPreRenderedStyles([props.style,editedStyleValue+"px"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,0+"px"]));
            }
        }
    }



    return (
        <div className="text">
            <div className="space-editor">
                <div 
                className={"space-editor-text-box " + 
                ((editedStyleValue !== "empty") ? "active" : "")}>
                    <div onClick={handleOnClick}
                    className="space-editor-toggle">
                        {activeNodeStyleValue}</div>
                    <div onClick={handleChangeUnit} className="space-editor-unit-toggle"> {styleValueUnit} </div>
                </div>    
                
                <input 
                ref={inputRef}
                type="number"
                onBlur={() => setOpenEditor(false)}
                onKeyDown={handleKeyPress}
                className={editorPopUpClass} />

            </div>
         </div>
    )
}