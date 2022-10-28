import React, {useState, useEffect, useRef} from "react";

import { useSelector, useDispatch } from 'react-redux'
import {setKeyboardNavigationOn, setActiveStyleId, removeActiveHtmlNodeStyle, addStyle, renameStyle, setActiveStyleOptionIndex} from "../../../features/project"
import useKeyboardShortcut from 'use-keyboard-shortcut'
import SubStyleSticker from "./SubStyleSticker";
import ModalBackgroundCloser from "../_atoms/ModalBackgroundCloser";
import StyleState from "./StyleState";

export default function StylePanelHeader () {

    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const activeStyleId = useSelector((state) => state.project.activeStyleId)
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)

    const stylesInActiveNode = useSelector((state) => state.project.stylesInActiveNode)
    // const stylesInActiveNode = useSelector((state) => state.project.activeNodeObject?.class || [])

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
        if(activeNodeId !== "") {
            if(stylesInActiveNode.length === 0) {
                setIsAddStyleInputOpen(true);
                setListOfStyles(preRenderedStyles);
                setIndexOfActiveStyleInList(0);
            } else {
                setIsAddStyleOptionInputOpen(true)
            }
        }
    }

    function handleCloseNewStyleInput () {
        setIsAddStyleInputOpen(false);
    }

    function handleItemClick (name) {
        dispatch(addStyle(name));
        setIsAddStyleInputOpen(false);
    }

    function handleOptionInputKeyPress(e) {
        if(e.key === 'Enter') {
            if(e.target.value !== "") {
                dispatch(addStyle(e.target.value));
                setIsAddStyleOptionInputOpen(false);
            }
        }
        if(e.key === 'Escape') {
            setIsAddStyleOptionInputOpen(false);
        }
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            if(indexOfActiveStyleInList === 0) {
                dispatch(addStyle(e.target.value));
            } else {
                dispatch(addStyle(listOfStyles[indexOfActiveStyleInList-1].name));
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
        dispatch(renameStyle({id: id, name: renameInputRef.current.value }));
        dispatch(setActiveHtmlNodeParentsPath());
        renameInputRef.current.value = "";
        setIsStyleEditorOpen(false);
    }

    function handleRemove(id) {
        dispatch(removeActiveHtmlNodeStyle(id));
        renameInputRef.current.value = "";
        setIsStyleEditorOpen(false);
    }

    return (
        <div className="style-panel-box sticky">

            <ModalBackgroundCloser 
            handleClick={() => setIsStyleEditorOpen(false)} 
            isActiveIf={isStyleEditorOpen} />

            <ModalBackgroundCloser 
            handleClick={() => setIsAddStyleInputOpen(false)} 
            isActiveIf={isAddStyleInputOpen} />

            <ModalBackgroundCloser 
            handleClick={() => setIsAddStyleOptionInputOpen(false)} 
            isActiveIf={isAddStyleOptionInputOpen} />


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

                    {preRenderedStyles.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens?.map((child,index) => {
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

            <StyleState />

            </div>
    )
}