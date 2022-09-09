import React from "react";
import { useSelector } from "react-redux";
import ProjectSidebarButton from "./ProjectSidebarButton";

import AddIcon from '../img/add.svg';
import PageIcon from '../img/page.svg';
import DatabaseIcon from '../img/database.svg';
import ImageIcon from '../img/image.svg';
import SymbolIcon from '../img/components.svg';
import LayoutsIcon from '../img/layout.svg';
import BlocksIcon from '../img/components-2.svg';
import VersionsIcon from '../img/capacitor.svg';


export default function ProjectSidebar(){
    const projectMode = useSelector((state) => state.designerProjectState.projectMode);
    return(
        (projectMode === "developer") ?
        <div className="projectSidebar">
           {/* <ProjectSidebarButton letter="A" shortcode="A" tab="Add" /> */}
           <ProjectSidebarButton letter="N" shortcode="Z" tab="Navigator" img={AddIcon} />
           <ProjectSidebarButton letter="P" shortcode="P"  tab="Pages" img={PageIcon} />
           <ProjectSidebarButton letter="C" tab="Collections" img={DatabaseIcon} />
           <ProjectSidebarButton letter="I" tab="Images" img={ImageIcon} />
           <ProjectSidebarButton letter="S" shortcode="S" tab="Symbols" img={SymbolIcon} />
           <ProjectSidebarButton letter="L"  shortcode="L" tab="Layouts" img={LayoutsIcon} />
           <ProjectSidebarButton letter="B" tab="Rich Text" img={BlocksIcon} />
           <ProjectSidebarButton letter="V" tab="Versions" img={VersionsIcon} />
        </div> :
        <></>
    )
}