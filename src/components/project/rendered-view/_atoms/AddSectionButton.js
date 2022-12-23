import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveHtmlNode,
  setProjectPopUp,
} from '../../../../features/project'

export default function AddSectionButton({ sectionId }) {
  const nodesEditMode = useSelector((state) => state.project.nodesEditMode)
  const hoveredSectionId = useSelector(
    (state) => state.project.hoveredSectionId
  )
  const dispatch = useDispatch()

  function handleAddSectionButtonClick() {
    dispatch(setActiveHtmlNode({ id: sectionId }))
    dispatch(setProjectPopUp('addSection'))
  }

  if (nodesEditMode !== 'layout') {
    return (
      <div
        className={
          'add-section_box active' +
          (hoveredSectionId === sectionId ? ' active' : '')
        }
      >
        <div
          className="add-section_button"
          onClick={handleAddSectionButtonClick}
        >
          +
        </div>
      </div>
    )
  }
}
