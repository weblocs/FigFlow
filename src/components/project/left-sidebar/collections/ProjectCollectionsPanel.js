import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCollection from "./AddCollection";
import {setCollectionPanelState, addCollection, setActiveCollection} from "../../../../features/project"
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import AddButton from "../_atoms/AddButton";
import CollectionListItem from "./CollectionListItem";


export default function ProjectCollectionsPanel(){
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.project.collections)
    const activeCollectionId = useSelector((state) => state.project.activeCollectionId)
    const collectionPanelState = useSelector((state) => state.project.collectionPanelState)
    const activeTab = useSelector((state) => state.project.activeTab)
    const [createInputVisible, setCreateInputVisible] = useState(false);

    
    
    // if(collectionPanelState === "collections") {
    return(
        <div className={"collectionsPanel "+ ((activeTab === "Collections") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Collections
                <div className="projectTabTitleButtonsBox">
                    <AddButton fx={() => setCreateInputVisible(!createInputVisible)} />
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible}
            create={addCollection} 
            placeholder="New colection" />

            <div className="pagesList">
            {collections.map((collection) => (
                <CollectionListItem key={collection.id} id={collection.id} name={collection.name} />
            ))}
            </div>
        </div>
    )
    // }
}