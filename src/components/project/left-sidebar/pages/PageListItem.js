import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { moveDraggedPaged, setActivePage, setDraggedPage, setDragOverPage, openPageSettings, togglePageFolderExpandState } from "../../../../features/project";
import Arrow from '../../../../img/arrow-down.svg';
import SettingIcon from '../../../../img/setting.svg';

export default function PageList({node,parents}) {
    const dragOverPage = useSelector((state) => state.project.dragOverPage)
    const activePageId = useSelector((state) => state.project.activePageId)
    const projectPages = useSelector((state) => state.project.projectPages)
    const openedSettingsPage = useSelector((state) => state.project.openedSettingsPage)
    
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

    function handleSettingsClick(node) {
        if (openedSettingsPage?.id !== node.id ) {
            dispatch(openPageSettings(node));
        } else {
            dispatch(openPageSettings({}));
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
            onClick={() => handleSettingsClick(node)}/>

        </div>
    )
}