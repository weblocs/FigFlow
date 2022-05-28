import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function SpacingStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)

    const editedStyle = useSelector((state) => (state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles [props.style])?.replace('px','').replace('%',''))
    const editedStyleUnit = useSelector((state) => setEditedStyleUnit(state));

    function setEditedStyleUnit(state) {
        let tempStyle = useSelector((state) => (state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles [props.style]));
        let result = "px";

        if(editedStyle !== undefined) {
            if(JSON.stringify(tempStyle).includes("px")) {
                result = "px";
            } 
    
            if (JSON.stringify(tempStyle).includes("%")) {
                result = "%";
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
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+editedStyleUnit]));
            setOpenEditor(false);
        }
        if(e.key === 'ArrowUp') {
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)+1+editedStyleUnit]));
        }
        if(e.key === 'ArrowDown') {
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)-1+editedStyleUnit]));
        }
    }

    function handleChangeUnit() {
        
        if(editedStyleUnit == "px") {
            if(editedStyle !== undefined) {
                dispatch(editStyleInPreRenderedStyles([props.style,editedStyle+"%"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,0+"%"]));
            }
            
        }
        if(editedStyleUnit == "%") {
            if(editedStyle !== undefined) {
                dispatch(editStyleInPreRenderedStyles([props.style,editedStyle+"px"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,0+"px"]));
            }
        }
    }



    return (
        <div className="text">
            <div className="space-editor">
                <div className="space-editor-text-box">
                    <div onClick={handleOnClick} className="space-editor-toggle">{(editedStyle) ? editedStyle : "0"}</div>
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