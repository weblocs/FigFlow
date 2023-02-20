import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ShadowStyleInput({ name, unit, value, handleChange }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isActive, setIsActive] = useState(false)

  const inputRef = useRef()

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      handleChange(e.target.value)
      setIsActive(false)
    }
    if (e.key === 'ArrowUp') {
      inputRef.current.value = Number(value) + 1
      handleChange(e.target.value)
    }
    if (e.key === 'ArrowDown') {
      inputRef.current.value = Number(value) - 1
      handleChange(e.target.value)
    }
  }

  useEffect(() => {
    inputRef.current.value = value
  }, [value])

  return (
    <div className="size-style-box" onClick={() => setIsActive(true)}>
      <div className="style-title-box">
        <div className="text">{name}</div>
      </div>
      <div className="style-edit-input">
        <div className={'style-edit-text' + (isActive ? ' active' : '')}>
          {value}
        </div>
        <input
          className={'style-edit-input-text' + (!isActive ? ' active' : '')}
          type="text"
          ref={inputRef}
          onBlur={() => setIsActive(false)}
          onKeyDown={handleKeyPress}
        />
        <div className="style-edit-unit read-only">{unit}</div>
      </div>
    </div>
  )
}
