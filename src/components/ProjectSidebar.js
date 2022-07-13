import React from "react";
import ProjectSidebarButton from "./ProjectSidebarButton";

export default function ProjectSidebar(){

    return(
        <div className="projectSidebar">
           <ProjectSidebarButton letter="A" shortcode="A" tab="Add" />
           <ProjectSidebarButton letter="N" shortcode="Z" tab="Navigator" />
           <ProjectSidebarButton letter="P" shortcode="P"  tab="Pages" />
           <ProjectSidebarButton letter="C" tab="Collections" />
           <ProjectSidebarButton letter="I" tab="Images" />
           <ProjectSidebarButton letter="S" tab="Symbols" />
           <ProjectSidebarButton letter="L"  shortcode="L" tab="Layouts" />
           <ProjectSidebarButton letter="R" tab="Rich Text" />
        </div>
    )
}