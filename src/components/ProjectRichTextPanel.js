import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewRichTextElements from "./CreateNewRichTextElements"
import { setRichTextElements, createNewRichTextElement, addSymbolToPreRenderedHTMLNodesAfterActiveNode} from "../features/pre-rendered-html-nodes"
import DragKnob from '../img/drag.svg';
import {arrayMoveImmutable} from 'array-move'
import CreateNewItemInput from "./CreateNewItemInput";

export default function ProjectRichTextPanel(){
    const dispatch = useDispatch()
    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const onSortEnd = (oldIndex, newIndex) => {
        if(newIndex > oldIndex) {
            newIndex--;
        }
        dispatch(setRichTextElements(arrayMoveImmutable(projectRichTextElements, oldIndex, newIndex)));
    }

    const [draggedStartIndex, setDraggedStartIndex] = useState(-1);
    const [draggedOverIndex, setDraggedOverIndex] = useState(-1);

    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleClickInSymbolItem(symbolId) {
        dispatch(addSymbolToPreRenderedHTMLNodesAfterActiveNode({id: symbolId}));
    }

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
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Rich Text") ? "active" : "" )}>
            <div className="projectTabTitleBox">
                Rich Elements
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible} 
            create={createNewRichTextElement} 
            placeholder="New element" />

            <div className="pagesList">
                {projectRichTextElements.map((element,index) => {
                    return(
                    <div 
                    draggable="true"
                    onDragStart={() => setDraggedStartIndex(index)}
                    onDragOver={() => handleDragOver(index,element.id)}
                    onDrop={handleDrop}
                    richid={element.id}
                    className={"projectPageItem " + ((draggedOverIndex === index) ? "draggedOver" : "") + (((draggedOverIndex === index + 1) && (index === projectRichTextElements.length - 1)) ? "draggedOverBottom" : "") } key={element.id}>
                        {element.name}
                        {/* <img src={DragKnob} style={{width: "10px", position: "absolute",right: "8px", top: "7px", cursor: "grab"}}/> */}
                        {/* <div className={"delete-section-item"}>x</div> */}
                    </div>
                )})}
            </div>
        </div>
    )
}