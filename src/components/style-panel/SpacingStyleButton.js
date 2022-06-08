import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function SpacingStyleButton (props) {

    const activeNodeStyles = useSelector((state) => state.designerProjectState.activeNodeStyles)
    const dispatch = useDispatch()
    
    const inputRef = useRef();

    const [styleValue, setStyleValue] = useState("");
    const [styleValueUnit, setStyleValueUnit] = useState("");

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("space-editor-popup");
    

    useEffect(() => {
        if (activeNodeStyles !== undefined) {
            if (activeNodeStyles.hasOwnProperty(props.style)) {
                setStyleValue(activeNodeStyles [props.style]?.replace('px','').replace('%',''));
                
                if(activeNodeStyles [props.style].includes("px")) {
                    setStyleValueUnit("px");
                }
                if(activeNodeStyles [props.style].includes("%")) {
                    setStyleValueUnit("%");
                }

            } else {
                setStyleValue("0");
            }
        } else {
            setStyleValue("0");
        }
    },[activeNodeStyles]);

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup active") : setEditorPopUpClass("space-editor-popup");
    },[openEditor]);

    useEffect(() => {
        if(openEditor === true) {
            inputRef.current.focus();
            if(styleValue === undefined) {
                inputRef.current.value = "";
            } else {
                inputRef.current.value = styleValue;
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
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+styleValueUnit]));
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

        if(styleValueUnit == "px") {
            if(styleValue !== undefined) {
                dispatch(editStyleInPreRenderedStyles([props.style,styleValue+"%"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,0+"%"]));
            }
            
        }
        if(styleValueUnit == "%") {
            if(styleValue !== undefined) {
                dispatch(editStyleInPreRenderedStyles([props.style,styleValue+"px"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,0+"px"]));
            }
        }
    }



    return (
        <div className="text">
            <div className="space-editor">
                <div className="space-editor-text-box">
                    <div onClick={handleOnClick} className="space-editor-toggle">{styleValue}</div>
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