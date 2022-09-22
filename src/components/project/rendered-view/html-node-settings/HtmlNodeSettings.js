import { useDispatch, useSelector } from "react-redux"
import {
    setActiveHtmlNode
} from "../../../../features/project"
import HeadingTypeButton from "./buttons/HeadingTypeButton";
import AddBlockButton from "./buttons/AddBlockButton";
import NodeMoveArrows from "./buttons/NodeMoveArrows";
import SymbolSettings from "./symbol-settings/SymbolSettings";
import NodeStylesList from "./node-styles/NodeStylesList";
import LinkSettings from "./link-settings/LinkSettings";
import DuplicateButton from "./buttons/DuplicateButton";
import DeleteButton from "./buttons/DeleteButton";

export default function HtmlNodeSettings() {
    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const isNodeSymbol = useSelector((state) => (state.project.activeNodeObject?.type === "sym"))

    const dispatch = useDispatch();

    function handleClick(e) {
        e.stopPropagation();
        dispatch(setActiveHtmlNode({id:activeNodeId}));
    }

    function handleClickClearId(e) {
        e.stopPropagation();
        dispatch(setActiveHtmlNode({id: ""}));
    }

    function handleMouseOver(e) {
        e.stopPropagation();
    }

    const activeNode = useSelector((state) => {
        return document.querySelector(`[el_id="${activeNodeId}"]`)
    });
    
    const activeNodePositionX = useSelector((state) => {
        return activeNode?.getBoundingClientRect().left - 
            document.getElementsByClassName("project-rendered-design")[0]?.getBoundingClientRect().left;
    });

    const activeNodePositionY = useSelector((state) => {
        if(activeNode?.getBoundingClientRect().top <= 33 && activeNode?.getBoundingClientRect().top > 0) {
            return 0;
        }
        return activeNode?.getBoundingClientRect().top - 61;
    });    

    return (
            <div className={"rich-element-settings_box" + ((activeNodeId !== "") ? " active" : "")} 
            style={{ transform: `translate(${activeNodePositionX}px,${activeNodePositionY}px)`}}>
                <div className="rich-element-settings" onClick={handleClick} onMouseOver={handleMouseOver}>
                    <div className="rich-element-settings_flex">

                        {(!isNodeSymbol) && 
                        <>
                        <LinkSettings />
                        <NodeMoveArrows isHtmlNodeMoveable={true} />
                        <AddBlockButton addRichSetting={true} />
                        <HeadingTypeButton />
                        <NodeStylesList />
                        <DuplicateButton />
                        <DeleteButton />
                        
                        <div className="rich-element-settings_button button-centered active" 
                        onClick={handleClickClearId}>✕</div>

                        </>}
                        <SymbolSettings />
                    </div>
                </div>
            </div>
    )
}