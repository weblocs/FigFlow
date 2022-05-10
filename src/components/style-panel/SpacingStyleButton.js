import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function SpacingStylePanel (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const editedStyle = useSelector((state) => (state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles [props.style])?.replace('px',''))
    
    const dispatch = useDispatch()

    const inputRef = useRef();

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("space-editor-popup");

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup active") : setEditorPopUpClass("space-editor-popup");
    },[openEditor]);

    useEffect(() => {
        if(openEditor === true) {
            inputRef.current.focus();
            if(editedStyle === undefined) {
                inputRef.current.value = "";
            } else {
                inputRef.current.value = editedStyle;
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
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+"px"]));
            setOpenEditor(false);
        }
        if(e.key === 'ArrowUp') {
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)+1+"px"]));
        }
        if(e.key === 'ArrowDown') {
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)-1+"px"]));
        }
    }



    return (
        <div className="text">
            <div className="space-editor">
                <div onClick={handleOnClick} className="space-editor-toggle">{(editedStyle) ? editedStyle : "0"}</div>
                
                <input 
                ref={inputRef}
                type="number"
                onKeyDown={handleKeyPress}
                className={editorPopUpClass} />
            </div>
         </div>
    )
}