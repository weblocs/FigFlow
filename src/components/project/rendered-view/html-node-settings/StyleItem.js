import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearStyleOption, setActiveStyleId, setStyleOptionInActiveNode } from "../../../../features/pre-rendered-html-nodes";


export default function RichElementSettingsStyle({child, index}) {

    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)

    const dispatch = useDispatch()

    const [isListOpened, setIsListOpened] = useState(false);

    let childId = child.options[0].id;
    let childName = child.options[0].name;
    let isStyleSet = false;

    if (stylesInActiveNode.length > index + 1) {
        if(stylesInActiveNode[index+1]?.id !== undefined && stylesInActiveNode[index+1]?.id !== "") {
            childId = stylesInActiveNode[index+1]?.id;
            childName = stylesInActiveNode[index+1]?.name;
            isStyleSet = true;
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

    if (child.isOnlyForMobile === true && activeProjectResolution !== "4") {

    } else if (child.isOnlyForTablet  === true && activeProjectResolution !== "2") {
        
    } else {
    return (
        <div className={"rich-element-settings_button active" + (isStyleSet ? "" : " styleIsNotSet")} >
            <div className={"unit-chooser_closer" + ((isListOpened) ? " active" : "")}
                onClick={() => setIsListOpened(false)}></div>

            <div className="rich-element-settings_button-text" onClick={() => setIsListOpened(!isListOpened)}>
                {isStyleSet ? childName : (child.defaultName || childName)}
            </div>
            <div className={"rich-element-settings_options_list" + ((isListOpened) ? " active" : "")}>
                {child.options.map((option) => 
                        <div key={option.id} onClick={() => handleStyleOptionClick(option.id, option.name)} 
                        className={"rich-element-settings_options-item" + ((childName === option.name) ? " active" : "")}>
                            {option.name}
                        </div>
                )}
                <div onClick={() => handleClearClick(index)} 
                    className="rich-element-settings_options-item">
                        clear/remove
                </div>
            </div>
        </div>
    )
    }
}