import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowDown from '../../../img/arrow-down.svg'
import StyleGuideColorSwatch from './StyleGuideColorSwatch'

export default function StyleGuideColors() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  function handleArrowClick() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className="style-panel-box title-box space-between folder-box"
        onClick={handleArrowClick}
      >
        <div className="text panel-title cursor-pointer">Colors</div>

        <div className="style-guide-buttons">
          <img
            className="style-guide-arrow-down"
            src={ArrowDown}
            alt="arrow down"
          />
        </div>
      </div>
      {isOpen && (
        <div className="style-panel-box style-guide-swatches-list">
          {projectSwatches?.map((swatch) => (
            <StyleGuideColorSwatch swatch={swatch} key={swatch.id} />
          ))}
        </div>
      )}
    </>
  )
}
