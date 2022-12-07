import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'

export default function ColorPickerNewSwatch({
  swatch,
  activeSwatchId,
  style,
  handleSwatchClick,
}) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(editStyleProperty([style, '{{' + swatch.id + '}}']))
    handleSwatchClick()
  }

  return (
    <div
      onClick={handleClick}
      className={
        'swatches-item' + (swatch.id === activeSwatchId ? ' active' : '')
      }
      style={{ background: swatch.color }}
    ></div>
  )
}
