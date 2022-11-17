import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project';
import ImageItemSettings from './ImageItemSettings';

export default function ImageItem({image}) {
    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState(false);

    function setImageToActiveNode(imageName) {
        dispatch(editHtmlNode({id: activeNodeId, field: 'src', value: imageName}))
    }

    function handleSettingsClick(e) {
        
    }

    return (
        <div
        style={{position: "relative"}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>     
            <div onClick={() => setImageToActiveNode(image.name)}>
                <img className="libraryImage" src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+image.name+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
            </div>
            <ImageItemSettings id={image.id} isHovered={isHovered} />
        
       </div>
    )
}