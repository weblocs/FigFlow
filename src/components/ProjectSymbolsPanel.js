import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {editSelectedFieldInPreRenderedHTMLNode, setActiveNodeObject, addSymbolToPreRenderedHTMLNodesAfterActiveNode} from "../features/pre-rendered-html-nodes"
import CreateNewSymbol from "./CreateNewSymbol";


export default function ProjectPagesPanel(){
    const dispatch = useDispatch()
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)


    function handleClickInSymbolItem(symbolId) {
        dispatch(addSymbolToPreRenderedHTMLNodesAfterActiveNode({id: symbolId}));
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Symbols") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">Symbols</div>

            <CreateNewSymbol />

            <div className="pagesList">

            {projectSymbols.map((symbol) => (
                <div onClick={() => handleClickInSymbolItem(symbol.id)} className={"projectPageItem " + ((activePageId === symbol.id) ? "active" : "") } key={symbol.id}>
                    {symbol.name}
                </div>
            ))}
            </div>
        </div>
    )
}