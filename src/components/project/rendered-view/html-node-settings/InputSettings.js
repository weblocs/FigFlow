import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'
import SettingsIcon from '../../../../img/settings.svg'
import ModalBackgroundCloser from '../../_atoms/ModalBackgroundCloser'

export default function InputSettings() {
  const isNodeInput = useSelector(
    (state) => state.project.activeNodeObject?.type === 'i'
  )
  const dispatch = useDispatch()

  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )

  const [isOpen, setIsOpen] = useState(false)

  const inputNameRef = useRef()
  const inputPlaceholderRef = useRef()

  function onNameBlur() {
    dispatch(
      editHtmlNode({ field: 'inputName', value: inputNameRef.current.value })
    )
  }

  function onPlaceholderBlur() {
    dispatch(
      editHtmlNode({
        field: 'inputPlaceholder',
        value: inputPlaceholderRef.current.value,
      })
    )
  }

  useEffect(() => {
    if (!isOpen) return
    console.log(activeNodeObject?.inputName)
    inputNameRef.current.value = activeNodeObject?.inputName || ''
    inputPlaceholderRef.current.value = activeNodeObject?.inputPlaceholder || ''
  }, [isOpen])

  if (isNodeInput) {
    return (
      <>
        <div
          className="rich-element-settings_button button-centered active"
          onClick={() => setIsOpen(true)}
        >
          <img src={SettingsIcon} style={{ width: '14px' }} />
        </div>

        <ModalBackgroundCloser
          handleClick={() => setIsOpen(false)}
          isActiveIf={isOpen}
        />

        {isOpen && (
          <div className="link-settings-modal settings-panel">
            <div className="settings-label">Name</div>
            <input
              className="settings-input full-width"
              onBlur={onNameBlur}
              ref={inputNameRef}
            />
            <div className="settings-label">Placeholder</div>
            <input
              className="settings-input full-width"
              ref={inputPlaceholderRef}
              onBlur={onPlaceholderBlur}
            />
          </div>
        )}
      </>
    )
  }
}
