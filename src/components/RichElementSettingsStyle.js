import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearStyleOption, setActiveStyleId, setStyleOptionInActiveNode } from "../features/pre-rendered-html-nodes";


export default function RichElementSettingsStyle({child, index}) {

    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const dispatch = useDispatch()

    const [isListOpened, setIsListOpened] = useState(false);

    let childId = child.options[0].id;
    let childName = child.options[0].name;
    let isStyleSet = " styleIsNotSet";

    if (stylesInActiveNode.length > index + 1) {
        if(stylesInActiveNode[index+1]?.id !== undefined && stylesInActiveNode[index+1]?.id !== "") {
            childId = stylesInActiveNode[index+1]?.id;
            childName = stylesInActiveNode[index+1]?.name;
            isStyleSet = "";
        }
    }

    function handleStyleOptionClick(id,name) {
        dispatch(setStyleOptionInActiveNode({index: index, id: id, name: name}));
        dispatch(setActiveStyleId(id));
        setIsListOpened(false);
    }

    function handleClearClick (index) {
        dispatch(clearStyleOption({optionIndex: index}));
        setIsListOpened(false);
    }

    return (
        <div className={"rich-element-settings_button active" + isStyleSet} >
            <div className="rich-element-settings_button-text" onClick={() => setIsListOpened(!isListOpened)}>{childName}</div>
            <div className={"rich-element-settings_options_list" + ((isListOpened) ? " active" : "")}>
                {child.options.map((option) => (
                    <div key={option.id} onClick={() => handleStyleOptionClick(option.id, option.name)} 
                    className={"rich-element-settings_options-item" + ((childName === option.name) ? " active" : "")}>
                        {option.name}
                    </div>
                ))}
                <div onClick={() => handleClearClick(index)} 
                    className="rich-element-settings_options-item">
                        clear/remove
                </div>
            </div>
        </div>
    )
}