import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyboardNavigationOn } from "../../../../features/pre-rendered-html-nodes";


export default function DisplayGridColumnSizeButton (props) {
    let editedStyle = props.size;
    let editedStyleUnit = setEditedStyleUnit(editedStyle);
    let editedStyleWithNoUnit = editedStyle.replace(editedStyleUnit,"");

    function setEditedStyleUnit(style) {
        let result = "fr";
        if(style !== undefined) {
            if(style.includes("px")) {
                result = "px";
            } 
        }
        return result;
    }

    
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
                inputRef.current.value = editedStyleWithNoUnit;
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
            props.handleEditColumnSize(props.id, e.target.value);
            setOpenEditor(false);
        }
        if(e.key === 'ArrowUp') {
            props.handleEditColumnSize(props.id, parseInt(e.target.value)+1);
        }
        if(e.key === 'ArrowDown') {
            props.handleEditColumnSize(props.id, parseInt(e.target.value)-1);
        }
    }

    function handleChangeUnit() {
        if(editedStyleUnit == "px") {
            props.handleEditColumnUnitChange(props.id, "fr");
        }
        if(editedStyleUnit == "fr") {
            props.handleEditColumnUnitChange(props.id, "px");
        }
    }

    return (
        <div className="text" style={{lineHeight: "18px"}}>
            <div className="space-editor">
                <div className="space-editor-text-box">
                    <div onClick={handleOnClick} className="space-editor-toggle">{(editedStyleWithNoUnit) ? editedStyleWithNoUnit : "0"}</div>
                    <div onClick={handleChangeUnit} className="space-editor-unit-toggle"> {editedStyleUnit} </div>
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