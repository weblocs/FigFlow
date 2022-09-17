import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStyleInPreRenderedStyles, setKeyboardNavigationOn } from "../../../../features/pre-rendered-html-nodes";
import ProprtyInputLabel from "../ProprtyInputLabel";

export default function NoUnitInput (props) {
    
    const editedStyleValue = useSelector((state) => state.designerProjectState.activeStyleObject?.[props.style]);
    const activeNodeComputedStyle = useSelector((state) => state.designerProjectState.activeNodeComputedStyles?.[props.style]);

    const dispatch = useDispatch();
    const inputRef = useRef();
    const [isInputActive, setIsInputActive] = useState(false);

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value]));
            setIsInputActive(false);
        }
        if(e.key === 'ArrowUp') {
            inputRef.current.value = editedStyleValue + 0.1;
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value]));
            
        }
        if(e.key === 'ArrowDown') {
            inputRef.current.value = editedStyleValue - 0.1;
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value]));
        }
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
                        {activeNodeComputedStyle}
                    </span>
                    <input 
                    className={"style-edit-input-text"  + ((!isInputActive) ? " active" : "")}
                    type="text"
                    ref={inputRef}
                    onBlur={() => setIsInputActive(false)}
                    onKeyDown={handleKeyPress}
                    />
                </div>
            </div>
        </div>
    )
}