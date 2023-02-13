import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaveButton from './SaveButton'
import TopNavbarResolutionChangeButton from './TopNavbarResolutionChangeButton'
import RightPanelButtonsList from './RightPanelButtonsList'
import ExportButton from './ExportButton'
import SidebarButton from '../left-sidebar/_atoms/SidebarButton'
import PageChanger from '../left-sidebar/navigator/PageChanger'
import VersionsChanger from './VersionsChanger'
import DesktopIcon from '../../../img/desktop.svg'
import TabletIcon from '../../../img/tablet.svg'
import PortraitIcon from '../../../img/portrait.svg'
import ScriptsIcon from '../../../img/code.svg'
import MobileIcon from '../../../img/mobile.svg'
import DatabaseIcon from '../../../img/database.svg'
import StructureIcon from '../../../img/structure.svg'
import BackupIcon from '../../../img/backup.svg'
import ProjectLogo from './ProjectLogo'
import CustomResolutionsButton from './CustomResolutionsButton'
import ExportButtonServer from './ExportButtonServer'
import RestoreButton from './RestoreButton'

export default function TopNavbar() {
  const projectMode = useSelector((state) => state.project.projectMode)
  const isBackupOn = useSelector((state) => state.project.isBackupOn !== null)
  const dispatch = useDispatch()

  return (
    <div className="addNodeWrapper">
      <div className="projectNavigationLeft">
        <ProjectLogo />

        {projectMode === 'creator' && (
          <div style={{ display: 'flex' }}>
            <SidebarButton shortcode="Z" tab="Navigator" img={StructureIcon} />
            <SidebarButton shortcode="C" tab="Collections" img={DatabaseIcon} />
            {!isBackupOn && (
              <SidebarButton shortcode="B" tab="Backups" img={BackupIcon} />
            )}
            <SidebarButton shortcode="S" tab="Scripts" img={ScriptsIcon} />
          </div>
        )}
        <PageChanger />
        <VersionsChanger />
      </div>

      <div
        className={
          'centerNavbar' +
          (projectMode === 'creator' ? ' creator-mode-list' : '')
        }
      >
        <CustomResolutionsButton />

        <TopNavbarResolutionChangeButton
          resolutionNumber="1"
          image={DesktopIcon}
        />
        <TopNavbarResolutionChangeButton
          resolutionNumber="2"
          image={TabletIcon}
        />
        <TopNavbarResolutionChangeButton
          resolutionNumber="3"
          image={MobileIcon}
        />
      </div>

      <div className="projectNavigationRight">
        {isBackupOn ? (
          <>
            <RestoreButton />
          </>
        ) : (
          <>
            <ExportButton />
            <SaveButton />
          </>
        )}

        <RightPanelButtonsList />
      </div>
    </div>
  )
}
