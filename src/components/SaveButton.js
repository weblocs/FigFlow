import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {saveProjectToFirebase, setSaveButtonStateText} from "../features/pre-rendered-html-nodes"


export default function SaveButton() {
    const saveButtonStateText = useSelector((state) => state.designerProjectState.saveButtonStateText)
    const dispatch = useDispatch()
    
    
    function handleOnClick() {
      dispatch(setSaveButtonStateText("Saving"));

      dispatch(saveProjectToFirebase());

      dispatch(setSaveButtonStateText("Saved"));
      setTimeout(function () {
        dispatch(setSaveButtonStateText("Save"));
    }, 2000);
    }

    return (
    <button className="saveButton" onClick={handleOnClick}>
        {saveButtonStateText}
    </button>
    )
}