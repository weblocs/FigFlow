import { useEffect } from 'react'
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
  const projectPageFolderStructure = useSelector(
    (state) => state.project.projectPageFolderStructure
  )
  const collections = useSelector((state) => state.project.collections)
  const scripts = useSelector((state) => state.project.scripts)
  const fonts = useSelector((state) => state.project.fonts)
  const firebaseError = useSelector((state) => state.project.firebaseError)
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
    const tempScripts = scripts
    const tempFonts = fonts

    const timer = setTimeout(() => {
      if (
        tempNodes === preRenderedHTMLNodes &&
        tempStyles === preRenderedStyles &&
        tempStyleGuide === styleGuide &&
        tempProjectPageFolderStructure === projectPageFolderStructure &&
        tempCollections === collections &&
        tempScripts === scripts &&
        tempFonts === fonts
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
    scripts,
    fonts,
  ])

  useEffect(() => {
    dispatch(setSaveButtonStateText('Saved'))
  }, [])

  return (
    <>
      {/* <button
        className="saveButton"
        onClick={() => dispatch(offineProjectSave())}
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
