import { createNewSection, setactiveLayoutFolder } from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput"
import Plus from '../img/plus.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateLayoutButton({id, visibility}) {

    const activeLayoutFolder = useSelector((state) => state.designerProjectState.activeLayoutFolder)
    const dispatch = useDispatch();

    const [isInputOpen, setIsInputOpen] = useState(false);

    function handleClick() {
        setIsInputOpen(!isInputOpen);
        dispatch(setactiveLayoutFolder(id));
    }

    useEffect(() => {
        if(activeLayoutFolder !== id) {
            setIsInputOpen(false);
        }
    },[activeLayoutFolder]);

    return (
        <>
            <img 
            className={"block-item_edit folder-add-item" + (visibility ? " active" : "")} 
            src={Plus}
            onClick={handleClick} />

            <CreateNewItemInput 
            visibility={isInputOpen}
            create={createNewSection} 
            placeholder="New layout" />
        </>
    )
}