import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function RestoreButton() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  function handleOnClick() {}

  return (
    <div className="is-relative">
      <button
        className="saveButton light"
        //   onClick={() => setIsOpen(!isOpen)}
      >
        Backup Preview
      </button>
      {/* {isOpen && (
        <div className="export-modal is-restore-modal">
          Are you sure you want to restore this project?
          <div className="export-modal_link" onClick={handleOnClick}>
            Yes, Restore
          </div>
        </div>
      )} */}
    </div>
  )
}
