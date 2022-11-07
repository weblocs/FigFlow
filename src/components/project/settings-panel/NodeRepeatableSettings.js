import { useDispatch, useSelector } from "react-redux"
import { setActiveHtmlNodeRepeatableState } from "../../../features/project";
import StylePanelTitle from "../style-panel/StylePanelTitle";
import BlockFolderCheckbox from "./BlockFolderCheckbox";
import BlockFoldersApplyAllButton from "./BlockFoldersApplyAllButton";
import ParentClassJoin from "./ParentClassJoin";

export default function NodeRepeatableSettings() {

    const nodeType = useSelector((state) => state.project.activeNodeObject?.type)
    const blocks = useSelector((state) => state.project.blocks)
    const isNodeRepeatable = useSelector((state) => ((state.project.activeNodeObject?.repeatable) ? true : false))
    const dispatch = useDispatch()

    function onInputChange(e) {
        dispatch(setActiveHtmlNodeRepeatableState(e.target.checked));
    }

    if (nodeType !== "sym") {
        return (
            <>
            
            <div className="style-panel-box" style={{display:"flex"}}>
                <div>Allow creator duplicating: </div> 
                <input type="checkbox" checked={isNodeRepeatable} onChange={onInputChange} />
            </div>
            <ParentClassJoin />
            
            {/* <StylePanelTitle title="Add blocks" />

            {blocks.map((folder) => (
                <BlockFolderCheckbox key={folder.id} id={folder.id} name={folder.name} />
            ))} */}

            {/* <BlockFoldersApplyAllButton /> */}
            
            </>
        )
    }
}