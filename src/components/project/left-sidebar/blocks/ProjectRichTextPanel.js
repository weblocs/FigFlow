import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlocks, addBlock } from "../../../../features/project";
import {arrayMoveImmutable} from 'array-move';
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import RichElementListItem from "./RichElementListItem";

export default function ProjectRichTextPanel(){
    const dispatch = useDispatch()
    const projectRichTextElements = useSelector((state) => state.project.projectRichTextElements)
    const activeTab = useSelector((state) => state.project.activeTab)

    const onSortEnd = (oldIndex, newIndex) => {
        if(newIndex > oldIndex) {
            newIndex--;
        }
        dispatch(setBlocks(arrayMoveImmutable(projectRichTextElements, oldIndex, newIndex)));
    }

    const [draggedStartIndex, setDraggedStartIndex] = useState(-1);
    const [draggedOverIndex, setDraggedOverIndex] = useState(-1);
    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleDragOver(index,id) {
        event.preventDefault();
        if (event.clientY - document.querySelector(`[richid="${id}"]`).offsetTop > 20 ) {
            setDraggedOverIndex(index + 1);
        } else {
            setDraggedOverIndex(index);
        }
    }

    function handleDrop() {
        onSortEnd(draggedStartIndex, draggedOverIndex)
        setDraggedStartIndex(-1);
        setDraggedOverIndex(-1);
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeTab === "Rich Text") ? "active" : "" )}>
            <div className="projectTabTitleBox">
                Blocks
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible} 
            create={addBlock} 
            placeholder="New element" />

            <div className="pagesList">
                {projectRichTextElements.map((element,index) => (
                    <RichElementListItem 
                    key={element.id}
                    element={element} 
                    index={index} 
                    setDraggedStartIndex={setDraggedStartIndex}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    draggedOverIndex={draggedOverIndex} />
                ))}
            </div>
        </div>
    )
}