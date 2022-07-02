import React from "react";
import ProjectSidebarButton from "./ProjectSidebarButton";

export default function ProjectSidebar(){

    return(
        <div className="projectSidebar">
           <ProjectSidebarButton letter="N" shortcode="Z" tab="Navigator" />
           <ProjectSidebarButton letter="P" shortcode="P" tab="Pages" />
           <ProjectSidebarButton letter="C" tab="Collections" />
           <ProjectSidebarButton letter="I" tab="Images" />
           <ProjectSidebarButton letter="Sy" tab="Symbols" />
           <ProjectSidebarButton letter="Se" shortcode="S" tab="Sections" />
        </div>
    )
}