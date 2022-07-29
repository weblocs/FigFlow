import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {editActiveCollectionItemData, setCollectionPanelState, setKeyboardNavigationOn} from "../features/pre-rendered-html-nodes"
import CreateNewCollectionField from "./CreateNewCollectionField"
import FileUploaderToCollectionField from "./FileUploaderToCollectionField";
import Arrow from '../img/arrow-left.svg';


export default function ProjectCollectionsFieldsPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionId = useSelector((state) => state.designerProjectState.activeProjectCollectionId)
    const activeProjectCollectionIndex = useSelector((state) => state.designerProjectState.activeProjectCollectionIndex)
    const activeProjectCollectionItemIndex = useSelector((state) => state.designerProjectState.activeProjectCollectionItemIndex)
    const collectionPanelState = useSelector((state) => state.designerProjectState.collectionPanelState)

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
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">
                <div>
                <span 
                className="panel_back-button"
                onClick={() => dispatch(setCollectionPanelState("items"))}>
                    <img src={Arrow} />
                </span>
                {activeItem?.name}
                </div>
            </div>

            <CreateNewCollectionField />

            <div className="pagesList">
            {activeCollection?.fields.map((field) => (
                <div key={field.id}>
                    {(field.type === "text") &&
                        <div 
                        className={"projectPageItem " + ((activeProjectCollectionId === field.id) ? "active" : "") } 
                        >
                            {field.name} : {(storedEditedCollectionItemData?.find(({ fieldId }) => fieldId === field.id)?.fieldValue) ? (storedEditedCollectionItemData.find(({ fieldId }) => fieldId === field.id)?.fieldValue) : ""}
                            <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => handleInputChange(field.id, e.target.value, "text")} />
                        </div>
                    } 
                    {(field.type === "img") &&
                        <div 
                        className={"projectPageItem " + ((activeProjectCollectionId === field.id) ? "active" : "") } >

                            <div>
                                {field.name}
                            </div>
                            <img className="libraryImage" src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+storedEditedCollectionItemData.find(({ fieldId }) => fieldId === field.id)?.fieldValue+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
                            <FileUploaderToCollectionField handleInputChange={(fieldValue) => handleInputChange(field.id, fieldValue, "img")} />
                        </div>
                    }

                    
                </div>
            ))}

            <button onClick={handleEditActiveCollectionItemData}>Save</button>
            </div>

        </div>
    )
    }
}