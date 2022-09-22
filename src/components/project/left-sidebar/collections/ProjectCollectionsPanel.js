import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCollection from "./AddCollection";
import {setCollectionPanelState, addCollection, setActiveCollection} from "../../../../features/project"
import CreateNewItemInput from "../navigator/CreateNewItemInput";


export default function ProjectCollectionsPanel(){
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.project.collections)
    const activeCollectionId = useSelector((state) => state.project.activeCollectionId)
    const collectionPanelState = useSelector((state) => state.project.collectionPanelState)
    const activeTab = useSelector((state) => state.project.activeTab)
    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleItemClick(id) {
        dispatch(setActiveCollection(id));
        dispatch(setCollectionPanelState("items"));
    }
    
    // if(collectionPanelState === "collections") {
    return(
        <div className={"collectionsPanel "+ ((activeTab === "Collections") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Collections
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible}
            create={addCollection} 
            placeholder="New colection" />

            <div className="pagesList">
            {collections.map((collection) => (
                <div 
                onClick={() => handleItemClick(collection.id)} 
                className={"projectPageItem " + ((activeCollectionId === collection.id) ? "active" : "") } 
                key={collection.id}>
                    {collection.name}
                </div>
            ))}
            </div>
        </div>
    )
    // }
}