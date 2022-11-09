import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {editCollectionItem, setCollectionPanelState, setKeyboardNavigationOn} from "../../../../features/project"
import AddCollectionField from "./AddCollectionField";
import FileUploaderToCollectionField from "./FileUploaderToCollectionField";
import Arrow from '../../../../img/arrow-left.svg';
import { activeCollectionItemSelector, activeCollectionSelector } from "../../../../selectors/active-collection";
import CollectionFieldInput from "./CollectionFieldInput";


export default function ProjectCollectionsFieldsPanel(){
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.project.activeTab)
    const collectionPanelState = useSelector((state) => state.project.collectionPanelState)
    const activeCollectionItem =  useSelector((state) =>  activeCollectionItemSelector(state));
    
    if(collectionPanelState === "fields") {
    return(
        <div className={"collectionsPanel "+ ((activeTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">
                <div>
                <span 
                className="panel_back-button"
                onClick={() => dispatch(setCollectionPanelState("items"))}>
                    <img src={Arrow} />
                </span>
                {activeCollectionItem?.name}
                </div>
            </div>

            <div className="pagesList">

            <CollectionFieldInput />
            
            
            </div>

        </div>
    )
    }
}