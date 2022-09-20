import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setActiveCollectionItem, addCollectionItem, setCollectionPanelState} from "../../../../features/pre-rendered-html-nodes"
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import Arrow from '../../../../img/arrow-left.svg';

export default function ProjectCollectionsItemsPanel(){
    
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const collectionPanelState = useSelector((state) => state.designerProjectState.collectionPanelState)
    const activeCollection = useSelector((state) => state.designerProjectState.activeCollection)
    const activeCollectionItemId = useSelector((state) => state.designerProjectState.activeCollectionItemId)

    const dispatch = useDispatch()

    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleItemClick(item) {
        dispatch(setActiveCollectionItem(item));
        dispatch(setCollectionPanelState("fields"));
    }
    
    if(collectionPanelState === "items" || collectionPanelState === "fields") {
    return (
        <div className={"collectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">
                <div>
                <span 
                className="panel_back-button"
                onClick={() => dispatch(setCollectionPanelState("collections"))}>
                    <img src={Arrow} />
                </span>
                {activeCollection?.name} Items
                </div>
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible}
            create={addCollectionItem} 
            placeholder="New item" />

            <div className="pagesList">
            {activeCollection?.items.map((item) => (
                <div 
                onClick={() => handleItemClick(item)} 
                className={"projectPageItem " + ((activeCollectionItemId === item.id) ? "active" : "") } 
                key={item.id}>
                    {item.name}
                </div>
            ))}
            </div>

        </div>
    )
    }
}