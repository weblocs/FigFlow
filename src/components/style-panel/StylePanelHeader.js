import React, {useState, useEffect, useRef} from "react";

import { useSelector, useDispatch } from 'react-redux'
import {connectStyleWithNode, setArrowNavigationOn, setActiveStyleId, deleteStyleFromStylesInActiveNode} from "../../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'

export default function StylePanelHeader () {

    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const activeStyleName = useSelector((state) => state.designerProjectState.activeStyleName)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)

    const dispatch = useDispatch()

    const inputRef = useRef();

    const [openEditor, setOpenEditor] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("");


    const { openClassEditorShortcut } = useKeyboardShortcut(
        ["Meta", "Enter"],
        shortcutKeys => {
            handleOpenNewStyleInput()
        },
        { 
          overrideSystem: false,
          ignoreInputFields: false, 
          repeatOnHold: false 
        }
      );

      const { closeClassEditorShortcut } = useKeyboardShortcut(
        ["Escape"],
        shortcutKeys => {
            handleCloseNewStyleInput()
        },
        { 
          overrideSystem: false,
          ignoreInputFields: false, 
          repeatOnHold: false 
        }
      );

    useEffect(() => {
        (openEditor === true) ? setEditorPopUpClass("space-editor-popup new-class active") : setEditorPopUpClass("space-editor-popup new-class");
    },[openEditor]);

    useEffect(() => {
        if(openEditor === true) {
            inputRef.current.focus();
            inputRef.current.value = "";
            dispatch(setArrowNavigationOn(false));
        } else {
            dispatch(setArrowNavigationOn(true));
        }
    },[editorPopUpClass]);

    function handleOpenNewStyleInput () {
        setOpenEditor(!openEditor);
    }

    function handleCloseNewStyleInput () {
        setOpenEditor(false);
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {

            dispatch(connectStyleWithNode(e.target.value));

            setOpenEditor(false);
        }
    }

    return (
        <div className="style-panel-box sticky">
            <div className="style-panel-title-box">
                <div className="text">{activeStyleName} styles</div>
            </div>
            <div className="selector-box">
                <div className="text">Selector</div>
                <div className="inheriting-box">
                <div className="text">Inheriting</div>
                <div className="text inheriting-text">1 selector</div>
                </div>
            </div>
            <div className="select-class-input">

                <div className="new-class-toggle" onClick={handleOpenNewStyleInput}></div>

                <input 
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyPress}
                className={editorPopUpClass} />

                    {stylesInActiveNode?.map((el) => (

                    <div key={el.id} onClick={() => dispatch(setActiveStyleId(el.id))} className={"selected-class " + ((activeStyleId == el.id) ? "active" : "")}>
                        <div className="text">{el.name}</div>
                        <span 
                        className="seleted-class-delete-button"
                        onClick={() => dispatch(deleteStyleFromStylesInActiveNode(el.id))}
                        > x
                        </span>
                    </div>
                    ))}

            </div>
            <div className="style-panel-on-page-box">
                <div className="text on-page">1 on this page</div>
            </div>
            </div>
    )
}