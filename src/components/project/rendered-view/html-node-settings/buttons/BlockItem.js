import { useDispatch, useSelector } from 'react-redux'
import {
  copyLayoutHtmlNodes,
  pasteLayoutHtmlNodes,
} from '../../../../../features/project'

export default function BlockItem({ item, closeTab, inputText }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  function handleAddBlockClick(sectionNodes) {
    dispatch(copyLayoutHtmlNodes(sectionNodes))
    dispatch(pasteLayoutHtmlNodes())
    closeTab()
  }

  //   if (
  //     inputText !== '' &&
  //     !item.name.toLowerCase().includes(inputText.toLowerCase())
  //   ) {
  //     return null
  //   }
  return (
    <div
      className="blocks-list_item"
      key={item.id}
      onClick={() => handleAddBlockClick(item.preRenderedHTMLNodes)}
    >
      {item.name}
    </div>
  )
}
