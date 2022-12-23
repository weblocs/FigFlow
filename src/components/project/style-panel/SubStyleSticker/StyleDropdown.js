import { useState } from 'react'
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

  if (isOpen) {
    return (
      <div className="style-options-dropdown active">
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
