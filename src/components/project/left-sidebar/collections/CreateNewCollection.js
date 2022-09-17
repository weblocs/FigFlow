import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import {createNewCollection, setKeyboardNavigationOn} from "../../../../features/pre-rendered-html-nodes"

export default function CreateNewPageInProject () {
    const dispatch = useDispatch();
    const inputRef = useRef();

    async function handleAddNewCollection(e) {
        e.preventDefault();
        if(inputRef.current.value !== "") {
            dispatch(createNewCollection(inputRef.current.value));
        }
    };

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    return (
        <form onSubmit={handleAddNewCollection} className="new-page-form">
            <input 
            value={input} 
            onFocus={handleFocus} 
            onBlur={handleBlur}  
            ref={inputRef}
            placeholder="New collection" />
            <button className="">Add</button>
        </form>
    )
}