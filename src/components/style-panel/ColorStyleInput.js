import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function ColorStyleInput (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const editedStyle = useSelector((state) => (state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles [props.style]))
    
    const dispatch = useDispatch()

    const inputRef = useRef();

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("");

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup color active") : setEditorPopUpClass("space-editor-popup color");
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
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value]));
            setOpenEditor(false);
        }
    }



    return (
        <div className="text">
            <div className="space-editor">
                <div className="space-editor-text-box">
                    <div onClick={handleOnClick} className="space-editor-toggle">{(editedStyle) ? editedStyle : "inherit"}</div>
                </div>    
                
                <input 
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyPress}
                className={editorPopUpClass} />

            </div>
         </div>
    )
}