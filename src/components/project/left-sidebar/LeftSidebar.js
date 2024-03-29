import React from 'react'
import { useSelector } from 'react-redux'
import SidebarButton from './_atoms/SidebarButton'

import StructureIcon from '../../../img/structure.svg'
import PageIcon from '../../../img/page.svg'
import DatabaseIcon from '../../../img/cmsbase.svg'
import ImageIcon from '../../../img/image.svg'
import SymbolIcon from '../../../img/components.svg'
import LayoutsIcon from '../../../img/layout.svg'
import BlocksIcon from '../../../img/components-2.svg'
import VersionsIcon from '../../../img/capacitor.svg'

export default function LeftSidebar() {
  const projectMode = useSelector((state) => state.project.projectMode)
  return projectMode === 'developer' ? (
    <div className="projectSidebar">
      {/* <SidebarButton letter="A" shortcode="A" tab="Add" /> */}
      <SidebarButton
        letter="N"
        shortcode="Z"
        tab="Navigator"
        img={StructureIcon}
      />
      <SidebarButton letter="P" shortcode="P" tab="Pages" img={PageIcon} />
      <SidebarButton letter="C" tab="Collections" img={DatabaseIcon} />
      <SidebarButton letter="I" tab="Images" img={ImageIcon} />
      <SidebarButton letter="" shortcode="" tab="Symbols" img={SymbolIcon} />
      <SidebarButton letter="L" shortcode="L" tab="Layouts" img={LayoutsIcon} />
      <SidebarButton letter="B" tab="Rich Text" img={BlocksIcon} />
      <SidebarButton letter="V" tab="Versions" img={VersionsIcon} />
    </div>
  ) : (
    <></>
  )
}
