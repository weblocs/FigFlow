import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty, setKeyboardNavigationOn } from '../../../features/project';

export default function OpacityInput(props) {

    const styleValue = useSelector((state) => state.project.activeNodeComputedStyles?.[props.style])
    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef();

    const dispatch = useDispatch()

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            dispatch(editStyleProperty([props.style,e.target.value]));
            setIsInputActive(false);
        }
        if(e.key === 'ArrowUp') {
            inputRef.current.value = styleValue + 0.1;
            dispatch(editStyleProperty([props.style,e.target.value]));
            
        }
        if(e.key === 'ArrowDown') {
            inputRef.current.value = styleValue - 0.1;
            dispatch(editStyleProperty([props.style,e.target.value]));
        }
    }

    useEffect(() => {
        if(isInputActive === true) {
            inputRef.current.focus();
            if(styleValue === undefined) {
                inputRef.current.value = "";
            } else {
                inputRef.current.value = styleValue;
            }
            dispatch(setKeyboardNavigationOn(false));
        }
        dispatch(setKeyboardNavigationOn(!isInputActive));    
    },[isInputActive]);

    return (
        <div className="style-edit-value">
            <span 
                onClick={() => setIsInputActive(true)} 
                className={"style-edit-text" + ((isInputActive) ? " active" : "")}>
                {styleValue}
            </span>

            <input 
            className={"style-edit-input-text"  + ((!isInputActive) ? " active" : "")}
            type="text"
            ref={inputRef}
            onBlur={() => setIsInputActive(false)}
            onKeyDown={handleKeyPress}
            />
        </div>
    )
}