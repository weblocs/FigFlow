import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKeyboardNavigationOn } from '../../../features/project'
import DragInput from '../_atoms/DragInput'

export default function StyleGuideInput({ styleValue, dispatchEditStyle }) {
  function handleFocus() {
    setIsOpen(true)
  }

  function handleBlur() {
    setIsOpen(false)
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      dispatchEditStyle(inputRef.current.value)
      setIsOpen(false)
    }
    if (e.key === 'ArrowUp') {
      inputRef.current.value = parseInt(styleValue?.value) + 1
      dispatchEditStyle(inputRef.current.value)
    }
    if (e.key === 'ArrowDown') {
      inputRef.current.value = parseInt(styleValue?.value) - 1
      dispatchEditStyle(inputRef.current.value)
    }
  }

  const inputRef = useRef()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      dispatch(setKeyboardNavigationOn(false))
      if (styleValue?.value !== undefined) {
        inputRef.current.focus()
        inputRef.current.value = styleValue?.value
      }
    } else {
      dispatch(setKeyboardNavigationOn(true))
    }
  }, [isOpen])

  const dispatch = useDispatch()

  return (
    <div className="style-guide-input-wrap">
      <div
        onClick={() => setIsOpen(true)}
        className="style-guide-property-value-wrap"
      >
        <span className="style-guide-property-space"></span>
        <span
          className={
            'style-guide-property-value-text' + (isOpen ? ' hidden' : '')
          }
        >
          {styleValue?.value}
        </span>

        <DragInput
          defaultValue={styleValue?.value}
          handleChange={(event) => dispatchEditStyle(event)}
        />
        <input
          onKeyDown={handleKeyPress}
          className={
            'style-guide-property-value-input' +
            (isOpen === true ? ' active' : '')
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </div>
      <div className="style-guide-unit">{styleValue?.unit}</div>
    </div>
  )
}
