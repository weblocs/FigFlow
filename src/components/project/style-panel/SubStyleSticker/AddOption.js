import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setKeyboardNavigationOn,
  addStyleOption,
  setActiveStyleOptionIndex,
} from '../../../../features/project'

export default function AddOption({ index }) {
  const stylesInActiveNode = useSelector(
    (state) => state.project.stylesInActiveNode
  )

  const dispatch = useDispatch()

  const [input, setInput] = useState('')

  async function handleAddNewStyleOption(e) {
    e.preventDefault()
    if (input !== '') {
      dispatch(
        addStyleOption({
          name: input.replaceAll(' ', '-').toLowerCase(),
          childrenIndex: index,
        })
      )
      dispatch(setActiveStyleOptionIndex(stylesInActiveNode.length))
      setInput('')
    }
  }

  function handleOnFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleOnBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  return (
    <form onSubmit={handleAddNewStyleOption}>
      <input
        value={input}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New option"
      />
      <button>Add option</button>
    </form>
  )
}
