import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editCollectionItemSlug,
  setKeyboardNavigationOn,
} from '../../../../features/project'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'

export default function FieldSlugInput() {
  const fieldValue = useSelector(
    (state) => activeCollectionItemSelector(state)?.slug
  )
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isFocused, setIsFocused] = useState(false)

  function inputBlurHandler() {
    setIsFocused(false)
    dispatch(setKeyboardNavigationOn(true))
    dispatch(editCollectionItemSlug(inputRef.current.value))
  }

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus()
      inputRef.current.value = fieldValue
    }
  }, [isFocused])

  return (
    <div className="cms-field-input-wrap">
      <div className="cms-field-input-label">Slug</div>
      <div className="cms-field-input">
        <div
          className={
            'cms-field-input-click-area' + (isFocused ? '' : ' focused')
          }
          onClick={() => setIsFocused(true)}
        >
          {fieldValue}
        </div>
        <input
          ref={inputRef}
          onFocus={() => dispatch(setKeyboardNavigationOn(true))}
          onBlur={inputBlurHandler}
          className={'cms-field-input-value' + (isFocused ? ' focused' : '')}
        />
      </div>
    </div>
  )
}
