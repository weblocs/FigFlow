import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import {setActiveCollectionTemplate, setActivePage, setPages, addPage, addPageFolder} from "../../../../features/pre-rendered-html-nodes"
import {arrayMoveImmutable} from 'array-move'
import SettingIcon from '../../../../img/setting.svg';
import PanelTabTitle from "../_atoms/PanelTabTitle";
import PageListFolder from "./PageListFolder";

export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const collections = useSelector((state) => state.designerProjectState.collections)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeCollectionTemplateId = useSelector((state) => state.designerProjectState.activeCollectionTemplateId)
    const projectPageFolderStructure = useSelector((state) => state.designerProjectState.projectPageFolderStructure) 

    const onSortEnd = (oldIndex, newIndex) => {
        if(newIndex > oldIndex) {
            newIndex--;
        }
        dispatch(setPages(arrayMoveImmutable(projectPages, oldIndex, newIndex)));
    }

    const [draggedStartIndex, setDraggedStartIndex] = useState(-1);
    const [draggedOverIndex, setDraggedOverIndex] = useState(-1);

    const [createPageInputVisible, setCreatePageInputVisible] = useState(false);
    const [createFolderInputVisible, setCreateFolderInputVisible] = useState(false);

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
        dispatch(setActiveCollectionTemplate(id));
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Pages") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Pages
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreatePageInputVisible(!createPageInputVisible)}>P</button>
                    <button onClick={() => setCreateFolderInputVisible(!createFolderInputVisible)}>F</button>
                </div>
            </div>
            
            <CreateNewItemInput 
            visibility={createPageInputVisible} 
            create={addPage} 
            placeholder="New page" />

            <CreateNewItemInput 
            visibility={createFolderInputVisible} 
            create={addPageFolder} 
            placeholder="New folder" />
            
            <div className="pagesList">

            <PanelTabTitle text="Static pages" />

            {projectPageFolderStructure.map((node,index) => (
                <PageListFolder node={node} parents={[]} key={index} />
            ))}

            </div>
            <PanelTabTitle text="Collection pages" />
            {collections.map((collection,index) => (
                <div key={index} style={{position: "relative"}}>
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