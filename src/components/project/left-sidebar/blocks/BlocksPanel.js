import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlocks, addBlockFolder } from "../../../../features/project";
import {arrayMoveImmutable} from 'array-move';
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import BlockListItem from "./BlockListItem";
import AddButton from "../_atoms/AddButton";
import BlockFolder from "./BlockFolder";

export default function BlocksPanel(){
    const dispatch = useDispatch()
    const blocks = useSelector((state) => state.project.blocks)
    const activeTab = useSelector((state) => state.project.activeTab)

    const onSortEnd = (oldIndex, newIndex) => {
        if(newIndex > oldIndex) {
            newIndex--;
        }
        dispatch(setBlocks(arrayMoveImmutable(blocks, oldIndex, newIndex)));
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
                    <AddButton fx={() => setCreateInputVisible(!createInputVisible)} />
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible} 
            create={addBlockFolder} 
            placeholder="New block folder" />

            <div className="pagesList">

                {blocks?.map((folder) => (
                    <div key={folder.id}>
                        <BlockFolder folder={folder} />
                        {folder.blocks?.map((element,index) => (
                            <BlockListItem 
                            key={element.id}
                            element={element} 
                            index={index} 
                            folderId={folder.id}
                            setDraggedStartIndex={setDraggedStartIndex}
                            handleDragOver={handleDragOver}
                            handleDrop={handleDrop}
                            draggedOverIndex={draggedOverIndex} />
                        ))}
                    </div>
                ))}
                 
            </div>
        </div>
    )
}