import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setKeyboardNavigationOn,
  deleteStyleOption,
  removeStyleOption,
  editStyleOption,
} from '../../../../features/project'
import AddOption from './AddOption'
import AssignInlineStyles from './AssignInlineStyles'
import DeleteOption from './DeleteOption'
import EditOptions from './EditOptions'
import RemoveOption from './RemoveOption'
import ResponsiveStyleSettings from './ResponsiveStyleSettings'
import StyleOptionsList from './StyleOptionsList'

export default function DefaultNameForm({ index }) {
  const dispatch = useDispatch()

  const defaultNameRef = useRef()

  function handleDefaultNameSubmit(e) {
    e.preventDefault()
    if (defaultNameRef.current.value !== '') {
      dispatch(
        editStyleOption({
          property: 'defaultName',
          value: defaultNameRef.current.value,
          index: index,
        })
      )
      defaultNameRef.current.value = ''
    }
  }

  function handleOnFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleOnBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  return (
    <form onSubmit={handleDefaultNameSubmit}>
      <div className="select-input-wrap-label">Default name</div>
      <input
        ref={defaultNameRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholder="Default name"
      />
      <button>Save</button>
    </form>
  )
}
