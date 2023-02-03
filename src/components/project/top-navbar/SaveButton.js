import { initializeApp } from 'firebase/app'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  saveProjectToFirebase,
  saveProjectToFirebaseOffline,
  setSaveButtonStateText,
  setUpdateNodesLists,
} from '../../../features/project'
import { firebaseConfig } from '../../../utils/firebase-config'
import { firebaseSaveProject } from '../../../utils/nodes-editing'

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
  const projectPageFolderStructure = useSelector(
    (state) => state.project.projectPageFolderStructure
  )
  const collections = useSelector((state) => state.project.collections)
  const firebaseError = useSelector((state) => state.project.firebaseError)
  const state = useSelector((state) => state.project)
  const dispatch = useDispatch()

  function handleOnClick() {
    dispatch(setSaveButtonStateText('Saving'))

    dispatch(saveProjectToFirebase())

    // dispatch(setSaveButtonStateText('Saved'))

    // dispatch(setUpdateNodesLists())
    // saveProjectToFirebasePreRenderedNodesAndStyles()
  }

  useEffect(() => {
    dispatch(setSaveButtonStateText('Save'))
    const tempNodes = preRenderedHTMLNodes
    const tempStyles = preRenderedStyles
    const tempStyleGuide = styleGuide
    const tempProjectPageFolderStructure = projectPageFolderStructure
    const tempCollections = collections

    const timer = setTimeout(() => {
      if (
        tempNodes === preRenderedHTMLNodes &&
        tempStyles === preRenderedStyles &&
        tempStyleGuide === styleGuide &&
        tempProjectPageFolderStructure === projectPageFolderStructure &&
        tempCollections === collections
      ) {
        handleOnClick()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [
    preRenderedHTMLNodes,
    preRenderedStyles,
    styleGuide,
    projectPageFolderStructure,
    collections,
  ])

  useEffect(() => {
    dispatch(setSaveButtonStateText('Saved'))
  }, [])

  return (
    <>
      {/* <button
        className="saveButton"
        onClick={() => dispatch(saveProjectToFirebaseOffline())}
      >
        Save Offline
      </button> */}
      <button
        className={'saveButton save ' + (firebaseError ? ' error-button' : '')}
        onClick={handleOnClick}
      >
        {firebaseError ? 'Error: Not saved' : saveButtonStateText}
      </button>
    </>
  )
}
