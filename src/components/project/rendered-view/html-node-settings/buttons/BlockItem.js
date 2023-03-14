import { useDispatch, useSelector } from 'react-redux'
import {
  copyLayoutHtmlNodes,
  pasteLayoutHtmlNodes,
} from '../../../../../features/project'

export default function BlockItem({ item, closeTab, activeIndex, index }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  function handleAddBlockClick(sectionNodes) {
    dispatch(copyLayoutHtmlNodes(sectionNodes))
    setTimeout(() => {
      dispatch(pasteLayoutHtmlNodes())
    }, 1)
    closeTab()
  }

  return (
    <div
      className={
        'blocks-list_item' +
        (activeIndex === index && index !== undefined ? ' active' : '')
      }
      key={item.id}
      onClick={() => handleAddBlockClick(item.preRenderedHTMLNodes)}
    >
      {item.name}
    </div>
  )
}
