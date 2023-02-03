import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlusIcon from '../../../../img/plus.svg'

export default function PagesHeader({ openPage, openFolder }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  function handlePageClick() {
    openPage()
    setIsOpen(false)
  }

  function handleFolderClick() {
    openFolder()
    setIsOpen(false)
  }

  return (
    <div className="projectTabTitleBox" style={{ zIndex: '3' }}>
      Pages
      <div className="projectTabTitleButtonsBox no-gap">
        <button
          className="settings-list-add-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className="settings-list-add-icon" src={PlusIcon} />
        </button>

        {isOpen && (
          <div className="new-page-options">
            <div className="new-page-options_item" onClick={handlePageClick}>
              New page
            </div>
            <div className="new-page-options_item" onClick={handleFolderClick}>
              New folder
            </div>
          </div>
        )}

        {/* <button
          onClick={() => setCreatePageInputVisible(!createPageInputVisible)}
        >
          P
        </button>
        <button
          onClick={() => setCreateFolderInputVisible(!createFolderInputVisible)}
        >
          F
        </button> */}
      </div>
    </div>
  )
}
