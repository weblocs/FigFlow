import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {editCollectionItem, setCollectionPanelState, setKeyboardNavigationOn} from "../../../../features/pre-rendered-html-nodes"
import AddCollectionField from "./AddCollectionField";
import FileUploaderToCollectionField from "./FileUploaderToCollectionField";
import Arrow from '../../../../img/arrow-left.svg';


export default function ProjectCollectionsFieldsPanel(){
    const dispatch = useDispatch()
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const collectionPanelState = useSelector((state) => state.designerProjectState.collectionPanelState)
    const activeCollection = useSelector((state) => state.designerProjectState.activeCollection)
    const activeCollectionId = useSelector((state) => state.designerProjectState.activeCollectionId)
    const activeCollectionItem =  useSelector((state) => state.designerProjectState.activeCollectionItem)
    const activeCollectionItemData = useSelector((state) => state.designerProjectState.activeCollectionItem?.data)
    
    const [editedCollectionItemData,setEditedCollectionItemData] = useState([]);

    function handleEditCollectionItem() {
        dispatch(editCollectionItem(editedCollectionItemData));
        setEditedCollectionItemData([]);
    }

    function handleInputChange(fieldId, fieldValue, type) {
        let fieldValueExist = false;
        let editedCollectionItemFieldIndex = editedCollectionItemData.map(x => {
            if(x.fieldId === fieldId) {
                fieldValueExist = true;
            }
            return x.fieldId;
        }).indexOf(fieldId);

        if(fieldValueExist){
            let tempEditedCollectionItemData = [...editedCollectionItemData];
            tempEditedCollectionItemData[editedCollectionItemFieldIndex].fieldValue = fieldValue;
            setEditedCollectionItemData(tempEditedCollectionItemData);
        } else {
            setEditedCollectionItemData(editedCollectionItemData => [...editedCollectionItemData, {fieldId: fieldId, fieldValue: fieldValue}])
        }
    }

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }
    
    if(collectionPanelState === "fields") {
    return(
        <div className={"collectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
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

            <AddCollectionField />

            <div className="pagesList">
            {activeCollection?.fields.map((field) => (
                <div key={field.id}>
                    {(field.type === "text") &&
                        <div 
                        className={"projectPageItem " + ((activeCollectionId === field.id) ? "active" : "") } 
                        >
                            {field.name} : {(activeCollectionItemData?.find(({ fieldId }) => fieldId === field.id)?.fieldValue) ? (activeCollectionItemData.find(({ fieldId }) => fieldId === field.id)?.fieldValue) : ""}
                            <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => handleInputChange(field.id, e.target.value, "text")} />
                        </div>
                    } 
                    {(field.type === "img") &&
                        <div 
                        className={"projectPageItem " + ((activeCollectionId === field.id) ? "active" : "") } >

                            <div>
                                {field.name}
                            </div>
                            <img className="libraryImage" src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+activeCollectionItemData.find(({ fieldId }) => fieldId === field.id)?.fieldValue+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
                            <FileUploaderToCollectionField handleInputChange={(fieldValue) => handleInputChange(field.id, fieldValue, "img")} />
                        </div>
                    }

                    
                </div>
            ))}

            <button onClick={handleEditCollectionItem}>Save</button>
            </div>

        </div>
    )
    }
}