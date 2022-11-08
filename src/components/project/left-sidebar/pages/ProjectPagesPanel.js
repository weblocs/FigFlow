import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import {setActiveCollectionTemplate, setActivePage, setPages, addPage, addPageFolder} from "../../../../features/project"
import {arrayMoveImmutable} from 'array-move'
import PanelTabTitle from "../_atoms/PanelTabTitle";
import PageListFolder from "./PageListFolder";
import CollectionPageListItem from "./CollectionPageListItem";

export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectPages = useSelector((state) => state.project.projectPages)
    const collections = useSelector((state) => state.project.collections)
    const activePageId = useSelector((state) => state.project.activePageId)
    const activeTab = useSelector((state) => state.project.activeTab)
    const projectPageFolderStructure = useSelector((state) => state.project.projectPageFolderStructure) 

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

    
    
    return(
        <div className={"projectPagesPanel "+ ((activeTab === "Pages") ? "active" : "" )}>

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
                <PageListFolder node={node} parents={[]} key={node.id} />
            ))}

            </div>
            <PanelTabTitle text="Collection pages" />

            {collections.map((collection) => (
                <CollectionPageListItem key={collection.id} collection={collection} />
            ))}
        </div>
    )
}