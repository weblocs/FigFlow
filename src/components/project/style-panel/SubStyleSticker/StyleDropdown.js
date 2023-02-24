import { useEffect, useState } from 'react'
import AddOption from './AddOption'
import AssignInlineStyles from './AssignInlineStyles'
import DefaultNameForm from './DefaultNameForm'
import DeleteOption from './DeleteOption'
import EditOptions from './EditOptions'
import RemoveOption from './RemoveOption'
import ResponsiveStyleSettings from './ResponsiveStyleSettings'
import StyleOptionsList from './StyleOptionsList'

export default function StyleDropdown({
  id,
  index,
  isOnlyForMobile,
  isOnlyForTablet,
  child,
  isOpen,
  handleOpen,
}) {
  const [editingOptionsTurnOn, setEditingOptionsTurnOn] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const el = document.querySelector(`[dropdown='${id}']`)
    const rect = el?.getBoundingClientRect()
    const right = rect?.right
    const windowWidth = window?.innerWidth
    const position = right - windowWidth
    if (right > windowWidth) {
      el.style.left = `-${position}px`
      el.style.marginLeft = `-24px`
    }
  }, [isOpen])

  if (isOpen) {
    return (
      <div className="style-options-dropdown active" dropdown={`${id}`}>
        <StyleOptionsList
          index={index}
          handleOpen={handleOpen}
          editingOptionsTurnOn={editingOptionsTurnOn}
        />

        <AddOption index={index} />

        <AssignInlineStyles id={id} child={child} handleOpen={handleOpen} />

        <EditOptions
          editingOptionsTurnOn={editingOptionsTurnOn}
          setEditingOptionsTurnOn={setEditingOptionsTurnOn}
        />

        <RemoveOption index={index} handleOpen={handleOpen} />

        <DeleteOption index={index} />

        <ResponsiveStyleSettings
          index={index}
          isOnlyForMobile={isOnlyForMobile}
          isOnlyForTablet={isOnlyForTablet}
        />

        <DefaultNameForm index={index} />
      </div>
    )
  }
}
