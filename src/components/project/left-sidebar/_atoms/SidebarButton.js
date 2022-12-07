import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveProjectTab } from '../../../../features/project'
import useKeyboardShortcut from 'use-keyboard-shortcut'

export default function SidebarButton(props) {
  const dispatch = useDispatch()
  const keyboardNavigationOn = useSelector(
    (state) => state.project.keyboardNavigationOn
  )
  const activeTab = useSelector((state) => state.project.activeTab)

  const { openNavigatorShortcut } = useKeyboardShortcut(
    [props.shortcode],
    (shortcutKeys) => {
      if (keyboardNavigationOn && !window.event.metaKey) {
        dispatch(setActiveProjectTab(props.tab))
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
        'projectSidebarButton' + (activeTab === props.tab ? ' active' : '')
      }
      onClick={() => dispatch(setActiveProjectTab(props.tab))}
    >
      {props?.img ? (
        <img className="sidebar-button_image" src={props.img} />
      ) : (
        <div>{props.letter}</div>
      )}
    </div>
  )
}
