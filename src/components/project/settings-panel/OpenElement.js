import { useDispatch, useSelector } from 'react-redux'
import PanelTabTitle from '../left-sidebar/_atoms/PanelTabTitle'

export default function OpenElement() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  dispatch(
    editHtmlNode({
      field: 'isNavbarMenuTrigger',
      value: inputNameRef.current.value,
    })
  )
  const dispatch = useDispatch()

  return (
    <>
      <PanelTabTitle text="Actions" />
      <div className="style-panel-box">
        <button>Make Dropdown Trigger</button>
        <button>Make Dropdown</button>
      </div>
    </>
  )
}
