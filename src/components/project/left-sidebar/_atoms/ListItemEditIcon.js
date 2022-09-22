import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setKeyboardNavigationOn } from "../../../../features/project";
import EditImg from '../../../../img/edit.svg';
import ConfirmDeleteModalButton from "../../modals/ConfirmDeleteModalButton"

export default function ListItemEditIcon({element, editFx, deleteFx, active, isDeleteButtonVisible, text, itemType, folderItem}) {
    const dispatch = useDispatch()

    const [isEditorOpened, setIsEditorOpened] = useState(false);
    const blockNameRef = useRef();

    function handleEditIconClick () {
        setIsEditorOpened(true);
        blockNameRef.current.focus();
        blockNameRef.current.value = element.name;
    }

    function handleSubmit(id) {
        event.preventDefault();
        dispatch(editFx({id: id, property: 'name', value: blockNameRef.current.value}));
        setIsEditorOpened(false);
    }

    function handleDelete(id) {
        dispatch(deleteFx({id:id}));
        setIsEditorOpened(false);
    }

    useEffect(() => {
        dispatch(setKeyboardNavigationOn(!isEditorOpened))
    },[isEditorOpened]);

    return (
        <div>
            <img className={"block-item_edit" + (active ? " active" : "") + (folderItem ? " folder-item" : "")} src={EditImg}
            onClick={() => handleEditIconClick(element)} />
            <div className={"confirm-popup_close-bg block-toolox-bg" + (isEditorOpened ? " active" : "")} onClick={() => setIsEditorOpened(false)}></div>
            <form 
            onSubmit={() => handleSubmit(element.id)}
            className={"edit-block_toolbox" + (isEditorOpened ? " active" : "")}>
                <div className="edit-block_toolbox-text">{text}</div>
                <input className="edit-node-input" ref={blockNameRef} />
                <div className="projectTabTitleButtonsBox">
                    {isDeleteButtonVisible &&
                    <ConfirmDeleteModalButton 
                    handleOnClick={() => handleDelete(element.id)} 
                    deleteItemName={element.name}
                    deleteItemType={itemType} 
                    redButton={true} />
                    }
                    <div className="settings-button white-button" onClick={() => setIsEditorOpened(false)}>Cancel</div>
                    <button className="settings-button blue-button">Save</button>
                </div>
            </form>
        </div>
    )
}