import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditImg from '../../../../img/edit-white.svg'
import { setKeyboardNavigationOn } from '../../../../features/project'
import ConfirmDeleteModalButton from '../../modals/ConfirmDeleteModalButton'
import Button from '../../../ui/Button'
import Input from '../../../ui/Input'
import Label from '../../../ui/Label'

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

  function handleCancel() {
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
      style={{ left: '0px', color: '#333' }}
      onSubmit={() => handleSubmit(element.id)}
      className={'edit-block_toolbox' + (isEditorOpened ? ' active' : '')}
    >
      <Label text={text} />
      <Input useRef={blockNameRef} />
      <div className="flex gap-4">
        {isDeleteButtonVisible && (
          <ConfirmDeleteModalButton
            handleOnClick={() => handleDelete(element.id)}
            deleteItemName={element.name}
            deleteItemType={itemType}
            redButton={true}
          />
        )}
        <Button text="Cancel" size="sm" onClick={handleCancel} />
        <Button type="action" text="Save" size="sm" submit={true} />
      </div>
    </form>
  )
}
