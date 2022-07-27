import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewCollection from "./CreateNewCollection"
import {setCollectionPanelState, createNewCollection, setActiveCollectionIdAndIndex} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";


export default function ProjectCollectionsPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionId = useSelector((state) => state.designerProjectState.activeProjectCollectionId)
    const collectionPanelState = useSelector((state) => state.designerProjectState.collectionPanelState)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleItemClick(id) {
        dispatch(setActiveCollectionIdAndIndex(id));
        dispatch(setCollectionPanelState("items"));
    }
    
    if(collectionPanelState === "collections") {
    return(
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Collections
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible}
            create={createNewCollection} 
            placeholder="New colection" />

            <div className="pagesList">
            {projectCollections.map((collection) => (
                <div 
                onClick={() => handleItemClick(collection.id)} 
                className={"projectPageItem " + ((activeProjectCollectionId === collection.id) ? "active" : "") } 
                key={collection.id}>
                    {collection.name}
                </div>
            ))}
            </div>
        </div>
    )
    }
}