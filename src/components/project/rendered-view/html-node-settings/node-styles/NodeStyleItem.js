import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeStyleOption, setActiveStyleId, setActiveHtmlNodeStyleOption } from "../../../../../features/project";
import ModalBackgroundCloser from "../../../_atoms/ModalBackgroundCloser";


export default function NodeStyleItem({child, index}) {

    const stylesInActiveNode = useSelector((state) => state.project.stylesInActiveNode)
    const activeProjectResolution = useSelector((state) => state.project.activeProjectResolution)

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
        dispatch(setActiveHtmlNodeStyleOption({index: index, id: id, name: name}));
        dispatch(setActiveStyleId(id));
        setIsListOpened(false);
    }

    function handleClearClick (index) {
        dispatch(removeStyleOption({optionIndex: index}));
        setIsListOpened(false);
    }

    if (child.isOnlyForMobile === true && activeProjectResolution !== "4") {

    } else if (child.isOnlyForTablet  === true && activeProjectResolution !== "2") {
        
    } else {

    return (
        <div className={"rich-element-settings_button active" + (isStyleSet ? "" : " styleIsNotSet")} 
        onMouseLeave={() => setIsListOpened(false)}>
            {/* <ModalBackgroundCloser 
            handleClick={() => setIsListOpened(false)} 
            isActiveIf={isListOpened} /> */}

            <div className="rich-element-settings_button-text" 
            onMouseEnter={() => setIsListOpened(true)}
            >
                <span>{child?.defaultName?.replaceAll("-", " ")}</span>
                {isStyleSet ? childName?.replaceAll("-", " ") : ("Default" || childName)}
            </div>

            <div className={"rich-element-settings_options_list" + ((isListOpened) ? " active" : "")}>
                {child.options.map((option) => 
                        <div key={option.id} onClick={() => handleStyleOptionClick(option.id, option.name)} 
                        className={"rich-element-settings_options-item" + ((childName === option.name) ? " active" : "")}>
                            {option.name.replaceAll("-", " ")}
                        </div>
                )}
                <div onClick={() => handleClearClick(index)} 
                    className="rich-element-settings_options-item">
                        Default
                </div>
            </div>
        </div>
    )
    }
}