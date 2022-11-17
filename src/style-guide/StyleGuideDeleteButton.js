import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function StyleGuideDeleteButton({ text, onClick }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(!isOpen)
  }

  function handleClickCancel() {
    setIsOpen(false)
  }

  return (
    <div>
      {isOpen && (
        <div className="confirm-popup active">
          <div
            className="confirm-popup_close-bg"
            onClick={handleClickCancel}
          ></div>
          <div className="confirm-popup_box">
            <div className="confirmation-popup_message">
              Are you sure you want to delete the {text}
            </div>
            <div className="projectTabTitleButtonsBox">
              <div onClick={handleClickCancel} className="settings-button">
                Cancel
              </div>
              <div className="settings-button delete-button" onClick={onClick}>
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
      <div onClick={handleClick} className="settings-button delete-button">
        Delete
      </div>
    </div>
  )
}
