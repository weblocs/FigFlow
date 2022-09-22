import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleProperty, setKeyboardNavigationOn} from "../../../features/project"

export default function SpacingStyleButton (props) {

    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const activeStyleId = useSelector((state) => state.project.activeStyleId)
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)
    const stylesInActiveNode = useSelector((state) => state.project.stylesInActiveNode)
    const activeStyleIndex = useSelector((state) => state.project.activeStyleIndex)
    const activeProjectResolutionStylesListName = useSelector((state) => state.project.activeProjectResolutionStylesListName)

    const activeStyleOptionIndex = useSelector((state) => state.project.activeStyleOptionIndex);
    const nodeStyles = useSelector((state) => {
        if(activeStyleId === stylesInActiveNode?.[0]?.id) {
            return preRenderedStyles[activeStyleIndex];
        } else {
            return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId);
        }   
    })


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
            dispatch(setKeyboardNavigationOn(false));
        } else {
            dispatch(setKeyboardNavigationOn(true));
        }
    },[editorPopUpClass]);

    function handleOnClick () {
        setOpenEditor(!openEditor);
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            if(styleValueUnit === "") {
                dispatch(editStyleProperty([props.style,e.target.value+"px"]));
            } else {
                dispatch(editStyleProperty([props.style,e.target.value+styleValueUnit]));
            }
            setOpenEditor(false);
        }
        if(e.key === 'ArrowUp') {
            dispatch(editStyleProperty([props.style,parseInt(e.target.value)+1+styleValueUnit]));
            inputRef.current.value = editedStyleValue;
        }
        if(e.key === 'ArrowDown') {
            dispatch(editStyleProperty([props.style,parseInt(e.target.value)-1+styleValueUnit]));
        }
    }

    function handleChangeUnit() {
        if(activeNodeUnit == "px") {
            if(editedStyleValue !== "empty") {
                dispatch(editStyleProperty([props.style,editedStyleValue+"%"]));
            } else {
                dispatch(editStyleProperty([props.style,0+"%"]));
            }
            
        }
        if(activeNodeUnit == "%") {
            if(editedStyleValue !== "empty") {
                dispatch(editStyleProperty([props.style,editedStyleValue+"px"]));
            } else {
                dispatch(editStyleProperty([props.style,0+"px"]));
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
                type="text"
                onBlur={() => setOpenEditor(false)}
                onKeyDown={handleKeyPress}
                className={editorPopUpClass} />

            </div>
         </div>
    )
}