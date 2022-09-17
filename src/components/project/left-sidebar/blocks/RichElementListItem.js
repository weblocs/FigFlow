import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteRichElement, editRichElement, setKeyboardNavigationOn } from "../../../../features/pre-rendered-html-nodes";

import ListItemEditIcon from "../_atoms/ListItemEditIcon";

export default function RichElementListItem({element, index, setDraggedStartIndex, handleDragOver, handleDrop, draggedOverIndex}) {
    
    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
    const dispatch = useDispatch()

    

    return(
        <div 
        draggable="true"
        onDragStart={() => setDraggedStartIndex(index)}
        onDragOver={() => handleDragOver(index,element.id)}
        onDrop={handleDrop}
        richid={element.id}
        className={"projectPageItem block-item " + ((draggedOverIndex === index) ? "draggedOver" : "") + (((draggedOverIndex === index + 1) && (index === projectRichTextElements.length - 1)) ? "draggedOverBottom" : "") } key={element.id}>
            {element.name}

            <ListItemEditIcon 
            text="Edit Block"
            itemType="block"
            element={element}
            editFx={editRichElement} 
            deleteFx={deleteRichElement} 
            active={false}
            isDeleteButtonVisible={true} />

        </div>
    )
}