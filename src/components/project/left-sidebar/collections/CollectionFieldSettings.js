import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCollectionField,
  editCollectionField,
  setActiveSettingsCollectionFieldId,
  setKeyboardNavigationOn,
} from '../../../../features/project'

export default function CollectionFieldSettings({ field }) {
  const isOpen = useSelector(
    (state) => state.project.activeSettingsCollectionFieldId === field.id
  )
  const dispatch = useDispatch()

  const nameRef = useRef()
  const helpTextRef = useRef()

  let typeText = ''
  if (field.type === 'img') {
    typeText = 'Image'
  }
  if (field.type === 'text') {
    typeText = 'Plain Text'
  }

  useEffect(() => {
    nameRef.current.value = field.name
    helpTextRef.current.value = field.helpText || ''
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(
      editCollectionField({
        name: nameRef.current.value,
        helpText: helpTextRef.current.value,
      })
    )
    dispatch(setActiveSettingsCollectionFieldId(''))
  }

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  return (
    <div>
      <div
        className="collection-fields-settings_item"
        onClick={() => dispatch(setActiveSettingsCollectionFieldId(field.id))}
      >
        {field.name} <span>({typeText})</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className={
          'collection-fields-settings_item-settings' + (isOpen ? ' active' : '')
        }
      >
        <div className="setting-absolute-buttons">
          <div
            className="settings-delete-button"
            onClick={() => dispatch(deleteCollectionField())}
          >
            Delete
          </div>
          <div
            className="settings-button white-button"
            onClick={() => dispatch(setActiveSettingsCollectionFieldId(''))}
          >
            Close
          </div>
        </div>
        <label className="settings-label">NAME</label>
        <input
          className="settings-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={nameRef}
        />
        <label className="settings-label">HELP TEXT</label>
        <input
          className="settings-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={helpTextRef}
        />

        <button className="settings-button blue-button">Save</button>
      </form>
    </div>
  )
}
