import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../_atoms/AddButton'
import { v4 as uuidv4 } from 'uuid'
import { addScript } from '../../../../features/project'
import ScriptSettings from './ScriptSettings'
import ScriptsListItem from './ScriptsListItem'

export default function ProjectScriptsPanel() {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.project.activeTab)
  const scripts = useSelector((state) => state.project.scripts)
  const activeScriptId = useSelector((state) => state.project.activeScriptId)

  function handleAddScript() {
    dispatch(addScript({ name: 'New Script' }))
  }

  if (activeTab === 'Scripts') {
    if (activeScriptId !== null) {
      return <ScriptSettings />
    }
    return (
      <div
        className={
          'collectionsPanel ' + (activeTab === 'Scripts' ? 'active' : '')
        }
      >
        <div className="projectTabTitleBox">
          Scripts
          <div className="projectTabTitleButtonsBox">
            <AddButton fx={handleAddScript} />
          </div>
        </div>

        {scripts.map((script) => {
          return <ScriptsListItem key={script.id} script={script} />
        })}
      </div>
    )
  }
}
