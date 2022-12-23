import { useDispatch } from 'react-redux'
import {
  setActiveStyleId,
  setActiveStyleOptionIndex,
} from '../../../../features/project'

export default function StyleSticker({
  isOpen,
  handleOpen,
  id,
  name,
  index,
  styleIsSet,
  child,
}) {
  const dispatch = useDispatch()

  function handleOpenDropdown() {
    handleOpen(!isOpen)
  }

  function handleClickInSticker(id, index) {
    if (styleIsSet) {
      dispatch(setActiveStyleId(id))
      dispatch(setActiveStyleOptionIndex(index))
    } else {
      handleOpenDropdown()
    }
  }

  return (
    <>
      <div onClick={() => handleClickInSticker(id, index)} className="text">
        {child?.defaultName !== undefined
          ? styleIsSet
            ? child.defaultName + '-' + name
            : child.defaultName || name
          : name}
      </div>
      <span
        className="seleted-class-delete-button"
        onClick={handleOpenDropdown}
      >
        {' '}
        ⌄
      </span>
    </>
  )
}
