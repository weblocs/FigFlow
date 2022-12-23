import { useState } from 'react'
import { useSelector } from 'react-redux'
import ModalBackgroundCloser from '../../_atoms/ModalBackgroundCloser'

import StyleDropdown from './StyleDropdown'
import StyleSticker from './StyleSticker'

export default function SubStyleSticker({
  id,
  name,
  index,
  styleIsSet,
  isOnlyForMobile,
  isOnlyForTablet,
  child,
}) {
  const isStyleActive = useSelector(
    (state) => state.project.activeStyleId === id
  )
  const zIndex = useSelector(
    (state) => state.project.stylesInActiveNode.length + 10 - index
  )

  const [openStyleOptionsDropdown, setOpenStyleOptionsDropdown] =
    useState(false)

  return (
    <div
      className={
        'selected-class' +
        (isStyleActive ? ' active' : '') +
        (styleIsSet ? '' : ' styleIsNotSet')
      }
      style={{ zIndex: zIndex }}
    >
      <ModalBackgroundCloser
        handleClick={() => setOpenStyleOptionsDropdown(false)}
        isActiveIf={openStyleOptionsDropdown}
      />

      <StyleSticker
        isOpen={openStyleOptionsDropdown}
        handleOpen={setOpenStyleOptionsDropdown}
        id={id}
        index={index}
        name={name}
        isOnlyForMobile={isOnlyForMobile}
        isOnlyForTablet={isOnlyForTablet}
        styleIsSet={styleIsSet}
        child={child}
      />

      <StyleDropdown
        isOpen={openStyleOptionsDropdown}
        handleOpen={setOpenStyleOptionsDropdown}
        id={id}
        index={index}
        isOnlyForMobile={isOnlyForMobile}
        isOnlyForTablet={isOnlyForTablet}
        child={child}
      />
    </div>
  )
}
