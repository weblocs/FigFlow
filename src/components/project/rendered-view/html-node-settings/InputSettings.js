import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'
import SettingsIcon from '../../../../img/settings.svg'
import Checkbox from '../../../ui/Checkbox'
import CheckboxNoRef from '../../../ui/CheckboxNoRef'
import Input from '../../../ui/Input'
import Label from '../../../ui/Label'
import Select from '../../../ui/Select'
import ModalBackgroundCloser from '../../_atoms/ModalBackgroundCloser'

export default function InputSettings() {
  const inNodeFormElement = useSelector(
    (state) =>
      state.project.activeNodeObject?.type === 'i' ||
      state.project.activeNodeObject?.type === 'area' ||
      state.project.activeNodeObject?.type === 'c' ||
      state.project.activeNodeObject?.type === 'r' ||
      state.project.activeNodeObject?.type === 'form'
  )
  const isNodeInput = useSelector(
    (state) => state.project.activeNodeObject?.type === 'i'
  )

  const isNodeTextArea = useSelector(
    (state) => state.project.activeNodeObject?.type === 'area'
  )

  const isNodeCheckbox = useSelector(
    (state) => state.project.activeNodeObject?.type === 'c'
  )

  const isNodeRadio = useSelector(
    (state) => state.project.activeNodeObject?.type === 'r'
  )

  const isNodeForm = useSelector(
    (state) => state.project.activeNodeObject?.type === 'form'
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
  const inputStartCheckedRef = useRef()
  const inputRadioValueRef = useRef()

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

  function onStartCheckedInput() {
    dispatchEditNode('inputStartChecked', inputStartCheckedRef.current.checked)
  }

  function onRadioValueBlur() {
    dispatchEditNode('inputRadioValue', inputRadioValueRef.current.value)
  }

  useEffect(() => {
    if (!isOpen) return
    inputNameRef.current.value = activeNodeObject?.inputName || ''
    if (isNodeInput || isNodeTextArea) {
      inputPlaceholderRef.current.value =
        activeNodeObject?.inputPlaceholder || ''
    }
    if (isNodeInput) {
      inputTypeRef.current.value = activeNodeObject?.inputType || 'text'
    }

    if (isNodeRadio) {
      inputRadioValueRef.current.value = activeNodeObject?.inputRadioValue || ''
    }

    if (!isNodeForm) {
      inputRequiredRef.current.checked =
        activeNodeObject?.inputRequired === 'true' || false
    }

    if (isNodeInput || isNodeTextArea) {
      inputAutofocusRef.current.checked =
        activeNodeObject?.inputAutofocus === 'true' || false
    }
    if (isNodeCheckbox) {
      inputStartCheckedRef.current.checked =
        activeNodeObject?.inputStartChecked === 'true' || false
    }
  }, [isOpen])

  if (inNodeFormElement) {
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

            {(isNodeInput || isNodeTextArea) && (
              <>
                <Label text="Placeholder" />
                <Input
                  useRef={inputPlaceholderRef}
                  onBlur={onPlaceholderBlur}
                />
              </>
            )}

            {isNodeRadio && (
              <>
                <Label text="Radio Value" />
                <Input useRef={inputRadioValueRef} onBlur={onRadioValueBlur} />
              </>
            )}

            {isNodeInput && (
              <>
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
              </>
            )}

            {!isNodeForm && (
              <Checkbox
                label="Required"
                onInput={onRequiredInput}
                useRef={inputRequiredRef}
              />
            )}

            {isNodeCheckbox && (
              <Checkbox
                label="Start checked"
                onInput={onStartCheckedInput}
                useRef={inputStartCheckedRef}
              />
            )}

            {(isNodeInput || isNodeTextArea) && (
              <Checkbox
                label="Autofocus"
                onInput={onAutofocusInput}
                useRef={inputAutofocusRef}
              />
            )}
          </div>
        )}
      </>
    )
  }
}
