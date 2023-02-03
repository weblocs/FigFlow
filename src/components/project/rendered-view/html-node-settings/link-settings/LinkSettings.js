import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveHtmlNodeLink,
  setActivePage,
} from '../../../../../features/project'
import SettingsIcon from '../../../../../img/settings.svg'
import ModalBackgroundCloser from '../../../_atoms/ModalBackgroundCloser'
import CmsCurrentLink from './CmsCurrentLink'
import GoToPageButton from './GoToPageButton'

function LinkSettings() {
  const activeNodeType = useSelector(
    (state) => state.project.activeNodeObject?.type
  )
  const activeNodeLink = useSelector((state) => {
    return state.project.activeNodeObject?.link
  })
  const projectPages = useSelector((state) =>
    state.project.projectPages
      .filter((page) => page.is404 !== true)
      .filter((page) => page.isStarter !== true)
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  if (activeNodeType === 'l' || activeNodeType === 'a') {
    return (
      <>
        <GoToPageButton
          activeNodeLink={activeNodeLink}
          handleHideTab={() => setIsOpen(false)}
        />
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
          <div className="link-settings-modal">
            <CmsCurrentLink />
            Link to:{' '}
            {projectPages?.find(({ id }) => id === activeNodeLink)?.name}
            {projectPages.map((page) => (
              <div
                onClick={() =>
                  dispatch(
                    setActiveHtmlNodeLink({ link: page.id, linkType: 'page' })
                  )
                }
                key={page.id}
              >
                {page.name}
              </div>
            ))}
          </div>
        )}
      </>
    )
  }
}

export default LinkSettings
