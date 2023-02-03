import { useDispatch, useSelector } from 'react-redux'

export default function SelectPageNavigation() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  return (
    <div className="project-settings_wrap">
      <label className="project-settings_label">
        Project navigation element
      </label>
    </div>
  )
}
