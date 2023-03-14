import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import { setActiveRightSidebarTab } from '../../../features/project'
import { isCmdPressed } from '../../../utils/utils'

export default function ProjectRightSidebarButton(props) {
  const dispatch = useDispatch()

  const activeRightSidebarTab = useSelector(
    (state) => state.project.activeRightSidebarTab
  )
  const projectModeCreator = useSelector(
    (state) => state.project.projectMode === 'creator'
  )
  const keyboardNavigationOn = useSelector(
    (state) => state.project.keyboardNavigationOn
  )

  const { openNavigatorShortcut } = useKeyboardShortcut(
    [props.letter],
    (shortcutKeys) => {
      if (!isCmdPressed() && keyboardNavigationOn) {
        dispatch(setActiveRightSidebarTab(props.tab))
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  return (
    <div
      className={
        'projectRightSidebarNav' +
        (activeRightSidebarTab === props.tab ? ' active' : '') +
        (projectModeCreator ? ' is-small' : '')
      }
      onClick={() => dispatch(setActiveRightSidebarTab(props.tab))}
    >
      <img src={props.icon} style={{ maxWidth: '18px', maxHeight: '18px' }} />
    </div>
  )
}
