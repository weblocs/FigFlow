import { useDispatch, useSelector } from 'react-redux'
import { setActiveScriptId } from '../../../../features/project'

export default function ScriptsListItem({ script }) {
  const activeScriptId = useSelector((state) => state.project.activeScriptId)
  const dispatch = useDispatch()
  return (
    <div
      className={
        'projectPageItem ' + (script.id === activeScriptId ? 'active' : '')
      }
      onClick={() => dispatch(setActiveScriptId(script.id))}
    >
      {script.name}
    </div>
  )
}
