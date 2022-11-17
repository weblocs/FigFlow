import { useDispatch, useSelector } from 'react-redux'
import { copyLayoutHtmlNodes, pasteLayoutHtmlNodes, setProjectPopUp } from '../../../features/project';
import RenderedNode from '../rendered-view/RenderedNode'

export default function SectionModalItem({section}) {
    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const dispatch = useDispatch()

    function handleNodeClick() {

    }

    function handleAddSectionClick(nodes) {
        if(nodes?.type === "sec") {
            dispatch(setProjectPopUp(""));
            dispatch(copyLayoutHtmlNodes(nodes));
            setTimeout(() => {
                dispatch(pasteLayoutHtmlNodes());
            }, 300);
        }
    }

    return (
        <div className="present-section-in-popup-wrap">
            <div className="present-section-in-popup">
                <RenderedNode
                data={section.preRenderedHTMLNodes}
                cmsCollectionId={section.preRenderedHTMLNodes.cmsCollectionId}
                cmsFieldId={section.preRenderedHTMLNodes.cmsFieldId}
                type={section.preRenderedHTMLNodes.type}
                id={section.preRenderedHTMLNodes.id}
                key={section.preRenderedHTMLNodes.id}
                title={section.preRenderedHTMLNodes.title}
                children={section.preRenderedHTMLNodes.children}
                class={section.preRenderedHTMLNodes.class}
                onClick={handleNodeClick}
                />
                <div className="present-section-in-popup_add-section"  onClick={() => handleAddSectionClick(section.preRenderedHTMLNodes)}>
                    <div className="present-section-in-popup_add-section-button">
                        Add Layout
                    </div>
                </div>
            </div>
            
        </div>
    )
}