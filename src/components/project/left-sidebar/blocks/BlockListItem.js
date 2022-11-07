import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteBlock, editBlock, setActiveBlock, setKeyboardNavigationOn } from "../../../../features/project";

import ListItemEditIcon from "../_atoms/ListItemEditIcon";

export default function BlockListItem({element, index, setDraggedStartIndex, handleDragOver, handleDrop, draggedOverIndex, folderId}) {
    
    const blocks = useSelector((state) => state.project.blocks)
    const activeBlockId = useSelector((state) => state.project.activeBlockId)
    const dispatch = useDispatch()

    return(
        <div 
        // draggable="true"
        onDragStart={() => setDraggedStartIndex(index)}
        onDragOver={() => handleDragOver(index,element.id)}
        onDrop={handleDrop}
        onClick={() => dispatch(setActiveBlock({id: element.id, folderId: folderId}))}
        richid={element.id}
        className={"projectPageItem edit-icon_wrapper " + ((activeBlockId === element.id) ? "active" : "") + ((draggedOverIndex === index) ? "draggedOver" : "") + (((draggedOverIndex === index + 1) && (index === blocks.length - 1)) ? "draggedOverBottom" : "") } key={element.id}>
            {element.name}

            <ListItemEditIcon 
            text="Edit Block"
            itemType="block"
            element={element}
            editFx={editBlock} 
            deleteFx={deleteBlock} 
            active={false}
            isDeleteButtonVisible={true} />

        </div>
    )
}