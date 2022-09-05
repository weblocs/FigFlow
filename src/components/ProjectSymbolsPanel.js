import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {editSymbol, deleteSymbol, addSymbolToPreRenderedHTMLNodesAfterActiveNode, transformNodeIntoSymbol, setProjectSymbols} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";
import ListItemEditIcon from "./ListItemEditIcon";
import {arrayMoveImmutable} from 'array-move'

export default function ProjectSymbolsPanel(){
    const dispatch = useDispatch()
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleClickInSymbolItem(symbolId) {
        dispatch(addSymbolToPreRenderedHTMLNodesAfterActiveNode({id: symbolId}));
    }


    const [draggedStartIndex, setDraggedStartIndex] = useState(-1);
    const [draggedOverIndex, setDraggedOverIndex] = useState(-1);

    const onSortEnd = (oldIndex, newIndex) => {
        if(newIndex > oldIndex) {
            newIndex--;
        }
        dispatch(setProjectSymbols(arrayMoveImmutable(projectSymbols, oldIndex, newIndex)));
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
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Symbols") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">
                Symbols
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreateInputVisible(!createInputVisible)}>N</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createInputVisible} 
            create={transformNodeIntoSymbol} 
            placeholder="New symbol" />

            <div className="pagesList">

            {projectSymbols.map((symbol, index) => {
                return (
                    <div key={symbol.id}
                    draggable="true"
                    onDragStart={() => setDraggedStartIndex(index)}
                    onDragOver={() => handleDragOver(index,symbol.id)}
                    onDrop={handleDrop}
                    className="edit-icon_wrapper"
                    richid={symbol.id}>
                        <div style={{position: "relative"}}>
                            <div onClick={() => handleClickInSymbolItem(symbol.id)} 
                            className={"projectPageItem block-item " + ((draggedOverIndex === index) ? "draggedOver" : "") + (((draggedOverIndex === index + 1) && (index === projectSymbols.length - 1)) ? "draggedOverBottom" : "")}>
                                {symbol.name}
                            </div>

                            <ListItemEditIcon 
                            text="Edit Symbol"
                            itemType="symbol"
                            element={symbol} 
                            editFx={editSymbol} 
                            deleteFx={deleteSymbol} 
                            isDeleteButtonVisible={false}
                            active={false} />
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}