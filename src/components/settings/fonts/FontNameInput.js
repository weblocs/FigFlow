import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../ui/Input'

export default function FontNameInput({ font }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus()
      inputRef.current.value = font.name
    }
  }, [isOpen])

  return (
    <div>
      {isOpen ? (
        <Input useRef={inputRef} onBlur={() => setIsOpen(false)} />
      ) : (
        <div className="text-lg" onClick={() => setIsOpen(true)}>
          {font.name}
        </div>
      )}
    </div>
  )
}
