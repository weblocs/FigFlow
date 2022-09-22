import { useSelector, useDispatch } from "react-redux";

import Arrow from '../../../../img/arrow-down.svg';
import {setHoveredHtmlNode, setActiveHtmlNode, setDraggedNavigatorNodes, setDraggedOverNavigatorItemId, dropDraggedNavigatorNodes, setNavigatorItemDragBehindState, toggleHtmlNodeExpandedState, makeSymbolEditable} from "../../../../features/project"

 function NavigationNodeItem ({parents, node, depth}) {
    const dispatch = useDispatch()

    const projectSymbols = useSelector((state) => state.project.projectSymbols)
    const draggedNavigatorNodes = useSelector((state) => state.project.draggedNavigatorNodes)
    const draggedOverNodeId = useSelector((state) => state.project.draggedOverNodeId)
    const editedSymbolId = useSelector((state) => state.project.editedSymbolId)
    const navigatorItemDragBehindState = useSelector((state) => (state.project.navigatorItemDragBehindState) ? true : false)

    const nodeName = (node?.symbolId === undefined) ? 
    ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : 
    (projectSymbols.find( ({id}) => id === node.symbolId)?.name );

    function handleClick () {
        dispatch(setActiveHtmlNode({id: node.id}));
        scrollProjectTo(node.id);
    }

    function handleDragStart () {
        dispatch(setDraggedNavigatorNodes(node.id));
    }

    function handleDragOver () {
        event.preventDefault();
        let id = node.id;
        let parentIsNotDraggedNode = true;
        parents.forEach((parent) => {
            if(parent.id === draggedNavigatorNodes.id) {
                parentIsNotDraggedNode = false;
            }
        })
        
        if(node.id !== draggedNavigatorNodes.id && parentIsNotDraggedNode) {
            if (event.clientY - document.querySelector(`[nodeid="${node.id}"]`).offsetTop < 10 ) {
                if(!navigatorItemDragBehindState) {
                    dispatch(setNavigatorItemDragBehindState(true));
                }
            } else {
                if(navigatorItemDragBehindState) {
                    dispatch(setNavigatorItemDragBehindState(false));
                }
            }
            if(id !== draggedOverNodeId) {
                dispatch(setDraggedOverNavigatorItemId(id));
            }
        } else {
            if ( draggedOverNodeId !== "" ) { 
                dispatch(setDraggedOverNavigatorItemId(""));
            }
        }
        
    }

    function handleDrop () {
        dispatch(dropDraggedNavigatorNodes());
    }

    function handleArrowClick() {
        if(node.children.length > 0) {
            dispatch(toggleHtmlNodeExpandedState(node.id));
        }
    }

    function scrollProjectTo(id) {
        const actualNodePosition = document.querySelector(`[el_id="${id}"]`)?.getBoundingClientRect().top;
        if(actualNodePosition < 0 || actualNodePosition > window.screen.height - 200) {
            const actualViewportPosition = document.getElementById("project-view").scrollTop;
            const scrollMargin = 100;
            document.getElementById("project-view").scrollTo({
                top: actualViewportPosition + actualNodePosition - scrollMargin,
                behavior: "smooth"
            });
        }
    }

    const paddingLeft = {paddingLeft: depth*8 + "px"};

    // console.log("item rend");

    return ( 
        <div className={"navigation-node " + ((navigatorItemDragBehindState) ? "dragged-before " : "") 
        + ((node.id === draggedOverNodeId) ? "dragged-over " : " ") 
        // + ((node.id == activeNodeId) ? "active " : " ") 
        }
            style={paddingLeft}
            onMouseOver={() => dispatch(setHoveredHtmlNode(node.id))}
            onMouseOut={() => dispatch(setHoveredHtmlNode(""))}
            onClick={handleClick}
            // onDoubleClick={() => handleDoubleClick(node.id)} // openSymbol here
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            nodeid={node.id}
            nodename={nodeName}
            nodetype={node.type}
            nodecmscollectionid={node?.cmsCollectionId}
        >
            <div 
            onDoubleClick={() => (node.type === "sym" && editedSymbolId.symbolId === "") && dispatch(makeSymbolEditable({symbolId:node.symbolId, elementId: node.id}))}
            className={"navigation-node-inside" + ((node.type === "sym") ? " symbol-nav-item" : "") + ((depth >= 0) ? " lined" : "") + ((depth === 0) ? " white" : "")}
            >
                {(node.children.length > 0) && (
                    <img src={Arrow} 
                    className={"node-folder-arrow" + ((node?.expanded) ? " expanded" : "")} 
                    onClick={handleArrowClick}/>
                )}
                <span>{node.type}</span>{nodeName}
            </div>
        </div>
    )
}

export default NavigationNodeItem;
 