import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editStyleProperty,
  setKeyboardNavigationOn,
} from '../../../../features/project'
import ProprtyInputLabel from '../ProprtyInputLabel'

export default function NoUnitInput(props) {
  const hierarchyStyleProperty = useSelector(
    (state) =>
      state.project.objectHierarchyStyles?.findLast(
        ({ style }) => style === props.style
      )?.value || ''
  )

  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isInputActive, setIsInputActive] = useState(false)

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      setIsInputActive(false)
      dispatch(editStyleProperty([props.style, e.target.value]))
      console.log(e.target.value)
    }
    if (e.key === 'ArrowUp') {
      inputRef.current.value = inputRef.current.value + 0.1
      dispatch(editStyleProperty([props.style, e.target.value]))
    }
    if (e.key === 'ArrowDown') {
      inputRef.current.value = inputRef.current.value - 0.1
      dispatch(editStyleProperty([props.style, e.target.value]))
    }
  }

  useEffect(() => {
    if (isInputActive === true) {
      inputRef.current.focus()
      inputRef.current.value = hierarchyStyleProperty
    }
    dispatch(setKeyboardNavigationOn(!isInputActive))
  }, [isInputActive])

  return (
    <div className="size-style-box">
      <ProprtyInputLabel text={props.text} property={props.style} />
      <div className="style-edit-input">
        <div className="style-edit-value">
          <span
            onClick={() => setIsInputActive(true)}
            className={'style-edit-text' + (isInputActive ? ' active' : '')}
          >
            {hierarchyStyleProperty}
          </span>

          <input
            className={
              'style-edit-input-text' + (!isInputActive ? ' active' : '')
            }
            type="text"
            ref={inputRef}
            onBlur={() => setIsInputActive(false)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  )
}
