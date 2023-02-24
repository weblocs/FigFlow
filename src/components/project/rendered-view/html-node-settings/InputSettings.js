import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'
import SettingsIcon from '../../../../img/settings.svg'
import Checkbox from '../../../ui/Checkbox'
import Input from '../../../ui/Input'
import Label from '../../../ui/Label'
import Select from '../../../ui/Select'
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
  const inputTypeRef = useRef()
  const inputRequiredRef = useRef()
  const inputAutofocusRef = useRef()

  function dispatchEditNode(field, value) {
    dispatch(editHtmlNode({ field, value }))
  }

  function onNameBlur() {
    dispatchEditNode('inputName', inputNameRef.current.value)
  }

  function onPlaceholderBlur() {
    dispatchEditNode('inputPlaceholder', inputPlaceholderRef.current.value)
  }

  function onTypeInput() {
    dispatchEditNode('inputType', inputTypeRef.current.value)
  }

  function onRequiredInput() {
    dispatchEditNode('inputRequired', inputRequiredRef.current.checked)
  }

  function onAutofocusInput() {
    dispatchEditNode('inputAutofocus', inputAutofocusRef.current.checked)
  }

  useEffect(() => {
    if (!isOpen) return
    // console.log(activeNodeObject?.inputType)
    inputNameRef.current.value = activeNodeObject?.inputName || ''
    inputPlaceholderRef.current.value = activeNodeObject?.inputPlaceholder || ''
    inputTypeRef.current.value = activeNodeObject?.inputType || 'text'
    inputRequiredRef.current.checked = activeNodeObject?.inputRequired || false
    inputAutofocusRef.current.checked =
      activeNodeObject?.inputAutofocus || false
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
            <Label text="Name" />
            <Input useRef={inputNameRef} onBlur={onNameBlur} />

            <Label text="Placeholder" />
            <Input useRef={inputPlaceholderRef} onBlur={onPlaceholderBlur} />

            <Label text="Type" />
            <Select
              useRef={inputTypeRef}
              onInput={onTypeInput}
              options={[
                { value: 'text', label: 'Text' },
                { value: 'email', label: 'Email' },
                { value: 'password', label: 'Password' },
                { value: 'number', label: 'Number' },
                { value: 'tel', label: 'Telephone' },
                { value: 'url', label: 'URL' },
              ]}
            />

            <Checkbox
              label="Required"
              onInput={onRequiredInput}
              useRef={inputRequiredRef}
            />
            <Checkbox
              label="Autofocus"
              onInput={onAutofocusInput}
              useRef={inputAutofocusRef}
            />
          </div>
        )}
      </>
    )
  }
}
