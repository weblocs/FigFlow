import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCollection from "./AddCollection";
import {setCollectionPanelState, addCollection, setActiveCollection} from "../../../../features/pre-rendered-html-nodes"
import CreateNewItemInput from "../navigator/CreateNewItemInput";


export default function ProjectCollectionsPanel(){
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.designerProjectState.collections)
    const activeCollectionId = useSelector((state) => state.designerProjectState.activeCollectionId)
    const collectionPanelState = useSelector((state) => state.designerProjectState.collectionPanelState)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleItemClick(collection) {
        dispatch(setActiveCollection(collection));
        dispatch(setCollectionPanelState("items"));
    }
    
    // if(collectionPanelState === "collections") {
    return(
        <div className={"collectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>

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
                onClick={() => handleItemClick(collection)} 
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