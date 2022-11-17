import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addStyleGuideFolder,
  setKeyboardNavigationOn,
} from '../features/project'

export default function AddStyleGuideFolder() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef()

  function handleSubmit() {
    event.preventDefault()
    dispatch(addStyleGuideFolder({ name: inputRef.current.value }))
    inputRef.current.focus()
    setIsOpen(false)
  }

  function handleClick() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus()
    }
  }, [isOpen])

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  return (
    <div className="style-guide-add-folder_wrap">
      <div className="style-guide-add-folder_button" onClick={handleClick}>
        <div className="text">Add Folder</div>
      </div>

      {isOpen && (
        <form className="style-guide-add-folder_form" onSubmit={handleSubmit}>
          <input
            className="settings-input"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
          />
          <button className="settings-button blue-button" type="submit">
            Add Folder
          </button>
        </form>
      )}
    </div>
  )
}
