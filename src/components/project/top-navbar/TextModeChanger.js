import { useDispatch, useSelector } from 'react-redux'
import { togglePasteTextMode } from '../../../features/project'

export default function TextModeChanger() {
  const pasteTextMode = useSelector((state) => state.project.pasteTextMode)
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(togglePasteTextMode(false))
  }

  if (!pasteTextMode) return null
  return (
    <div className="page-changer" onClick={handleClick}>
      TextMode: Turn Off
    </div>
  )
}
