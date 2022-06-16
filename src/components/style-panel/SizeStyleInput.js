import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {findStyleUnit, deleteUnits} from '../../utils/style-panel'
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function SpaceStyleInput (props) {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)
    const dispatch = useDispatch();
    const inputRef = useRef();

    const [isInputActive, setIsInputActive] = useState(false);
    const [unitEditorOpened, setUnitEditorOpened] = useState(false);


    const doesStylePropertyBelongToActiveClass = useSelector((state) => {
        const nodeStyles = state.designerProjectState.preRenderedStyles[activeStyleIndex];
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style] !== undefined) {
            return true;
        }
        return false;

    });

    const editedStyleUnit = useSelector((state) => {
        const nodeStyles = state.designerProjectState.preRenderedStyles[activeStyleIndex];
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style] !== undefined) {
            const nodeStyleValue = nodeStyles[activeProjectResolutionStylesListName][props.style];
            return findStyleUnit(nodeStyleValue);
        }
        if(props.placeholder !== undefined) {
            return "-";
        }
        if(activeNodeId !== "") {
            try {
                const activeNode = document.querySelector(`[el_id="${activeNodeId}"]`);
                const nodeStyleValue = getComputedStyle(activeNode)?.[props.style.replace("_","-")];
                return findStyleUnit(nodeStyleValue);
            } catch {
            }
        }
    });

    const editedStyleValue = useSelector((state) => {
        const nodeStyles = state.designerProjectState.preRenderedStyles[activeStyleIndex];
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style] !== undefined) {
            return deleteUnits(nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style]);
        } 
        if(props.placeholder !== undefined) {
            return props.placeholder;
        }
        if(activeNodeId !== "") {
            try {
                const activeNode = document.querySelector(`[el_id="${activeNodeId}"]`);
                return deleteUnits(getComputedStyle(activeNode)?.[props.style.replace("_","-")]);
            } catch {
            }
        }
    });

    function handleKeyPress(e) {
        console.log(e.key);
        if(e.key === 'Enter') {
            if(editedStyleUnit === "" || editedStyleUnit === "-") {
                dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+"px"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+editedStyleUnit]));
            }
            setIsInputActive(false);
        }
        if(e.key === 'ArrowUp') {
            inputRef.current.value = parseInt(editedStyleValue) + 1;
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)+editedStyleUnit]));
            
        }
        if(e.key === 'ArrowDown') {
            inputRef.current.value = parseInt(editedStyleValue) - 1;
            dispatch(editStyleInPreRenderedStyles([props.style,parseInt(e.target.value)+editedStyleUnit]));
        }
    }

    function handleUnitItemClick(unit) {
        dispatch(editStyleInPreRenderedStyles([props.style,editedStyleValue+unit]));
        setUnitEditorOpened(false);
    }

    useEffect(() => {
        if(isInputActive === true) {
            inputRef.current.focus();
            if(editedStyleValue === undefined) {
                inputRef.current.value = "";
            } else {
                inputRef.current.value = editedStyleValue;
            }
            dispatch(setArrowNavigationOn(false));
        } else {
            dispatch(setArrowNavigationOn(true));
        }
    },[isInputActive]);


    return (
        <div className="size-style-box">
            <div className={"style-title-box" + ((doesStylePropertyBelongToActiveClass) ? " active" : "")}>
                <div className="text">{props.text}</div>
            </div>
            <div className="style-edit-input">
                <div className="style-edit-value">
                    <span onClick={() => setIsInputActive(true)} 
                    className={"style-edit-text" + ((isInputActive) ? " active" : "")}>
                        {editedStyleValue}
                    </span>
                    <input 
                    className={"style-edit-input-text"  + ((!isInputActive) ? " active" : "")}
                    type="text"
                    ref={inputRef}
                    onBlur={() => setIsInputActive(false)}
                    onKeyDown={handleKeyPress}
                    />
                </div>
                <div className="style-edit-unit" onClick={() => setUnitEditorOpened(true)}>
                    {editedStyleUnit}
                </div>

                <div className={"style-edit-unit-list" + ((unitEditorOpened) ? " active" : "")}>
                    <div className={"style-edit-unit-item" + ((editedStyleUnit === "px") ? " active" : "")}
                    onClick={() => handleUnitItemClick("px")}>
                        px
                    </div>
                    <div className={"style-edit-unit-item" + ((editedStyleUnit === "%") ? " active" : "")}
                    onClick={() => handleUnitItemClick("%")}>
                        %
                    </div>
                    <div className={"style-edit-unit-item" + ((editedStyleUnit === "em") ? " active" : "")}
                    onClick={() => handleUnitItemClick("em")}>
                        em
                    </div>
                </div>
            </div>
        </div>
    )
}