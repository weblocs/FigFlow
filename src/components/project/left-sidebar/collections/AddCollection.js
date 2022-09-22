import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import {addCollection, setKeyboardNavigationOn} from "../../../../features/project"

export default function AddCollection () {
    const dispatch = useDispatch();
    const inputRef = useRef();

    async function handleAddNewCollection(e) {
        e.preventDefault();
        if(inputRef.current.value !== "") {
            dispatch(addCollection(inputRef.current.value));
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