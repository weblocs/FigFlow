import React from "react";
import ProjectSidebarButton from "./ProjectSidebarButton";

export default function ProjectSidebar(){
    return(
        <div className="projectSidebar">
           <ProjectSidebarButton letter="N" tab="Navigator" />
           <ProjectSidebarButton letter="P" tab="Pages" />
           <ProjectSidebarButton letter="C" tab="Collections" />
        </div>
    )
}