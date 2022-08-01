import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createNewSymbol, addSymbolToPreRenderedHTMLNodesAfterActiveNode, transformNodeIntoSymbol} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";

export default function ProjectSymbolsPanel(){
    const dispatch = useDispatch()
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const [createInputVisible, setCreateInputVisible] = useState(false);

    function handleClickInSymbolItem(symbolId) {
        dispatch(addSymbolToPreRenderedHTMLNodesAfterActiveNode({id: symbolId}));
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

            {projectSymbols.map((symbol) => {
                const [editingIsOn, setEditingIsOn] = useState(false);
                return (
                    <div style={{position: "relative"}} key={symbol.id}>
                    <div onClick={() => handleClickInSymbolItem(symbol.id)} className="projectPageItem">
                        {(!editingIsOn) ? 
                        symbol.name :
                        <input defaultValue={symbol.name} />
                        }
                    </div>
                    <div className={"delete-section-item edit-icon"} onClick={() => setEditingIsOn(!editingIsOn)}>e</div>
                    <div className={"delete-section-item"}>x</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}