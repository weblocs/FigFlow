import { addBlock, setActiveBlockAddFolderId } from "../../../../features/project"

import Plus from '../../../../img/plus.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewItemInput from "../navigator/CreateNewItemInput";

export default function CreateBlockButton({id, visibility}) {

    const dispatch = useDispatch()
    const [isInputOpen, setIsInputOpen] = useState(false);

    useEffect(() => {
        dispatch(setActiveBlockAddFolderId(id));
    },[isInputOpen])

    return (
        <>
            <img 
            className={"block-item_edit folder-add-item" + (visibility ? " active" : "")} 
            src={Plus}
            onClick={() => setIsInputOpen(!isInputOpen)} />

            <CreateNewItemInput 
            visibility={isInputOpen}
            create={addBlock} 
            placeholder="New block" />
        </>
    )
}