import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveProjectResolution } from '../../../features/project'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import { isCmdPressed } from '../../../utils/utils'

export default function TopNavbarResolutionChangeButton({
  resolutionNumber,
  image,
}) {
  const activeProjectResolution = useSelector(
    (state) => state.project.activeProjectResolution
  )
  const keyboardNavigationOn = useSelector(
    (state) => state.project.keyboardNavigationOn
  )

  const { copyShortcut } = useKeyboardShortcut(
    [resolutionNumber],
    (shortcutKeys) => {
      if (!isCmdPressed() && keyboardNavigationOn) {
        dispatch(setActiveProjectResolution(resolutionNumber))
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const dispatch = useDispatch()

  return (
    <div
      className={
        'addNodeButton ' +
        (activeProjectResolution === resolutionNumber ? 'active' : '')
      }
      onClick={() => dispatch(setActiveProjectResolution(resolutionNumber))}
    >
      <img src={image} style={{ width: '16px' }} />
    </div>
  )
}
