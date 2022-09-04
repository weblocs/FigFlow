import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createNewSymbol, addSymbolToPreRenderedHTMLNodesAfterActiveNode, transformNodeIntoSymbol} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";
import EditImg from '../img/edit.svg';

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
                const [isHovered, setIsHovered] = useState(false)
                return (
                    <div key={symbol.id}
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}>
                        <div style={{position: "relative"}}>
                            <div onClick={() => handleClickInSymbolItem(symbol.id)} 
                            className="projectPageItem">
                                {(!editingIsOn) ? 
                                symbol.name :
                                <input defaultValue={symbol.name} />
                                }
                            </div>
                            <img className={"block-item_edit " + (isHovered ? " active" : "")} src={EditImg} />
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}