import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pasteLayoutHtmlNodes, copyLayoutHtmlNodes, setProjectPopUp } from "../../../../../features/project";
import ModalBackgroundCloser from "../../../_atoms/ModalBackgroundCloser";

export default function AddBlockButton({addRichSetting}) {
    const projectRichTextElements = useSelector((state) => state.project.projectRichTextElements)
    const dispatch = useDispatch()

    const [listIsOpened, setListIsOpened] = useState(false);

    function handleAddSectionClick(sectionNodes) {
        dispatch(copyLayoutHtmlNodes(sectionNodes));
        dispatch(pasteLayoutHtmlNodes());
        setListIsOpened(false)
    }

    return (
        <div>
            <ModalBackgroundCloser 
            handleClick={() => setListIsOpened(false)} 
            isActiveIf={listIsOpened} />

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