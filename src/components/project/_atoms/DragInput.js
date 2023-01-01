import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DragInput({
  defaultValue,
  handleChange,
  handleStart,
  handleEnd,
}) {
  const isAltPressed = useSelector((state) => state.project.isAltPressed)
  const [value, setValue] = useState(0)

  const [snapshot, setSnapshot] = useState(value)
  const [startVal, setStartVal] = useState(0)

  const [round, setRound] = useState(0)
  const [isDragged, setIsDragged] = useState(false)

  useEffect(() => {
    if (!isNaN(parseFloat(defaultValue))) {
      setValue(parseFloat(defaultValue))
    } else {
      setValue(0)
    }
    // if (defaultValue < 1) {
    //   setRound(1)
    // }
    // if (defaultValue < 0.1) {
    //   setRound(2)
    // }
    // if (defaultValue < 0.01) {
    //   setRound(3)
    // }
  }, [defaultValue])

  const onStart = useCallback(
    (event) => {
      setIsDragged(true)
      setStartVal(event.clientX)
      setSnapshot(value)
      handleStart()
    },
    [value]
  )

  useEffect(() => {
    const onUpdate = (event) => {
      if (startVal) {
        setValue(
          parseFloat(
            parseFloat(snapshot) +
              (event.clientX - startVal) * Math.pow(10, -1 * round) * 0.5
          ).toFixed(round)
        )
        handleChange(
          parseFloat(
            parseFloat(snapshot) +
              (event.clientX - startVal) * Math.pow(10, -1 * round) * 0.5
          ).toFixed(round)
        )
      }
    }

    const onEnd = () => {
      setIsDragged(false)
      setStartVal(0)
      if (isDragged) {
        handleEnd(
          parseFloat(
            parseFloat(snapshot) +
              (event.clientX - startVal) * Math.pow(10, -1 * round) * 0.5
          ).toFixed(round)
        )
      }
    }

    document.addEventListener('mousemove', onUpdate)
    document.addEventListener('mouseup', onEnd)

    return () => {
      document.removeEventListener('mousemove', onUpdate)
      document.removeEventListener('mouseup', onEnd)
    }
  }, [startVal, setValue, snapshot])

  if (isAltPressed) {
    return (
      <div
        className={'input-drag-resize-wrap' + (isDragged ? ' active' : '')}
        onMouseDown={onStart}
      ></div>
    )
  }
}
