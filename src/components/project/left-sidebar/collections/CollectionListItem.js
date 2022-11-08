import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCollection, setActiveSettingsCollectionId, setCollectionPanelState } from '../../../../features/project';
import SettingIcon from "../../../../img/setting.svg"

export default function CollectionListItem({id, name}) {
    const activeCollectionId = useSelector((state) => state.project.activeCollectionId)
    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState(false);

    function handleItemClick() {
        dispatch(setActiveCollection(id));
        dispatch(setCollectionPanelState("items"));
    }

    function handleSettingsClick() {
        dispatch(setActiveSettingsCollectionId(id));
    }

    return (
        <div
        style={{position: 'relative'}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div 
        onClick={handleItemClick}
        className={"projectPageItem " + ((activeCollectionId === id) ? "active" : "") }>
            {name}
        </div>
        <img src={SettingIcon} 
        className={"page-item_settings-icon" + ((isHovered) ? " active" : "")} 
        onClick={handleSettingsClick}
        />
        </div>
    )
}