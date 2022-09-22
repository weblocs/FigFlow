import { addLayout, setActiveLayoutFolder } from "../../../../features/project"

import Plus from '../../../../img/plus.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewItemInput from "../navigator/CreateNewItemInput";

export default function CreateLayoutButton({id, visibility}) {

    const activeLayoutFolder = useSelector((state) => state.project.activeLayoutFolder)
    const dispatch = useDispatch();

    const [isInputOpen, setIsInputOpen] = useState(false);

    function handleClick() {
        setIsInputOpen(!isInputOpen);
        dispatch(setActiveLayoutFolder(id));
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
            create={addLayout} 
            placeholder="New layout" />
        </>
    )
}