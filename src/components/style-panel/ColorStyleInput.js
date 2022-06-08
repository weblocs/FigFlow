import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function ColorStyleInput (props) {

    const activeNodeStyles = useSelector((state) => state.designerProjectState.activeNodeStyles)

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex) 
    
    let resulutionType = "styles";

    const editedStyle = useSelector((state) => {

        const nodeStyles = state.designerProjectState.preRenderedStyles[activeStyleIndex];
        
        if (nodeStyles?.[resulutionType] !== undefined) {
            return nodeStyles[resulutionType][props.style]
        }

        return "";
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
                    <div onClick={handleOnClick} className="space-editor-toggle">{styleValue}</div>
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