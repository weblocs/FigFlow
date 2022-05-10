import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"

export default function SpacingStylePanel () {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const paddingTopStyle = useSelector((state) => (state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["padding_top"])?.replace('px',''))
    const dispatch = useDispatch()

    const inputRef = useRef();

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("space-editor-popup");

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup active") : setEditorPopUpClass("space-editor-popup");
    },[openEditor]);

    useEffect(() => {
        inputRef.current.focus();
        console.log(inputRef.current);
    },[editorPopUpClass]);




    function handleOnClick () {
        setOpenEditor(!openEditor);
        
        // if (openEditor) {
        //     inputRef.current.focus();
        // }
    }

    return (
        <div className="text">
            <div className="space-editor">
                <div onClick={handleOnClick} className="space-editor-toggle">{(paddingTopStyle) ? paddingTopStyle : "0"}</div>
                
                <input 
                ref={inputRef}
                type="text"
                onKeyPress={(e) => e.key === 'Enter' && dispatch(editStyleInPreRenderedStyles(["padding_top",e.target.value+"px"]))  }
                className={editorPopUpClass} />
            </div>
         </div>
    )
}