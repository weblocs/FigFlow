import { useState } from 'react';
import CreateBlockButton from './CreateBlockButton';
import { editBlockFolder, deleteBlockFolder }  from "../../../../features/project"
import ListItemEditIcon from '../_atoms/ListItemEditIcon';


export default function BlockFolder({folder}) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="sections-nav-folder-item"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}>
            {folder.name}

            <ListItemEditIcon 
                text="Edit Block"
                itemType="block folder"
                element={folder}
                editFx={editBlockFolder} 
                deleteFx={deleteBlockFolder} 
                active={isHovered}
                isDeleteButtonVisible={true} />

            <CreateBlockButton visibility={isHovered} id={folder.id} />
        </div>
    )
}