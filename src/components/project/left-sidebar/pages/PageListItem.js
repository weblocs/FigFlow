import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { moveDraggedPaged, setActivePage, setDraggedPage, setDragOverPage, openPageSettings, togglePageFolderExpandState } from "../../../../features/pre-rendered-html-nodes";
import Arrow from '../../../../img/arrow-down.svg';
import SettingIcon from '../../../../img/setting.svg';

export default function PageList({node,parents}) {
    const dragOverPage = useSelector((state) => state.designerProjectState.dragOverPage)
    const activePageId = useSelector((state) => state.designerProjectState.activePageId)
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const openedSettingsPage = useSelector((state) => state.designerProjectState.openedSettingsPage)
    
    const dispatch = useDispatch()

    const [itemHovered, setItemHovered] = useState(false);

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
            dispatch(setActivePage(node.id));
        } else {
            dispatch(togglePageFolderExpandState(node.id));
        }
    }

    return (
        <div className="item-wrapper"
        onMouseEnter={() => setItemHovered(true)}
        onMouseLeave={() => setItemHovered(false)}>
            <div className={"projectPageItem"
            // + ((navigatorItemDragBehindState) ? " dragged-before " : "") 
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

            <img src={SettingIcon} 
            className={"page-item_settings-icon" + ((itemHovered) ? " active" : "")} 
            onClick={() => dispatch(openPageSettings(node))}/>

        </div>
    )
}