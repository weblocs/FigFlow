import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStyleId, setArrowNavigationOn, createNewStyleOption, setStyleOptionInActiveNode, setActiveNodeAndStyle, setActiveStyleOptionIndex, deleteStyleOption } from "../../features/pre-rendered-html-nodes";

export default function SubStyleSticker ({id, name, index, styleIsSet}) {
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)

    
    const dispatch = useDispatch()

    const [openStyleOptionsDropdown, setOpenStyleOptionsDropdown] = useState(false);
    const [input, setInput] = useState("");

    function handleOpenDropdown() {
        setOpenStyleOptionsDropdown(!openStyleOptionsDropdown);
    }

    async function handleAddNewStyleOption(e) {
        e.preventDefault();
        dispatch(createNewStyleOption({name: input, childrenIndex: index }));
        setInput("");
    };

    function handleDeleteStyleOption() {
        dispatch(deleteStyleOption({index: index}));
        dispatch(setActiveNodeAndStyle({id:activeNodeId}));
        setOpenStyleOptionsDropdown(false);
    }

    function handleOnFocus() {
        dispatch(setArrowNavigationOn(false));
    }

    function handleOnBlur() {
        dispatch(setArrowNavigationOn(true));
    }

    function handleStyleOptionClick(id,name) {
        dispatch(setStyleOptionInActiveNode({index: index, id: id, name: name}));
        dispatch(setActiveStyleId(id));
    }

    function handleClickInSticker(id,index) {
        dispatch(setActiveStyleId(id));
        dispatch(setActiveStyleOptionIndex(index));
    }

    return (
        <div key={id} className={"selected-class" + ((activeStyleId === id) ? " active" : "") + ((styleIsSet) ? "" : " styleIsNotSet")} style={{zIndex: stylesInActiveNode.length + 10 - index }}>
            <div  onClick={() => handleClickInSticker(id,index)} className="text">{name}</div>
            <span 
            className="seleted-class-delete-button"
            onClick={handleOpenDropdown}
            > ⌄
            </span>

            <div className={"style-options-dropdown" + ((openStyleOptionsDropdown) ? " active" : "")}>
                <div className="style-option-list">
                {preRenderedStyles.find(({id}) => id === stylesInActiveNode[0].id)?.childrens[index].options.map((option) => (
                    <div onClick={() => handleStyleOptionClick(option.id, option.name)} className="style-option-item" key={option.id}>
                        {option.name}
                    </div>
                ))}
                </div>
                <form onSubmit={handleAddNewStyleOption}>
                    <input value={input} onFocus={handleOnFocus} onBlur={handleOnBlur} onChange={(e) => setInput(e.target.value)} placeholder="New style" />
                    <button>Add</button>
                </form>
                <button onClick={handleDeleteStyleOption}>Delete</button>
            </div>
        </div>
    )
}