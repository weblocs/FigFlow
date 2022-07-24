import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectSidebarButton from "./ProjectSidebarButton";
import CreateNewPageInProject from "./CreateNewPageInProject"
import {setActiveCmsTemplate, setActiveCollectionTemplateId, setActivePageIdAndIndex, setNodesEditMode, setProjectPages} from "../features/pre-rendered-html-nodes"
import {arrayMoveImmutable} from 'array-move'
import SettingIcon from '../img/setting.svg';
import PanelTabTitle from "./PanelTabTitle";

export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeCollectionTemplateId = useSelector((state) => state.designerProjectState.activeCollectionTemplateId) 

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

    function handleCollectionItemClick (id) {
        dispatch(setActiveCmsTemplate(id));
    }

    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Pages") ? "active" : "" )}>
            <div className="projectTabTitleBox">Pages</div>

            <PanelTabTitle text="Pages" />
            <CreateNewPageInProject />
            
            <div className="pagesList">
            {projectPages.map((page,index) => (
                <div key={page.pageId} style={{position: "relative"}}>
                    <div 
                    draggable="true"
                    onDragStart={() => setDraggedStartIndex(index)}
                    onDragOver={() => handleDragOver(index,page.pageId)}
                    onDrop={handleDrop}
                    pageid={page.pageId}
                    onClick={() => dispatch(setActivePageIdAndIndex(page.pageId))} 
                    className={"projectPageItem " + ((activePageId === page.pageId) ? "active " : "") + ((draggedOverIndex === index) ? "draggedOver " : "") + (((draggedOverIndex === index + 1) && (index === projectPages.length - 1)) ? "draggedOverBottom " : "") }>
                        {page.pageName}
                    </div>
                    <img src={SettingIcon} style={{width: "10px", position: "absolute",right: "8px", top: "7px", cursor: "pointer"}}/>
                </div>
            ))}
            </div>
            <PanelTabTitle text="Collection pages" />
            {projectCollections.map((collection,index) => (
                <div key={collection.id} style={{position: "relative"}}>
                    <div 
                    onClick={() => handleCollectionItemClick(collection.id)} 
                    className={"projectPageItem " + ((activeCollectionTemplateId === collection.id) ? "active " : "")}>
                        {collection.name} Template
                    </div>
                    <img src={SettingIcon} style={{width: "10px", position: "absolute",right: "8px", top: "7px", cursor: "pointer"}}/>
                </div>
            ))}
        </div>
    )
}