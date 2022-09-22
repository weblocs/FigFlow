import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setActiveCollectionItem, addCollectionItem, setCollectionPanelState} from "../../../../features/project"
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import Arrow from '../../../../img/arrow-left.svg';
import { activeCollectionSelector } from "../../../../selectors/active-collection";

export default function ProjectCollectionsItemsPanel(){
    
    const activeTab = useSelector((state) => state.project.activeTab)
    const collectionPanelState = useSelector((state) => state.project.collectionPanelState)
    const activeCollection =  useSelector((state) =>  activeCollectionSelector(state));
    const activeCollectionItemId = useSelector((state) => state.project.activeCollectionItemId)

    const dispatch = useDispatch()

    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleItemClick(id) {
        dispatch(setActiveCollectionItem(id));
        dispatch(setCollectionPanelState("fields"));
    }
    
    if(collectionPanelState === "items" || collectionPanelState === "fields") {
    return (
        <div className={"collectionsPanel "+ ((activeTab === "Collections") ? "active" : "" )}>
            
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
                onClick={() => handleItemClick(item.id)} 
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