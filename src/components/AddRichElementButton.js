import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSectionToPreRenderedHTMLNodes, setCopiedSectionNodes, setProjectPopUp } from "../features/pre-rendered-html-nodes";

export default function AddRichElementButton({addRichSetting}) {
    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
    const dispatch = useDispatch()

    const [listIsOpened, setListIsOpened] = useState(false);

    function handleAddSectionClick(sectionNodes) {
        dispatch(setCopiedSectionNodes(sectionNodes));
        dispatch(addSectionToPreRenderedHTMLNodes());
        setListIsOpened(false)
    }

    return (
        <div>
            <div className={"unit-chooser_closer" + ((listIsOpened) ? " active" : "")}
                onClick={() => setListIsOpened(false)}>
            </div>


            <div className={"rich-element-settings_button button-centered" + ((addRichSetting) ? " active" : "")}
            onClick={() => setListIsOpened(true)}>
                +
            </div>
            <div className={"heading-element-settings_list" + ((listIsOpened) ? " active" : "")}>
                {projectRichTextElements.map((item) => (
                    <div className="rich-element-settings_button button-centered text-button active" key={item.id}
                    onClick={() => handleAddSectionClick(item.preRenderedHTMLNodes)}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}