import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditImg from '../../../../img/edit-white.svg'
import { setKeyboardNavigationOn } from '../../../../features/project'
import ConfirmDeleteModalButton from '../../modals/ConfirmDeleteModalButton'
import SubStyleEditForm from './SubStyleEditForm'

export default function SubStyleEdit({
  index,
  element,
  editFx,
  deleteFx,
  active,
  isDeleteButtonVisible,
  text,
  itemType,
  folderItem,
  subOptionIndex,
}) {
  const dispatch = useDispatch()

  const [isEditorOpened, setIsEditorOpened] = useState(false)
  const blockNameRef = useRef()

  function handleEditIconClick() {
    setIsEditorOpened(true)
    blockNameRef.current.focus()
    blockNameRef.current.value = element.name
  }

  useEffect(() => {
    dispatch(setKeyboardNavigationOn(!isEditorOpened))

    if (isEditorOpened) {
      console.log('1')
    }
  }, [isEditorOpened])

  return (
    <div>
      <img
        className={
          'block-item_edit relative-item ' +
          (active ? ' active' : '') +
          (folderItem ? ' folder-item' : '')
        }
        src={EditImg}
        onClick={() => handleEditIconClick(element)}
      />

      <div
        className={
          'confirm-popup_close-bg block-toolox-bg' +
          (isEditorOpened ? ' active' : '')
        }
        onClick={() => setIsEditorOpened(false)}
      ></div>

      <SubStyleEditForm
        index={index}
        subOptionIndex={subOptionIndex}
        element={element}
        editFx={editFx}
        deleteFx={deleteFx}
        isDeleteButtonVisible={isDeleteButtonVisible}
        text={text}
        itemType={itemType}
        isEditorOpened={isEditorOpened}
        setIsEditorOpened={setIsEditorOpened}
        blockNameRef={blockNameRef}
      />
    </div>
  )
}
