import { useDispatch, useSelector } from 'react-redux'

export default function StyleGuideColorSwatch({ swatch }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  return (
    <div className="style-guide-swatch-wrap">
      <div
        style={{ background: swatch.color }}
        className="style-guide-swatch-palet"
      ></div>
      {swatch.name}
    </div>
  )
}
