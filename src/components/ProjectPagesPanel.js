import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectSidebarButton from "./ProjectSidebarButton";
import CreateNewPageInProject from "./CreateNewPageInProject"
import {setActivePageIdAndIndex, setProjectPages} from "../features/pre-rendered-html-nodes"
import {arrayMoveImmutable} from 'array-move'

export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const onSortEnd = (oldIndex, newIndex) => {
        if(newIndex > oldIndex) {
            newIndex--;
        }
        dispatch(setProjectPages(arrayMoveImmutable(projectPages, oldIndex, newIndex)));
    }

    const [draggedStartIndex, setDraggedStartIndex] = useState(-1);
    const [draggedOverIndex, setDraggedOverIndex] = useState(-1);

    function handleDragOver(index,id) {
        event.preventDefault();
        if (event.clientY - document.querySelector(`[pageid="${id}"]`).offsetTop > 20 ) {
            setDraggedOverIndex(index + 1);
        } else {
            setDraggedOverIndex(index);
        }
    }

    function handleDrop() {
        onSortEnd(draggedStartIndex, draggedOverIndex)
        setDraggedStartIndex(-1);
        setDraggedOverIndex(-1);
    }

    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Pages") ? "active" : "" )}>
            <div className="projectTabTitleBox">Pages</div>

            <CreateNewPageInProject />

            <div className="pagesList">
            {projectPages.map((page,index) => (
                <div 
                draggable="true"
                onDragStart={() => setDraggedStartIndex(index)}
                onDragOver={() => handleDragOver(index,page.pageId)}
                onDrop={handleDrop}
                pageid={page.pageId}
                key={page.pageId} 
                onClick={() => dispatch(setActivePageIdAndIndex(page.pageId))} 
                className={"projectPageItem " + ((activePageId === page.pageId) ? "active " : "") + ((draggedOverIndex === index) ? "draggedOver " : "") + (((draggedOverIndex === index + 1) && (index === projectPages.length - 1)) ? "draggedOverBottom " : "") }>
                    {page.pageName}
                </div>
            ))}
            </div>
        </div>
    )
}