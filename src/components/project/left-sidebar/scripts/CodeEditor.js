import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editCollectionItemName,
  editScript,
  setKeyboardNavigationOn,
} from '../../../../features/project'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'

export default function CodeEditor({ text, type }) {
  const fieldValue = useSelector(
    (state) =>
      state.project.scripts.find(
        (script) => script.id === state.project.activeScriptId
      )?.[type]
  )
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isFocused, setIsFocused] = useState(false)

  function inputBlurHandler() {
    setIsFocused(false)
    dispatch(setKeyboardNavigationOn(true))
    dispatch(
      editScript({ id: null, property: type, value: inputRef.current.value })
    )
  }

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus()
      inputRef.current.value = fieldValue
    }
  }, [isFocused])

  return (
    <div className="cms-field-input-wrap">
      <div className="cms-field-input-label">{text}</div>
      <div className="cms-field-input is-code">
        <div
          className={
            'cms-field-input-click-area' + (isFocused ? '' : ' focused')
          }
          onClick={() => setIsFocused(true)}
        >
          {fieldValue}
        </div>
        <textarea
          ref={inputRef}
          onFocus={() => dispatch(setKeyboardNavigationOn(true))}
          onBlur={inputBlurHandler}
          className={
            'cms-field-input-value is-code' + (isFocused ? ' focused' : '')
          }
        />
      </div>
    </div>
  )
}
