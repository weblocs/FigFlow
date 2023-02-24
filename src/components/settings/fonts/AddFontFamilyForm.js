import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFontFamily } from '../../../features/project'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Label from '../../ui/Label'

export default function AddFontFamilyForm() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const nameRef = useRef()

  function handleSubmit() {
    event.preventDefault()
    dispatch(addFontFamily(nameRef.current.value))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label text="Add Font Family" />
      <div className="flex gap-4">
        <Input
          useRef={nameRef}
          placeholder="Font Family Name"
          width="200"
          mb0={true}
        />
        <Button text="Add font family" type="action" submit={true} />
      </div>
    </form>
  )
}
