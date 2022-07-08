import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setActiveStyleId, setStyleOptionInActiveNode } from "../features/pre-rendered-html-nodes";


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

    return (
        <div className={"rich-element-settings_button" + isStyleSet}>
            <div onClick={() => setIsListOpened(!isListOpened)}>{childName}</div>
            <div className={"rich-element-settings_options_list" + ((isListOpened) ? " active" : "")}>
                {child.options.map((option) => (
                    <div key={option.id} onClick={() => handleStyleOptionClick(option.id, option.name)}>
                        {option.name}
                    </div>
                ))}
            </div>
        </div>
    )
}