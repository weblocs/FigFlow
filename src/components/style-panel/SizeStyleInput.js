import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {findStyleUnit, deleteUnits} from '../../utils/style-panel'
import {editStyleInPreRenderedStyles, setKeyboardNavigationOn} from "../../features/pre-rendered-html-nodes"
import ProprtyInputLabel from "./ProprtyInputLabel";

export default function SpaceStyleInput (props) {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const activeStyleObject = useSelector((state) => state.designerProjectState.activeStyleObject);
    
    const dispatch = useDispatch();
    const inputRef = useRef();

    const [isInputActive, setIsInputActive] = useState(false);
    const [unitEditorOpened, setUnitEditorOpened] = useState(false);


    const editedStyleUnit = useSelector((state) => {
        if (activeStyleObject?.[props.style] !== undefined) {
            const nodeStyleValue = activeStyleObject[props.style];
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
        if (activeStyleObject?.[props.style] !== undefined) {
            return deleteUnits(activeStyleObject?.[props.style]);
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
        if(e.key === 'Enter') {
            if(editedStyleUnit === "" || editedStyleUnit === "-") {
                dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+"px"]));
            } else {
                dispatch(editStyleInPreRenderedStyles([props.style,e.target.value+editedStyleUnit]));
            }
            setIsInputActive(false);

            if(props.style === "border-width") {
                dispatch(editStyleInPreRenderedStyles(["border-style","solid"]));
            }
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
            dispatch(setKeyboardNavigationOn(false));
        } else {
            dispatch(setKeyboardNavigationOn(true));
        }
    },[isInputActive]);


    return (
        <div className="size-style-box">
            
            <ProprtyInputLabel text={props.text} property={props.style} />


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