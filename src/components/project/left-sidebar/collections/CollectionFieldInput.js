import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editCollectionItem, setKeyboardNavigationOn } from '../../../../features/project';
import { activeCollectionItemSelector, activeCollectionSelector } from '../../../../selectors/active-collection';
import FileUploaderToCollectionField from './FileUploaderToCollectionField'

export default function CollectionFieldInput({field}) {
    const activeCollectionId = useSelector((state) => state.project.activeCollectionId)
    const activeCollection =  useSelector((state) =>  activeCollectionSelector(state));
    const activeCollectionItem =  useSelector((state) =>  activeCollectionItemSelector(state));

    const dispatch = useDispatch()

    const [editedCollectionItemData,setEditedCollectionItemData] = useState([]);

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

    function handleEditCollectionItem() {
        dispatch(editCollectionItem(editedCollectionItemData));
        setEditedCollectionItemData([]);
    }

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    return (
    <div>
        {activeCollection?.fields.map((field) => (
            <div key={field.id}>
                {(field.type === "text") &&
                    <div 
                    className={"projectPageItem " + ((activeCollectionId === field.id) ? "active" : "") } 
                    >
                        {field.name}
                        <input
                        defaultValue={(activeCollectionItem?.data?.find(({ fieldId }) => fieldId === field.id)?.fieldValue) ? (activeCollectionItem?.data.find(({ fieldId }) => fieldId === field.id)?.fieldValue) : ""}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="cms-field-input" 
                        onChange={(e) => handleInputChange(field.id, e.target.value, "text")} />
                    </div>
                } 
                {(field.type === "img") &&
                    <div 
                    className={"projectPageItem " + ((activeCollectionId === field.id) ? "active" : "") } >
                        <div>
                            {field.name}
                        </div>
                        <img className="libraryImage" src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+activeCollectionItem?.data.find(({ fieldId }) => fieldId === field.id)?.fieldValue+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
                        <FileUploaderToCollectionField handleInputChange={(fieldValue) => handleInputChange(field.id, fieldValue, "img")} />
                    </div>
                }
            </div>
        ))}
        <div className="page-settings-wrapper">
            <button className="settings-button blue-button" onClick={handleEditCollectionItem}>Save</button>
        </div>
    </div>
    )
}