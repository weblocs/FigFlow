import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteRichElement, editRichElement, setKeyboardNavigationOn } from "../features/pre-rendered-html-nodes";
import EditImg from '../img/edit.svg';

export default function RichElementListItem({element, index, setDraggedStartIndex, handleDragOver, handleDrop, draggedOverIndex}) {
    
    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
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
        dispatch(editRichElement({id: id, property: 'name', value: blockNameRef.current.value}));
        setIsEditorOpened(false);
    }

    function handleDelete(id) {
        dispatch(deleteRichElement({id:id}));
        setIsEditorOpened(false);
    }

    useEffect(() => {
        dispatch(setKeyboardNavigationOn(!isEditorOpened))
    },[isEditorOpened]);

    return(
        <div 
        draggable="true"
        onDragStart={() => setDraggedStartIndex(index)}
        onDragOver={() => handleDragOver(index,element.id)}
        onDrop={handleDrop}
        richid={element.id}
        className={"projectPageItem block-item " + ((draggedOverIndex === index) ? "draggedOver" : "") + (((draggedOverIndex === index + 1) && (index === projectRichTextElements.length - 1)) ? "draggedOverBottom" : "") } key={element.id}>
            {element.name}

            <img className="block-item_edit" src={EditImg}
            onClick={() => handleEditIconClick(element)} />
            <div className={"confirm-popup_close-bg block-toolox-bg" + (isEditorOpened ? " active" : "")} onClick={() => setIsEditorOpened(false)}></div>
            <form 
            onSubmit={() => handleSubmit(element.id)}
            className={"edit-block_toolbox" + (isEditorOpened ? " active" : "")}>
                <div className="edit-block_toolbox-text">Edit Block</div>
                <input className="edit-node-input" ref={blockNameRef} />
                <div className="projectTabTitleButtonsBox">
                    <div className="settings-button delete-button" onClick={() => handleDelete(element.id)}>Delete</div>
                    <div className="settings-button white-button" onClick={() => setIsEditorOpened(false)}>Cancel</div>
                    <button className="settings-button blue-button">Save</button>
                </div>
            </form>

        </div>
    )
}