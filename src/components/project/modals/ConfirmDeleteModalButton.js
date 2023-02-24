import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPageSettings } from '../../../features/project'
import Button from '../../ui/Button'

export default function ConfirmDeleteModalButton({
  handleOnClick,
  deleteItemName,
  deleteItemType,
  redButton,
  buttonText,
}) {
  const openedSettingsPage = useSelector(
    (state) => state.project.openedSettingsPage
  )
  const dispatch = useDispatch()

  const [confirmPopUpOpened, setConfirmPopUpOpened] = useState(false)

  if (deleteItemType === 'page') {
    deleteItemType =
      openedSettingsPage?.children?.length > 0 ? 'folder' : 'page'
  }

  function confirmClick() {
    handleOnClick()
    setConfirmPopUpOpened(false)
    dispatch(openPageSettings({}))
  }

  return (
    <div>
      <div className={'confirm-popup' + (confirmPopUpOpened ? ' active' : '')}>
        <div
          className="confirm-popup_close-bg"
          onClick={() => setConfirmPopUpOpened(false)}
        ></div>
        <div className="confirm-popup_box">
          <div className="confirmation-popup_message">
            Are you sure you want to delete the "{deleteItemName}"{' '}
            {deleteItemType}
          </div>

          <div className="projectTabTitleButtonsBox">
            <div
              className="settings-button"
              onClick={() => setConfirmPopUpOpened(false)}
            >
              Cancel
            </div>
            <div
              onClick={confirmClick}
              className="settings-button delete-button"
            >
              Delete
            </div>
          </div>
        </div>
      </div>

      <Button
        text={buttonText ? `Delete ${buttonText}` : 'Delete'}
        size="sm"
        type={redButton ? 'danger' : 'white'}
        onClick={() => setConfirmPopUpOpened(true)}
      />

      {/* {redButton ? (
        <div
          className="settings-button delete-button"
          onClick={() => setConfirmPopUpOpened(true)}
        >
          Delete {buttonText}
        </div>
      ) : (
        <div
          className="settings-close-button"
          onClick={() => setConfirmPopUpOpened(true)}
        >
          Delete {buttonText}
        </div>
      )} */}
    </div>
  )
}
