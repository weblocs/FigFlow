import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'

export default function TextTransformButton({ letter, value }) {
  const activeStyleValue = useSelector(
    (state) =>
      state.project.activeStyleObject?.text_transform ||
      state.project.activeNodeComputedStyles?.text_transform
  )
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(editStyleProperty(['text-transform', value]))
  }

  return (
    <div
      className={
        'display-button ' + (activeStyleValue === value ? 'active' : '')
      }
      onClick={handleClick}
    >
      <div className="text">{letter}</div>
    </div>
  )
}
