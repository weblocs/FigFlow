import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  saveProjectToFirebase,
  setSaveButtonStateText,
} from '../../../features/project'

export default function SaveButton() {
  const saveButtonStateText = useSelector(
    (state) => state.project.saveButtonStateText
  )
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )
  const styleGuide = useSelector((state) => state.project.styleGuide)
  const dispatch = useDispatch()

  function handleOnClick() {
    dispatch(setSaveButtonStateText('Saving'))
    dispatch(saveProjectToFirebase())
    dispatch(setSaveButtonStateText('Saved'))
  }

  useEffect(() => {
    dispatch(setSaveButtonStateText('Save'))
    const tempNodes = preRenderedHTMLNodes
    const tempStyles = preRenderedStyles
    const tempStyleGuide = styleGuide
    const timer = setTimeout(() => {
      if (
        tempNodes === preRenderedHTMLNodes &&
        tempStyles === preRenderedStyles &&
        tempStyleGuide === styleGuide
      ) {
        handleOnClick()
      }
    }, 6000)
    return () => clearTimeout(timer)
  }, [preRenderedHTMLNodes, preRenderedStyles, styleGuide])

  useEffect(() => {
    dispatch(setSaveButtonStateText('Saved'))
  }, [])

  return (
    <button className="saveButton" onClick={handleOnClick}>
      {saveButtonStateText}
    </button>
  )
}
