import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../../../../features/project'

export default function AddCollection() {
  const dispatch = useDispatch()
  const inputRef = useRef()

  async function handleAddNewCollection(e) {
    e.preventDefault()
    if (inputRef.current.value !== '') {
      dispatch(addCollection(inputRef.current.value))
    }
  }

  return (
    <form onSubmit={handleAddNewCollection} className="new-page-form">
      <input value={input} ref={inputRef} placeholder="New collection" />
      <button className="">Add</button>
    </form>
  )
}
