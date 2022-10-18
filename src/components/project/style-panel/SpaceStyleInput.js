import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {findStyleUnit, deleteUnits} from '../../../utils/style-panel'
import {deleteStyleProperty, editStyleProperty, setKeyboardNavigationOn} from "../../../features/project"
import ModalBackgroundCloser from "../_atoms/ModalBackgroundCloser";

function SpaceStyleInput (props) {

    const doesStylePropertyBelongToActiveClass = useSelector((state) => (state.project.activeStyleObject?.[props.style] !== undefined));
    const editedStyleValue = useSelector((state) => deleteUnits(state.project.activeStyleObject?.[props.style.replace("-","_")]) || props?.placeholder || deleteUnits(state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]));
    const editedStyleUnit = useSelector((state) => findStyleUnit(state.project.activeStyleObject?.[props.style.replace("-","_")]) || props?.placeholder && "-" || findStyleUnit(state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]) );

    const dispatch = useDispatch();
    const inputRef = useRef();

    const [isInputActive, setIsInputActive] = useState(false);
    const [unitEditorOpened, setUnitEditorOpened] = useState(false);

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            if(editedStyleUnit === "" || editedStyleUnit === "-") {
                dispatch(editStyleProperty([props.style,e.target.value+"px"]));
            } else {
                dispatch(editStyleProperty([props.style,e.target.value+editedStyleUnit]));
            }
            setIsInputActive(false);
        }
        if(e.key === 'ArrowUp') {
            inputRef.current.value = parseInt(editedStyleValue) + 1;
            dispatch(editStyleProperty([props.style,parseInt(e.target.value)+editedStyleUnit]));
            
        }
        if(e.key === 'ArrowDown') {
            inputRef.current.value = parseInt(editedStyleValue) - 1;
            dispatch(editStyleProperty([props.style,parseInt(e.target.value)+editedStyleUnit]));
        }
    }

    function handleUnitItemClick(unit) {
        dispatch(editStyleProperty([props.style,editedStyleValue+unit]));
        setUnitEditorOpened(false);
    }

    function handleSetAuto() {
        dispatch(editStyleProperty([props.style,"auto"]));
        setUnitEditorOpened(false);
    }

    function handleReset() {
        dispatch(deleteStyleProperty(props.style));
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
            <div className={"style-edit-input simple" + ((doesStylePropertyBelongToActiveClass) ? " active" : "")}>

                
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

                <ModalBackgroundCloser 
                handleClick={() => setUnitEditorOpened(false)} 
                isActiveIf={unitEditorOpened} />
                
                <div 
                className={"style-edit-unit-list" + ((unitEditorOpened) ? " active" : "")}>
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
                    <div className={"style-edit-unit-item"}
                    onClick={handleSetAuto}>
                        auto
                    </div>
                    <div className={"style-edit-unit-item"}
                    onClick={handleReset}>
                        reset
                    </div>
                </div>
            </div>
    )
}

export default React.memo(SpaceStyleInput)