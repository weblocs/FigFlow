import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewPageInProject from "./CreateNewPageInProject"
import {setActiveCmsTemplate, setActivePageIdAndIndex, setProjectPages} from "../features/pre-rendered-html-nodes"
import {arrayMoveImmutable} from 'array-move'
import SettingIcon from '../img/setting.svg';
import PanelTabTitle from "./PanelTabTitle";
import PageListFolder from "./PageListFolder";

export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeCollectionTemplateId = useSelector((state) => state.designerProjectState.activeCollectionTemplateId)
    const projectPageFolderStructure = useSelector((state) => state.designerProjectState.projectPageFolderStructure) 

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

            <div className="projectTabTitleBox">
                Pages
                <div className="projectTabTitleButtonsBox">
                <button>P</button>
                <button>F</button>
                </div>
            </div>
            <CreateNewPageInProject />
            
            <div className="pagesList">

            <PanelTabTitle text="Static pages" />

            {projectPageFolderStructure.map((node) => (
                <PageListFolder node={node} parents={[]} key={node.id} />
            ))}


            {/* <PanelTabTitle text="Pages" />
            {projectPages.map((page,index) => (
                <div key={page.id} style={{position: "relative"}}>
                    <div 
                    draggable="true"
                    onDragStart={() => setDraggedStartIndex(index)}
                    onDragOver={() => handleDragOver(index,page.id)}
                    onDrop={handleDrop}
                    pageid={page.id}
                    onClick={() => dispatch(setActivePageIdAndIndex(page.id))} 
                    className={"projectPageItem " + ((activePageId === page.id) ? "active " : "") + ((draggedOverIndex === index) ? "draggedOver " : "") + (((draggedOverIndex === index + 1) && (index === projectPages.length - 1)) ? "draggedOverBottom " : "") }>
                        {page.name}
                    </div>
                    <img src={SettingIcon} style={{width: "10px", position: "absolute",right: "8px", top: "7px", cursor: "pointer"}}/>
                </div>
            ))} */}
            </div>
            <PanelTabTitle text="Collection pages" />
            {projectCollections.map((collection,index) => (
                <div key={collection.id} style={{position: "relative"}}>
                    <div 
                    onClick={() => handleCollectionItemClick(collection.id)} 
                    className={"projectPageItem " + ((activeCollectionTemplateId === collection.id) ? "active " : "")}>
                        {collection.name} Template
                    </div>
                    <img src={SettingIcon} className="page-item_settings-icon" />
                </div>
            ))}
        </div>
    )
}