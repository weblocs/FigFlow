import { useDispatch, useSelector } from "react-redux"
import { moveDraggedPaged, setActivePageIdAndIndex, setDraggedPage, setDragOverPage, toggleFolderExpandedState } from "../features/pre-rendered-html-nodes";
import Arrow from '../img/arrow-down.svg';

export default function PageList({node,parents}) {
    const dragOverPage = useSelector((state) => state.designerProjectState.dragOverPage)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const dispatch = useDispatch()

    function handleDragStart (node) {
        dispatch(setDraggedPage(node));
    }

    function handleDragOver (node) {
        event.preventDefault();

        if(dragOverPage !== node) {
            dispatch(setDragOverPage(node));
        }
    }

    function handleDrop () {
        dispatch(moveDraggedPaged());
    }

    function handleOnClick(node) {
        if (!node?.children) {
            dispatch(setActivePageIdAndIndex(node.id));
        } else {
            dispatch(toggleFolderExpandedState(node.id));
        }
    }

    return (
        <div className={"projectPageItem"
        // + ((draggedBefore) ? " dragged-before " : "") 
        + ((node === dragOverPage) ? " draggedOverBottom " : " ")
        + ((node.id == activePageId) ? "active " : " ") 
        }
        draggable={(node.id !== projectPages[0].id)}
        onDragStart={() => handleDragStart(node)}
        onDragOver={() => handleDragOver(node)}
        onDrop={handleDrop}
        onClick={() => handleOnClick(node)} 
        nodeid={node.id}
        style={{paddingLeft: (parents.length*16 + 16) + "px", display: "flex"}}>
            {(node.children) && (
                <span><img src={Arrow} className={"page-item-arrow" + ((node?.expanded) ? " expanded" : "")} style={{width:"9px", marginTop: "5px", marginRight: "6px"}} /></span>
            )}
            {node.name}
        </div>
    )
}