import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DragInput({ defaultValue, handleChange }) {
  const isAltPressed = useSelector((state) => state.project.isAltPressed)
  const [value, setValue] = useState(0)

  const onInputChange = useCallback(
    (ev) => setValue(parseInt(ev.target.value, 10)),
    []
  )

  const [snapshot, setSnapshot] = useState(value)
  const [startVal, setStartVal] = useState(0)

  useEffect(() => {
    if (!isNaN(parseInt(defaultValue))) {
      setValue(parseInt(defaultValue))
    } else {
      setValue(0)
    }
  }, [defaultValue])

  const onStart = useCallback(
    (event) => {
      setStartVal(event.clientX)
      setSnapshot(value)
    },
    [value]
  )

  useEffect(() => {
    const onUpdate = (event) => {
      if (startVal) {
        setValue(snapshot + event.clientX - startVal)
        handleChange(snapshot + event.clientX - startVal)
      }
    }

    const onEnd = () => {
      setStartVal(0)
    }

    document.addEventListener('mousemove', onUpdate)
    document.addEventListener('mouseup', onEnd)
    return () => {
      document.removeEventListener('mousemove', onUpdate)
      document.removeEventListener('mouseup', onEnd)
    }
  }, [startVal, setValue, snapshot])

  if (isAltPressed) {
    return <div className="input-drag-resize-wrap" onMouseDown={onStart}></div>
  }
}
