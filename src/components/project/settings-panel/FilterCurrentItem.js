import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editHtmlNode,
  setActiveHtmlFilterCurrentState,
} from '../../../features/project'

export default function FilterCurrentItem({
  activeCollectionId,
  activeCollectionNodeId,
}) {
  const listInActiveTemplateCollection = useSelector(
    (state) => activeCollectionId === state.project.activeCollectionTemplateId
  )

  //   const isListFilteringCurrent = useSelector((state) => {
  //     activeListNode?.filterCurrent ? true : false
  //   })

  const activeListNode = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = parentPath.length - 1; i >= 0; i--) {
      if (parentPath[i]?.type === 'col') {
        return parentPath[i]
      }
    }
  })

  const isListFilteringCurrent = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = parentPath.length - 1; i >= 0; i--) {
      if (parentPath[i]?.type === 'col') {
        return parentPath[i]?.filterCurrent ? true : false
      }
    }
  })

  const dispatch = useDispatch()

  function handleChange(e) {
    dispatch(
      setActiveHtmlFilterCurrentState({
        id: activeCollectionNodeId,
        value: e.target.checked,
      })
    )
  }

  useEffect(() => {
    // console.log(activeListNode)
  }, [activeListNode])

  if (listInActiveTemplateCollection) {
    return (
      <label className="style-panel-box fields-select">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isListFilteringCurrent}
        />
        <div className="fields-select_text">List current item</div>
      </label>
    )
  }
}
