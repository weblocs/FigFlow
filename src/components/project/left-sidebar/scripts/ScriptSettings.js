import { useDispatch, useSelector } from 'react-redux'
import { deleteScript, setActiveScriptId } from '../../../../features/project'
import Arrow from '../../../../img/arrow-left.svg'
import CodeEditor from './CodeEditor'
import FieldNameInput from './FieldNameInput'
import Libraries from './Libraries'

export default function ScriptSettings() {
  const activeScriptId = useSelector((state) => state.project.activeScriptId)
  const activeScript = useSelector((state) =>
    state.project.scripts.find(
      (script) => script.id === state.project.activeScriptId
    )
  )
  const dispatch = useDispatch()

  function handleArrowClick() {
    dispatch(setActiveScriptId(null))
  }

  if (activeScriptId !== null) {
    return (
      <div className="collectionsPanel is-script active">
        <div className="projectTabTitleBox">
          <div>
            <span className="panel_back-button" onClick={handleArrowClick}>
              <img src={Arrow} />
            </span>
            {activeScript.name} Script
          </div>
          <div
            className="text font-light"
            onClick={() => dispatch(deleteScript({ id: null }))}
          >
            Delete
          </div>
        </div>
        <FieldNameInput />
        <Libraries />
        <CodeEditor text="JavaScript" type="js" />
        <CodeEditor text="CSS" type="css" />
      </div>
    )
  }
}
