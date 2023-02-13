import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLibrary } from '../../../../features/project'

export default function ImportLibrary({ closeLibraryImport }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const nameRef = useRef()
  const urlRef = useRef()
  const typeRef = useRef()

  function importLibrary() {
    const name = nameRef.current.value
    const url = urlRef.current.value
    const type = typeRef.current.value
    dispatch(addLibrary({ name, url, type }))
    closeLibraryImport()
    nameRef.current.value = ''
    urlRef.current.value = ''
  }

  return (
    <div className="mb-16 pb-16 border-bottom-gray">
      <div className="mb-8">
        <div className="cms-field-input-label">Library Name</div>
        <input
          className="settings-input no-margin-bottom full-width"
          ref={nameRef}
        />
      </div>

      <div className="mb-8">
        <div className="cms-field-input-label">Library URL</div>
        <input
          className="settings-input no-margin-bottom full-width"
          ref={urlRef}
        />
      </div>

      <div className="mb-8">
        <div className="cms-field-input-label">Library Type</div>
        <select className="select-input" ref={typeRef}>
          <option value="js">JS</option>
          <option value="css">CSS</option>
        </select>
      </div>

      <button className="settings-button blue-button" onClick={importLibrary}>
        Import
      </button>
    </div>
  )
}
