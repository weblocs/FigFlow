import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditImg from '../../../../img/edit-white.svg'
import {
  moveStyleSubOption,
  setKeyboardNavigationOn,
} from '../../../../features/project'
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
  subOptionIndex,
}) {
  const dispatch = useDispatch()

  const listLength = useSelector(
    (state) =>
      state.project.preRenderedStyles.find(
        ({ id }) => id === state.project.stylesInActiveNode?.[0].id
      )?.childrens[index].options.length
  )

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

  function handleMoveUp() {
    dispatch(
      moveStyleSubOption({
        direction: 'up',
        optionIndex: index,
        subOptionId: element.id,
      })
    )
  }

  function handleMoveDown() {
    dispatch(
      moveStyleSubOption({
        direction: 'down',
        optionIndex: index,
        subOptionId: element.id,
      })
    )
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
      <div className="flex gap-8">
        {subOptionIndex > 0 && (
          <Button text="Move Up" size="sm" onClick={handleMoveUp} />
        )}
        {subOptionIndex < listLength - 1 && (
          <Button text="Move Down" size="sm" onClick={handleMoveDown} />
        )}
      </div>
      <Label text={text} />
      <Input useRef={blockNameRef} />

      <div className="flex gap-4">
        <Button type="action" text="Save" size="sm" submit={true} />
        <Button text="Cancel" size="sm" onClick={handleCancel} />

        {isDeleteButtonVisible && (
          <ConfirmDeleteModalButton
            handleOnClick={() => handleDelete(element.id)}
            deleteItemName={element.name}
            deleteItemType={itemType}
            redButton={true}
          />
        )}
      </div>
    </form>
  )
}
