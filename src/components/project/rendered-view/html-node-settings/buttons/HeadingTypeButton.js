import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editHtmlNode } from "../../../../../features/project"

export default function HeadingTypeButton() {
    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const nodeType = useSelector((state) => state.project.activeNodeObject?.type)
    const nodeSubType = useSelector((state) => state.project.activeNodeObject?.subtype)
    const dispatch = useDispatch()

    const [isListOpen, setIsListOpen] = useState(false);

    function handleOptionClick(subtype) {
        setIsListOpen(false);
        dispatch(editHtmlNode({ id: activeNodeId, field: "subtype", value: subtype }));
    }

    if (nodeType === "h") {
    return (
        <div>
            <div className="rich-element-settings_button settings-label button-centered text-button active" 
            onClick={() => setIsListOpen(isListOpen => !isListOpen)}>SEO {nodeSubType}</div>
            
            <div className={"heading-element-settings_list" + ((isListOpen) ? " active" : "")}>
                <div
                    className={"rich-element-settings_button button-centered text-button active" + 
                    ((nodeSubType === "h1") ? " sub-type-active" : "")}
                    onClick={() => handleOptionClick("h1")}>
                    SEO H1
                </div>
                <div
                    className={"rich-element-settings_button button-centered text-button active" + 
                    ((nodeSubType === "h2") ? " sub-type-active" : "")}
                    onClick={() => handleOptionClick("h2")}>
                    SEO H2
                </div>
                <div
                    className={"rich-element-settings_button button-centered text-button active" + 
                    ((nodeSubType === "h3") ? " sub-type-active" : "")}
                    onClick={() => handleOptionClick("h3")}>
                    SEO H3
                </div>
                <div
                    className={"rich-element-settings_button button-centered text-button active" + 
                    ((nodeSubType === "h4") ? " sub-type-active" : "")}
                    onClick={() => handleOptionClick("h4")}>
                    SEO H4
                </div>
                <div
                    className={"rich-element-settings_button button-centered text-button active" + 
                    ((nodeSubType === "h5") ? " sub-type-active" : "")}
                    onClick={() => handleOptionClick("h5")}>
                    SEO H5
                </div>
                <div
                    className={"rich-element-settings_button button-centered text-button active" + 
                    ((nodeSubType === "h6") ? " sub-type-active" : "")}
                    onClick={() => handleOptionClick("h6")}>
                    SEO H6
                </div>
            </div>
        </div>
    )
    }
}