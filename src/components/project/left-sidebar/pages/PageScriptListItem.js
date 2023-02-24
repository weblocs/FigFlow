import { useDispatch, useSelector } from 'react-redux'
import { removeScriptFromPage } from '../../../../features/project'

export default function PageScriptListItem({ scriptId }) {
  const script = useSelector((state) =>
    state.project.scripts?.find((script) => script.id === scriptId)
  )
  const dispatch = useDispatch()

  return (
    <div className="flex justify-between">
      {script?.name}
      <span onClick={() => dispatch(removeScriptFromPage(scriptId))}>-</span>
    </div>
  )
}
