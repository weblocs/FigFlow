import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'

export default function EagerCheckbox() {
  const isImgEager = useSelector(
    (state) => state.project.activeNodeObject?.isImgEager === 'true' || false
  )
  const dispatch = useDispatch()

  const inputRef = useRef()

  function onChange() {
    dispatch(
      editHtmlNode({ field: 'isImgEager', value: inputRef.current.checked })
    )
  }

  return (
    <label>
      <input
        checked={isImgEager}
        onChange={onChange}
        ref={inputRef}
        type="checkbox"
      />
      <span>Eager loading</span>
      <div>(set if image is visible in first viewport)</div>
    </label>
  )
}
