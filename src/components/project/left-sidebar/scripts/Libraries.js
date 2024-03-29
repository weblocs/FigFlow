import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  connectLibraryWithScript,
  disConnectLibraryWithScript,
} from '../../../../features/project'
import AddButton from '../_atoms/AddButton'
import ImportLibrary from './ImportLibrary'

export default function Libraries() {
  const notIncludedLibraries = useSelector((state) =>
    state.project.libraries.filter(
      (library) =>
        !state.project.scripts
          .find((script) => script.id === state.project.activeScriptId)
          .requires.includes(library.id)
    )
  )
  const activeScriptLibraries = useSelector((state) => {
    const requiredLibrariresIdsArray = state.project.scripts.find(
      (script) => script.id === state.project.activeScriptId
    ).requires
    return requiredLibrariresIdsArray.map((libraryId) =>
      state.project.libraries.find((library) => library.id === libraryId)
    )
  })
  const dispatch = useDispatch()

  const selectRef = useRef()

  const [isLibraryImportOpen, setIsLibraryImportOpen] = useState(false)
  const [isLibraryConnectionOpen, setIsLibraryConnectionOpen] = useState(false)

  function addLibrary() {
    const libraryId = selectRef.current.value
    dispatch(connectLibraryWithScript({ libraryId }))
  }

  return (
    <div className="cms-field-input-wrap">
      <div className="flex justify-between">
        <div className="cms-field-input-label">Libraries</div>
        <div className="flex gap-8">
          <div
            className="text text-gray-400 pointer"
            onClick={() => setIsLibraryConnectionOpen(!isLibraryConnectionOpen)}
          >
            Connect library
          </div>
          <div
            className="text text-gray-400 pointer"
            onClick={() => setIsLibraryImportOpen(!isLibraryImportOpen)}
          >
            Import library
          </div>
        </div>
      </div>

      {isLibraryImportOpen && (
        <ImportLibrary
          closeLibraryImport={() => setIsLibraryImportOpen(false)}
        />
      )}

      {isLibraryConnectionOpen && (
        <div className="flex justify-between gap-8 items-center mt-8">
          <select ref={selectRef} className="select-input">
            {notIncludedLibraries.map((library) => (
              <option key={library.id} value={library.id}>
                {library.name}
              </option>
            ))}
          </select>

          <AddButton fx={addLibrary} />
        </div>
      )}

      {activeScriptLibraries.length > 0 && (
        <div className="mt-8">
          {activeScriptLibraries.map((library, i) => (
            <span
              onDoubleClick={() =>
                dispatch(disConnectLibraryWithScript({ libraryId: library.id }))
              }
              className="text text-gray-400"
              key={library.id + i}
            >
              {library.name}
              {i + 1 < activeScriptLibraries.length && ', '}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
