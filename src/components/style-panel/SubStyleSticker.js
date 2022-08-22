import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStyleId, setKeyboardNavigationOn, createNewStyleOption, setStyleOptionInActiveNode, setActiveNodeId, setActiveStyleOptionIndex, deleteStyleOption, deleteStyleSubOption, clearStyleOption } from "../../features/pre-rendered-html-nodes";

export default function SubStyleSticker ({id, name, index, styleIsSet}) {
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)

    const dispatch = useDispatch()

    const [editingOptionsTurnOn, setEditingOptionsTurnOn] = useState(false);
    const [openStyleOptionsDropdown, setOpenStyleOptionsDropdown] = useState(false);
    const [input, setInput] = useState("");

    function handleOpenDropdown() {
        setOpenStyleOptionsDropdown(!openStyleOptionsDropdown);
    }

    async function handleAddNewStyleOption(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewStyleOption({name: input, childrenIndex: index }));
            dispatch(setActiveStyleOptionIndex(stylesInActiveNode.length));
            setInput("");
        }
    };

    function handleDeleteStyleOption() {
        dispatch(deleteStyleOption({index: index}));
        dispatch(setActiveNodeId({id:activeNodeId}));
        setOpenStyleOptionsDropdown(false);
    }

    function handleOnFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleOnBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    function handleStyleOptionClick(id,name) {
        dispatch(setStyleOptionInActiveNode({index: index, id: id, name: name}));
        dispatch(setActiveStyleId(id));
        dispatch(setActiveStyleOptionIndex(index));
    }

    function handleClickInSticker(id,index) {
        dispatch(setActiveStyleId(id));
        dispatch(setActiveStyleOptionIndex(index));
    }

    function handleDeleteStyleSubOption(subOptionId) {
        dispatch(deleteStyleSubOption({optionIndex: index, subOptionId: subOptionId}));
    }

    function handleClearClick(index) {
        setOpenStyleOptionsDropdown(false);
        dispatch(clearStyleOption({optionIndex: index}));
    }

    return (
        <div key={id} className={"selected-class" + ((activeStyleId === id) ? " active" : "") + ((styleIsSet) ? "" : " styleIsNotSet")} style={{zIndex: stylesInActiveNode.length + 10 - index }}>
            
            <div className={"unit-chooser_closer" + ((openStyleOptionsDropdown) ? " active" : "")}
                onClick={() => setOpenStyleOptionsDropdown(false)}></div>
            
            <div  onClick={() => handleClickInSticker(id,index)} className="text">{name}</div>
            <span 
            className="seleted-class-delete-button"
            onClick={handleOpenDropdown}
            > ⌄
            </span>

            <div className={"style-options-dropdown" + ((openStyleOptionsDropdown) ? " active" : "")}>
                <div className="style-option-list">
                {preRenderedStyles.find(({id}) => id === stylesInActiveNode[0].id)?.childrens[index].options.map((option) => (
                    <div className="style-option-item" key={option.id}>
                        <div onClick={() => handleStyleOptionClick(option.id, option.name)}>{option.name}</div>
                        <div className={"style-option-item_icons" + ((editingOptionsTurnOn) ? " active" : "")}>
                            <div className="style-option-item_delete-icon" onClick={() => handleDeleteStyleSubOption(option.id)}>x</div>
                        </div>
                    </div>
                ))}
                </div>
                <form onSubmit={handleAddNewStyleOption}>
                    <input value={input} onFocus={handleOnFocus} onBlur={handleOnBlur} onChange={(e) => setInput(e.target.value)} placeholder="New option" />
                    <button>Add option</button>
                </form>
                <button onClick={() => setEditingOptionsTurnOn(!editingOptionsTurnOn)}>Edit options</button>
                <button onClick={() => handleClearClick(index)}>Remove/Clear</button>
                <button onClick={handleDeleteStyleOption}>Delete</button>

                {/* ADD MOBILE ONLY OPTION */}
            </div>
        </div>
    )
}