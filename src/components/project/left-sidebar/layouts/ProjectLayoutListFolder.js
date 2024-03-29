import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editLayout, editLayoutFolder, deleteLayoutFolder, deleteLayout, setActiveLayout, duplicateLayout }  from "../../../../features/project"
import CreateLayoutButton from "./CreateLayoutButton"
import ListItemEditIcon from "../_atoms/ListItemEditIcon"

import PasteIcon from "../../../../img/paste.svg"

export default function ProjectLayoutListFolder({folder}) {
    const activeLayoutId = useSelector((state) => state.project.activeLayoutId)
    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState(false);

    function handleClickInSymbolItem(id, folderId) {
        dispatch(setActiveLayout({id:id, folderId: folderId}));
    }

    return (
        <div key={folder.id} 
                className="edit-icon_wrap-folder">
                    <div
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                    className={"sections-nav-folder-item"}
                    key={folder.id}>
                        {folder.name}

                        <ListItemEditIcon 
                        text="Edit Layout Folder"
                        itemType="layout folder"
                        element={folder}
                        editFx={editLayoutFolder} 
                        deleteFx={deleteLayoutFolder} 
                        folderItem={true}
                        active={isHovered}
                        isDeleteButtonVisible={true} />

                        <CreateLayoutButton visibility={isHovered} id={folder.id} />

                    </div>

                    

                    {folder.items.map((section) => {
                        return (
                        <div style={{position:"relative"}}
                        key={section.id}
                        className="edit-icon_wrapper"
                        >
                            <div 
                            className={"projectPageItem" + ((activeLayoutId === section.id) ? " active" : "" )} 
                            onClick={() => handleClickInSymbolItem(section.id, folder.id)}>
                                {section.name} 
                            </div>

                        <img 
                        className={"layout-duplicate-icon"} 
                        onClick={() => dispatch(duplicateLayout({id: section.id}))}
                        src={PasteIcon} />

                        <ListItemEditIcon 
                            text="Edit Layout"
                            itemType="layout"
                            element={section}
                            editFx={editLayout} 
                            deleteFx={deleteLayout} 
                            active={false}
                            isDeleteButtonVisible={true} />
                        </div>
                    )})}
                </div>
    )
}