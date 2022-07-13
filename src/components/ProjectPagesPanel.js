import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectSidebarButton from "./ProjectSidebarButton";
import CreateNewPageInProject from "./CreateNewPageInProject"
import {setActivePageIdAndIndex} from "../features/pre-rendered-html-nodes"


export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Pages") ? "active" : "" )}>
            <div className="projectTabTitleBox">Pages</div>

            <CreateNewPageInProject />

            <div className="pagesList">
            {projectPages.map((page,index) => (
                <div key={page.pageId} onClick={() => dispatch(setActivePageIdAndIndex(page.pageId))} className={"projectPageItem " + ((activePageId === page.pageId) ? "active" : "") }>
                    {page.pageName}
                </div>
            ))}
            </div>
        </div>
    )
}