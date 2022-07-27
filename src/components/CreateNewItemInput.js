import React, {useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { setKeyboardNavigationOn } from "../features/pre-rendered-html-nodes"

export default function CreateNewItemInput ({visibility, create, placeholder}) {
    const dispatch = useDispatch();

    const inputRef = useRef();

    function handleAddNewPage(e) {
        e.preventDefault();
        if(inputRef.current.value !== "") {
            dispatch(create(inputRef.current.value));
            inputRef.current.value = "";
        }       
    };

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    useEffect(() => {
        visibility && inputRef.current.focus();
    },[visibility]);

    if(visibility) {
        return (
            <form onSubmit={handleAddNewPage} className="new-page-form">
                <input
                className="new-page-input"
                ref={inputRef} 
                onFocus={handleFocus} 
                onBlur={handleBlur} 
                placeholder={placeholder} />
                <button className="">Add</button>
            </form>
        )
    }
    
}