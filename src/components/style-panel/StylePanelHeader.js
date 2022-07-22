import React, {useState, useEffect, useRef} from "react";

import { useSelector, useDispatch } from 'react-redux'
import {setKeyboardNavigationOn, setActiveStyleId, deleteStyleFromStylesInActiveNode, createNewStyle, renameMainStyle} from "../../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'
import SubStyleSticker from "./SubStyleSticker";

export default function StylePanelHeader () {

    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const activeStyleName = useSelector((state) => state.designerProjectState.activeStyleName)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)

    const dispatch = useDispatch()

    const inputRef = useRef();
    const renameInputRef = useRef();

    const [isStyleEditorOpen, setIsStyleEditorOpen] = useState(false);
    const [isAddStyleInputOpen, setIsAddStyleInputOpen] = useState(false);
    const [editorPopUpClass, setEditorPopUpClass] = useState("");

    const shortcutSystemConfig = { overrideSystem: false, ignoreInputFields: false, repeatOnHold: false };
    const { openClassEditorShortcut } = useKeyboardShortcut(["Meta", "Enter"],
        shortcutKeys => { handleOpenNewStyleInput() },
        shortcutSystemConfig
    );

    const { closeClassEditorShortcut } = useKeyboardShortcut(["Escape"],
        shortcutKeys => { handleCloseNewStyleInput() },
        shortcutSystemConfig
    );

    useEffect(() => {
        (isAddStyleInputOpen === true) ? setEditorPopUpClass("space-editor-popup new-class active") : setEditorPopUpClass("space-editor-popup new-class");
    },[isAddStyleInputOpen]);

    useEffect(() => {
        if(isAddStyleInputOpen) {
            inputRef.current.focus();
            inputRef.current.value = "";
            dispatch(setKeyboardNavigationOn(false));
        } else {
            dispatch(setKeyboardNavigationOn(true));
        }
    },[editorPopUpClass]);

    function handleOpenNewStyleInput () {
        setIsAddStyleInputOpen(true);
    }

    function handleCloseNewStyleInput () {
        setIsAddStyleInputOpen(false);
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            dispatch(createNewStyle(e.target.value));
            setIsAddStyleInputOpen(false);
        }
    }

    function handleKeyPressRenameInput(e, id) {
        if(e.key === 'Enter') {
            handleRename(id);
        }
    }

    function handleRename (id) {
        dispatch(renameMainStyle({id: id, name: renameInputRef.current.value }));
        renameInputRef.current.value = "";
        setIsStyleEditorOpen(false);
    }

    function handleRemove(id) {
        dispatch(deleteStyleFromStylesInActiveNode(id));
        renameInputRef.current.value = "";
        setIsStyleEditorOpen(false);
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
                onBlur={handleCloseNewStyleInput}
                className={editorPopUpClass} />

                    {stylesInActiveNode?.map((el, index) => {
                    if(index === 0) {
                        return (
                            <div key={el.id}
                                className={"selected-class " + ((activeStyleId == el.id) ? "active" : "")}
                                style={{zIndex: stylesInActiveNode.length + 10 }}>
                                <div className="text" onClick={() => dispatch(setActiveStyleId(el.id))}>{el.name}</div>
                                <span 
                                className="seleted-class-delete-button"
                                onClick={() => setIsStyleEditorOpen(!isStyleEditorOpen)}
                                > ⌄
                                </span>
                                <div className={"style-options-dropdown" + ((isStyleEditorOpen) ? " active" : "")}>
                                    
                                    <div style={{display: "flex"}}>
                                    <input 
                                    onFocus={() => dispatch(setKeyboardNavigationOn(false))} 
                                    onBlur={() => dispatch(setKeyboardNavigationOn(true))}
                                    onKeyDown={(e) => handleKeyPressRenameInput(e, el.id)}
                                    ref={renameInputRef}
                                    placeholder="New style name" />
                                    <button onClick={() => handleRename(el.id)}>Rename</button>
                                    </div>
                                    <button onClick={() => handleRemove(el.id)}>Remove</button>
                                </div>
                            </div>
                        )
                    }
                    })}

                    {preRenderedStyles.find(({id}) => id === stylesInActiveNode[0]?.id)?.childrens.map((child,index) => {
                        let childId = child.options[0].id;
                        let childName = child.options[0].name;
                        let styleIsSet = false; 
                        if (stylesInActiveNode.length > index + 1) {
                            if(stylesInActiveNode[index+1]?.id !== undefined && stylesInActiveNode[index+1]?.id !== "") {
                                childId = stylesInActiveNode[index+1]?.id;
                                childName = stylesInActiveNode[index+1]?.name;
                                styleIsSet = true;
                            }
                        }

                        return (
                            <SubStyleSticker id={childId} name={childName} index={index} styleIsSet={styleIsSet} key={childId} />
                        )
                        })}

            </div>
            <div className="style-panel-on-page-box">
                <div className="text on-page">1 on this page</div>
            </div>
            </div>
    )
}