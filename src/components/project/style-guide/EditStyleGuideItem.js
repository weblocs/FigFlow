import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteStyleGuideFolder,
  deleteStyleGuideItem,
  editStyleGuideFolder,
  editStyleGuideItem,
  setKeyboardNavigationOn,
} from '../../../features/project'
import MoveStyleGuideButtons from './MoveStyleGuideButtons'
import StyleGuideDeleteButton from './StyleGuideDeleteButton'

export default function EditStyleGuideItem({ folderId, id, name }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const inputRef = useRef()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      inputRef.current.value = name
    }
  }, [isOpen])

  function isFolder() {
    return folderId === undefined
  }

  function handleClick() {
    setIsOpen(!isOpen)
  }

  function handleClickCancel() {
    setIsOpen(false)
  }

  function handleSubmit() {
    event.preventDefault()
    setIsOpen(false)
    if (isFolder()) {
      dispatch(editStyleGuideFolder({ id, name: event.target.name.value }))
    } else {
      dispatch(
        editStyleGuideItem({ folderId, id, name: event.target.name.value })
      )
    }
  }

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  function handleDelete() {
    setIsOpen(false)
    if (isFolder()) {
      dispatch(deleteStyleGuideFolder({ id }))
    } else {
      dispatch(deleteStyleGuideItem({ folderId, id }))
    }
  }

  return (
    <div className="style-guide-edit_wrap">
      <div onClick={handleClick} className="style-guide-edit-button">
        Edit
      </div>
      {isOpen && (
        <form className="style-guide-edit_modal" onSubmit={handleSubmit}>
          <MoveStyleGuideButtons id={id} folderId={folderId} />
          <div className="text">Edit {isFolder() ? 'Folder' : 'Item'} </div>
          <input
            name="name"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            className="edit-node-input"
          />
          <div className="projectTabTitleButtonsBox">
            <StyleGuideDeleteButton
              onClick={handleDelete}
              text={'"' + name + '" ' + (isFolder() ? 'folder' : 'item')}
            />
            <div
              className="settings-button white-button"
              onClick={handleClickCancel}
            >
              Cancel
            </div>
            <button className="settings-button blue-button">Save</button>
          </div>
        </form>
      )}
    </div>
  )
}
