import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'
import SettingsIcon from '../../../../img/settings.svg'
import ModalBackgroundCloser from '../../_atoms/ModalBackgroundCloser'

import OpenIcon from '../../../../img/open-link.svg'
import { element } from 'prop-types'

export default function ActionButton() {
  const isNodeInput = useSelector(
    (state) => state.project.activeNodeObject?.type === 'i'
  )
  const dispatch = useDispatch()

  const isInNavTrigger = useSelector((state) =>
    state.project.activeNodeParentsPath.some((node) => node.type === 'nav_tr')
  )

  const [isOpen, setIsOpen] = useState(false)

  function openNavigation() {
    document
      .querySelector("[isnavlist='true']")
      .classList.toggle('is-nav-hidden')
  }

  if (isInNavTrigger) {
    return (
      <>
        <div
          className="rich-element-settings_button button-centered active"
          onClick={openNavigation}
        >
          <img src={OpenIcon} style={{ width: '14px' }} />
        </div>
        <div
          className="rich-element-settings_button button-centered active"
          onClick={() => setIsOpen(true)}
        >
          <img src={SettingsIcon} style={{ width: '14px' }} />
        </div>

        <ModalBackgroundCloser
          handleClick={() => setIsOpen(false)}
          isActiveIf={isOpen}
        />

        {isOpen && (
          <div className="link-settings-modal settings-panel">
            <div className="settings-label">Settings</div>
          </div>
        )}
      </>
    )
  }
}
