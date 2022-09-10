import React, {useState, useEffect, useRef} from "react";

import { useSelector, useDispatch } from 'react-redux'
import {setKeyboardNavigationOn, setActiveStyleId, deleteStyleFromStylesInActiveNode, createNewStyle, renameMainStyle, setActiveStyleOptionIndex} from "../../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'
import SubStyleSticker from "./SubStyleSticker";

export default function StylePanelHeader () {
    
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)

    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    // const stylesInActiveNode = useSelector((state) => state.designerProjectState.activeNodeObject?.class || [])

    const dispatch = useDispatch()

    const inputRef = useRef();
    const styleOptionInputRef = useRef();
    const renameInputRef = useRef();

    const [isStyleEditorOpen, setIsStyleEditorOpen] = useState(false);
    const [isAddStyleInputOpen, setIsAddStyleInputOpen] = useState(false);
    const [isAddStyleOptionInputOpen, setIsAddStyleOptionInputOpen] = useState(false);

    
    const [listOfStyles, setListOfStyles] = useState(preRenderedStyles);
    const [indexOfActiveStyleInList, setIndexOfActiveStyleInList] = useState(0);

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
        if(isAddStyleInputOpen || isAddStyleOptionInputOpen) {
            if(isAddStyleInputOpen) {
                inputRef.current.focus();
                inputRef.current.value = "";
            }
            if(isAddStyleOptionInputOpen) {
                styleOptionInputRef.current.focus();
                styleOptionInputRef.current.value = "";
            }
            dispatch(setKeyboardNavigationOn(false));
        } else {
            dispatch(setKeyboardNavigationOn(true));
        }
    },[isAddStyleInputOpen, isAddStyleOptionInputOpen]);

    function handleOpenNewStyleInput () {
        if(stylesInActiveNode.length === 0) {
            setIsAddStyleInputOpen(true);
            setListOfStyles(preRenderedStyles);
            setIndexOfActiveStyleInList(0);
        } else {
            setIsAddStyleOptionInputOpen(true)
        }
    }

    function handleCloseNewStyleInput () {
        setIsAddStyleInputOpen(false);
    }

    function handleItemClick (name) {
        dispatch(createNewStyle(name));
        setIsAddStyleInputOpen(false);
    }

    function handleOptionInputKeyPress(e) {
        if(e.key === 'Enter') {
            dispatch(createNewStyle(e.target.value));
            setIsAddStyleOptionInputOpen(false);
        }
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            if(indexOfActiveStyleInList === 0) {
                dispatch(createNewStyle(e.target.value));
            } else {
                dispatch(createNewStyle(listOfStyles[indexOfActiveStyleInList-1].name));
            }
            setIsAddStyleInputOpen(false);
        } else if (e.key === 'ArrowDown') {
            if(indexOfActiveStyleInList < listOfStyles.length) {
                setIndexOfActiveStyleInList(indexOfActiveStyleInList + 1);
            }
        } else if (e.key === 'ArrowUp') {
            if(indexOfActiveStyleInList > 0) {
                setIndexOfActiveStyleInList(indexOfActiveStyleInList - 1);
            }
        } else {
            let updatedListOfStyles = [];
            preRenderedStyles.forEach((style) => {
                if(style.name.includes(e.target.value)) {
                    updatedListOfStyles.push(style);
                }
            })
            setListOfStyles(updatedListOfStyles);
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
            <div className={"unit-chooser_closer" + ((isStyleEditorOpen) ? " active" : "")}
                onClick={() => setIsStyleEditorOpen(false)}>
            </div>

            <div className={"unit-chooser_closer" + ((isAddStyleInputOpen) ? " active" : "")}
                onClick={() => setIsAddStyleInputOpen(false)}>
            </div>

            <div className={"unit-chooser_closer" + ((isAddStyleOptionInputOpen) ? " active" : "")}
                onClick={() => setIsAddStyleOptionInputOpen(false)}>
            </div>

            

            <div className="style-panel-title-box">
                <div className="text">{stylesInActiveNode?.[0]?.name} styles</div>
            </div>
            <div className="selector-box">
                <div 
                className={"selector-text" + ((activeStyleId === "" && activeNodeId !== "") ? " active" : "")}
                onClick={() => dispatch(setActiveStyleId(""))}
                >Selector</div>

                <div className="inheriting-box">
                    <div className="text">Inheriting</div>
                    <div className="text inheriting-text">1 selector</div>
                </div>
            </div>
            <div className="select-class-input">

                <div className="new-class-toggle" onClick={handleOpenNewStyleInput}></div>

                    <div className={"add-class-box" + ((isAddStyleInputOpen) ? " active" : "")}>
                        New class
                        <input 
                        ref={inputRef}
                        type="text"
                        className={"add-class_input" + ((indexOfActiveStyleInList === 0) ? " active" : "")}
                        onKeyUp={handleKeyPress} />
                        <div className="add-class_items-list">
                        {listOfStyles.map((style, index) => (
                            <div className={"add-class_item" + ((indexOfActiveStyleInList === index + 1) ? " active" : "")} 
                            onClick={() => handleItemClick(style.name)} 
                            key={style.id}>{style.name}</div>
                        ))}
                        </div>
                    </div>

                    <div className={"add-class-box option-box" + ((isAddStyleOptionInputOpen) ? " active" : "")}>
                        New option
                        <input onKeyDown={handleOptionInputKeyPress} ref={styleOptionInputRef} className="add-class_input" />
                    </div>

                    {/* <input 
                    ref={inputRef}
                    type="text"
                    onKeyDown={handleKeyPress}
                    onBlur={handleCloseNewStyleInput}
                    className={"space-editor-popup new-class" + (isAddStyleInputOpen ? " active" : "")} /> */}

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
                            <SubStyleSticker 
                            id={childId} 
                            name={childName} 
                            index={index} 
                            styleIsSet={styleIsSet} 
                            key={childId}
                            child={child}
                            isOnlyForMobile={child.isOnlyForMobile}
                            isOnlyForTablet={child.isOnlyForTablet}  />
                        )
                        })}

            </div>
            <div className="style-panel-on-page-box">
                <div className="text on-page">1 on this page</div>
            </div>
            </div>
    )
}