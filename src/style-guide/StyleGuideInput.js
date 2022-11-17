import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editDefinedStyleProperty,
  setKeyboardNavigationOn,
} from '../features/project'

export default function StyleGuideInput({
  classId,
  optionId,
  optionVersionId,
  stylePropertyName,
}) {
  const styleClass = useSelector((state) => {
    let styles = {}
    if (optionId === '') {
      styles =
        state.project.preRenderedStyles.find(({ id }) => id === classId)
          .styles || {}
    } else {
      styles =
        state.project.preRenderedStyles
          .find(({ id }) => id === classId)
          ?.childrens.find(({ id }) => id === optionId)
          .options?.find(({ id }) => id === optionVersionId).styles || {}
    }
    for (const [key, value] of Object.entries(styles)) {
      if (key === stylePropertyName) {
        return value
      }
    }
  })

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function dispatchEditStyle() {
    dispatch(setKeyboardNavigationOn(true))
    dispatch(
      editDefinedStyleProperty({
        styleId: classId,
        optionId,
        optionVersionId,
        styleProperty: stylePropertyName,
        styleValue: inputRef.current.value,
        styleResolution: 'styles',
      })
    )
    setIsOpen(false)
  }

  function handleBlur() {
    dispatchEditStyle()
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      dispatchEditStyle()
    }
  }

  const inputRef = useRef()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus()
      inputRef.current.value = styleClass
    }
  }, [isOpen])

  const dispatch = useDispatch()

  return (
    <div className="size-style-box">
      <div onClick={() => setIsOpen(true)} className="">
        <div className="text">
          {stylePropertyName}: {styleClass}
        </div>
      </div>
      <input
        onKeyDown={handleKeyPress}
        className={'style-box-input' + (isOpen === true ? ' active' : '')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
      />
    </div>
  )
}
