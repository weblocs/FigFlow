import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'
import SettingsIcon from '../../../../img/settings.svg'
import ModalBackgroundCloser from '../../_atoms/ModalBackgroundCloser'

export default function EmbedSettings() {
  const isNodeInput = useSelector(
    (state) => state.project.activeNodeObject?.type === 'embed'
  )
  const dispatch = useDispatch()

  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )

  const [isOpen, setIsOpen] = useState(false)

  const inputNameRef = useRef()

  function onNameBlur() {
    dispatch(
      editHtmlNode({ field: 'embed', value: inputNameRef.current.value })
    )
  }

  useEffect(() => {
    if (!isOpen) return
    inputNameRef.current.value = activeNodeObject?.embed || ''
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
            <div className="settings-label">Embeded Code</div>
            <textarea onBlur={onNameBlur} ref={inputNameRef} />
          </div>
        )}
      </>
    )
  }
}
