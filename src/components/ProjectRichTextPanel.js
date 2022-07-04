import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectSidebarButton from "./ProjectSidebarButton";
import CreateNewRichTextElements from "./CreateNewRichTextElements"
import {setActivePageIdAndIndex} from "../features/pre-rendered-html-nodes"


export default function ProjectRichTextPanel(){
    const dispatch = useDispatch()
    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Rich Text") ? "active" : "" )}>
            <div className="projectTabTitleBox">Rich Text Elements</div>

            <CreateNewRichTextElements />

            <div className="pagesList">
                {projectRichTextElements.map((element) => (
                    <div onClick={() => dispatch(setActivePageIdAndIndex(element.id))} className="projectPageItem" key={element.id}>
                        {element.name}
                    </div>
                ))}
            </div>
        </div>
    )
}