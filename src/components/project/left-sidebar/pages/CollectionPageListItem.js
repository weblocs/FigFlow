import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openPageSettings, setActiveCollectionTemplate } from '../../../../features/project';
import SettingIcon from '../../../../img/setting.svg';

export default function CollectionPageListItem({collection}) {
    const activeCollectionTemplateId = useSelector((state) => state.project.activeCollectionTemplateId)
    const openedSettingsPage = useSelector((state) => state.project.openedSettingsPage)
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()

    function handleCollectionItemClick (id) {
        dispatch(setActiveCollectionTemplate(id));
    }

    function handleSettingsClick(collection) {
        if (openedSettingsPage?.id !== collection.id ) {
            dispatch(openPageSettings(collection));
        } else {
            dispatch(openPageSettings({}));
        }
    }

    return (
        <div key={collection.id} style={{position: "relative"}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            <div 
            onClick={() => handleCollectionItemClick(collection.id)} 
            className={"projectPageItem " + ((activeCollectionTemplateId === collection.id) ? "active " : "")}>
                {collection.name} Template
            </div>
            <img src={SettingIcon} 
                className={"page-item_settings-icon" + ((isHovered) ? " active" : "")} 
                onClick={() => handleSettingsClick(collection)}
                />
        </div>
    )
}