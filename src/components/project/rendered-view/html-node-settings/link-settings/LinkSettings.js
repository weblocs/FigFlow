import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setActiveHtmlNodeLink, setActivePage } from '../../../../../features/project';
import SettingsIcon from '../../../../../img/settings.svg';
import OpenLinkIcon from '../../../../../img/open-link.svg';
import ModalBackgroundCloser from '../../../_atoms/ModalBackgroundCloser';

function LinkSettings() {
    const activeNodeType = useSelector((state) => state.project.activeNodeObject?.type)
    const activeNodeLink = useSelector((state) => state.project.activeNodeObject?.link)
    const projectPages = useSelector((state) => state.project.projectPages)
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false);

    function handleLinkClick(e) {
        e.stopPropagation();
        dispatch(setActivePage(activeNodeLink));
        setIsOpen(false);
    }

    if (activeNodeType === "l" || activeNodeType === "a") {
    return (
        <>
            {projectPages?.find(({id}) => id === activeNodeLink) &&
                <div className="rich-element-settings_button button-centered active"
                onClick={handleLinkClick}>
                <img src={OpenLinkIcon} style={{width: "14px"}} />
                </div>
            }
            <div className="rich-element-settings_button button-centered active"
            onClick={() => setIsOpen(true)}>
                <img src={SettingsIcon} style={{width: "14px"}} />
            </div>  

            <ModalBackgroundCloser 
            handleClick={() => setIsOpen(false)} 
            isActiveIf={isOpen} />

            {isOpen &&
            <div className='link-settings-modal'>

                <div onClick={handleLinkClick}>
                    Link to: {projectPages?.find(({id}) => id === activeNodeLink)?.name}
                </div>

                {projectPages.map((page) => (
                    <div 
                    onClick={() => dispatch(setActiveHtmlNodeLink({link:page.id, linkType: "page"}))} 
                    key={page.id}>
                        {page.name}
                    </div>
                ))}
            </div>
            }
        </>
    )
    }
}

export default LinkSettings