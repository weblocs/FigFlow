import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditImg from '../../../../img/edit-white.svg'
import { setKeyboardNavigationOn } from '../../../../features/project'
import ConfirmDeleteModalButton from '../../modals/ConfirmDeleteModalButton'

export default function SubStyleEditForm({
  index,
  element,
  editFx,
  deleteFx,
  isDeleteButtonVisible,
  text,
  itemType,
  isEditorOpened,
  setIsEditorOpened,
  blockNameRef,
}) {
  const dispatch = useDispatch()

  function handleSubmit(id) {
    event.preventDefault()
    dispatch(
      editFx({
        optionIndex: index,
        subOptionId: id,
        name: blockNameRef.current.value,
      })
    )
    setIsEditorOpened(false)
  }

  function handleDelete(id) {
    dispatch(deleteFx({ optionIndex: index, subOptionId: id }))
    setIsEditorOpened(false)
  }

  useEffect(() => {
    dispatch(setKeyboardNavigationOn(!isEditorOpened))
  }, [isEditorOpened])

  return (
    <form
      draggable="true"
      style={{ right: '0px', left: 'auto', color: '#333' }}
      onSubmit={() => handleSubmit(element.id)}
      className={'edit-block_toolbox' + (isEditorOpened ? ' active' : '')}
    >
      <div className="edit-block_toolbox-text">{text}</div>
      <input className="edit-node-input" ref={blockNameRef} />
      <div className="projectTabTitleButtonsBox">
        {isDeleteButtonVisible && (
          <ConfirmDeleteModalButton
            handleOnClick={() => handleDelete(element.id)}
            deleteItemName={element.name}
            deleteItemType={itemType}
            redButton={true}
          />
        )}
        <div
          className="settings-button white-button"
          onClick={() => setIsEditorOpened(false)}
        >
          Cancel
        </div>
        <button className="settings-button blue-button">Save</button>
      </div>
    </form>
  )
}
