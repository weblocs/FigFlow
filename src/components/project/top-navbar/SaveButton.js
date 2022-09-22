import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {saveProjectToFirebase, setSaveButtonStateText} from "../../../features/project"


export default function SaveButton() {
    const saveButtonStateText = useSelector((state) => state.project.saveButtonStateText)
    const dispatch = useDispatch()    
    
    function handleOnClick() {
      dispatch(setSaveButtonStateText("Publishing"));

      dispatch(saveProjectToFirebase());

      dispatch(setSaveButtonStateText("Published"));
      setTimeout(function () {
        dispatch(setSaveButtonStateText("Publish"));
    }, 2000);
    }

    return (
    <button className="saveButton" onClick={handleOnClick}>
        {saveButtonStateText}
    </button>
    )
}