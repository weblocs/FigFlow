import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addScriptToPage } from '../../../../features/project'
import AddButton from '../_atoms/AddButton'
import PageScriptListItem from './PageScriptListItem'

export default function PageScriptsSettings() {
  const pageScripts = useSelector((state) => {
    function isCmsPage() {
      return state.project.openedSettingsPage?.items !== undefined
    }
    if (!isCmsPage()) {
      return (
        state.project.projectPages?.find(
          (page) => page.id === state.project.openedSettingsPage?.id
        )?.scripts || []
      )
    }
    return (
      state.project.collections?.find(
        (collection) => collection.id === state.project.openedSettingsPage?.id
      )?.scripts || []
    )
  })
  const notIncludedPageScripts = useSelector((state) =>
    state.project.scripts.filter(
      (script) => !pageScripts.find((pageScript) => pageScript.id === script.id)
    )
  )
  const dispatch = useDispatch()

  const inputRef = useRef()

  function addScript() {
    const scriptId = inputRef.current.value
    dispatch(addScriptToPage(scriptId))
  }

  return (
    <div>
      <div className="settings-label">Scripts</div>
      <div className="flex justify-between items-center">
        <select ref={inputRef}>
          {notIncludedPageScripts.map((script) => {
            return (
              <option value={script.id} key={script.id}>
                {script.name}
              </option>
            )
          })}
        </select>
        <AddButton fx={addScript} />
      </div>
      {pageScripts.map((script, i) => {
        return <PageScriptListItem key={script.id + i} scriptId={script.id} />
      })}
    </div>
  )
}
