import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectSidebarButton from "./ProjectSidebarButton";
import CreateNewRichTextElements from "./CreateNewRichTextElements"
import {setActivePageIdAndIndex, setRichTextElements} from "../features/pre-rendered-html-nodes"
import DragKnob from '../img/drag.svg';

import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort'
import {arrayMoveImmutable} from 'array-move'

export default function ProjectRichTextPanel(){
    const dispatch = useDispatch()
    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const onSortEnd = (oldIndex: number, newIndex: number) => {
        dispatch(setRichTextElements(arrayMoveImmutable(projectRichTextElements, oldIndex, newIndex)));
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Rich Text") ? "active" : "" )}>
            <div className="projectTabTitleBox">Rich Text Elements</div>

            <CreateNewRichTextElements />

            <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="drag" style={{borderTop: "1px #d3d3d3 solid"}}>
            {projectRichTextElements.map((item) => (
                <SortableItem key={item.id}>
                <div className="projectPageItem">
                    <span>{item.name}</span>
                <SortableKnob>
                <img src={DragKnob} style={{width: "10px", position: "absolute",right: "8px", top: "7px", cursor: "grab"}}/>
                </SortableKnob>
                </div>
                </SortableItem>
            ))}
            </SortableList>

            {/* <div className="pagesList">
                {projectRichTextElements.map((element) => {
                    return(
                    <div onClick={() => dispatch(setActivePageIdAndIndex(element.id))} className="projectPageItem" key={element.id}>
                        {element.name}
                        <div className={"delete-section-item"}>x</div>
                    </div>
                )})}
            </div> */}
        </div>
    )
}