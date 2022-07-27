import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setActiveCollectionItemIdAndIndex, createNewCollectionItems, setActiveCollectionIdAndIndex, setCollectionPanelState} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";


export default function ProjectCollectionsItemsPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionItemId = useSelector((state) => state.designerProjectState.activeProjectCollectionItemId)
    const activeProjectCollectionIndex = useSelector((state) => state.designerProjectState.activeProjectCollectionIndex)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const collectionPanelState = useSelector((state) => state.designerProjectState.collectionPanelState)
    let activeCollection = projectCollections[activeProjectCollectionIndex];

    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleItemClick(id) {
        dispatch(setActiveCollectionItemIdAndIndex(id));
        dispatch(setCollectionPanelState("fields"));
    }
    
    if(collectionPanelState === "items") {
    return (
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">
                <div>
                <span 
                className="panel_back-button"
                onClick={() => dispatch(setCollectionPanelState("collections"))}>B</span>
                {activeCollection?.name} Items
                </div>
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible}
            create={createNewCollectionItems} 
            placeholder="New item" />

            <div className="pagesList">
            {activeCollection?.items.map((item) => (
                <div 
                onClick={() => handleItemClick(item.id)} 
                className={"projectPageItem " + ((activeProjectCollectionItemId === item.id) ? "active" : "") } 
                key={item.id}>
                    {item.name}
                </div>
            ))}
            </div>

        </div>
    )
    }
}