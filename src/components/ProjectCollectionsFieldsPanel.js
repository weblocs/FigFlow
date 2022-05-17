import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {editActiveCollectionItemData} from "../features/pre-rendered-html-nodes"
import CreateNewCollectionField from "./CreateNewCollectionField"


export default function ProjectCollectionsFieldsPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionId = useSelector((state) => state.designerProjectState.activeProjectCollectionId)
    const activeProjectCollectionIndex = useSelector((state) => state.designerProjectState.activeProjectCollectionIndex)
    const activeProjectCollectionItemIndex = useSelector((state) => state.designerProjectState.activeProjectCollectionItemIndex)

    const storedEditedCollectionItemData = useSelector((state) => state.designerProjectState.projectCollections[activeProjectCollectionIndex]?.items[activeProjectCollectionItemIndex]?.data)
    
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    let activeCollection = useSelector((state) => state.designerProjectState.projectCollections[activeProjectCollectionIndex])
    let activeItem =  useSelector((state) => state.designerProjectState.projectCollections[activeProjectCollectionIndex]?.items[activeProjectCollectionItemIndex])
    let activeItemData =  useSelector((state) => state.designerProjectState.projectCollections[activeProjectCollectionIndex]?.items[activeProjectCollectionItemIndex]?.data)

    const [editedCollectionItemData,setEditedCollectionItemData] = useState([]);

    function handleEditActiveCollectionItemData() {
        dispatch(editActiveCollectionItemData(editedCollectionItemData));
        setEditedCollectionItemData([]);
    }

    function handleInputChange(fieldId, fieldValue) {
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
            setEditedCollectionItemData([...editedCollectionItemData, {fieldId: fieldId, fieldValue: fieldValue}])
        }
    }
    
    
    return(
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">{activeItem?.name}</div>
            <CreateNewCollectionField />

            <div className="pagesList">
            {activeCollection?.fields.map((field) => (
                <div 
                // onClick={() => dispatch(setActiveCollectionIdAndIndex(field.id))} 
                className={"projectPageItem " + ((activeProjectCollectionId === field.id) ? "active" : "") } 
                key={field.id}>
                    {field.name} : {(storedEditedCollectionItemData?.find(({ fieldId }) => fieldId === field.id)?.fieldValue) ? (storedEditedCollectionItemData.find(({ fieldId }) => fieldId === field.id)?.fieldValue) : ""}
                    <input onChange={(e) => handleInputChange(field.id, e.target.value)} />
                </div>
                
            ))}

            <button onClick={handleEditActiveCollectionItemData}>Save</button>
            </div>

        </div>
    )
}