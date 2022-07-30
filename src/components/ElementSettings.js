import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeId, movePreRenderedNode, setProjectPopUp, deleteActiveNode, setCopiedNodes, pasteCopiedNodes, clearActiveNode} from "../features/pre-rendered-html-nodes"
import ElementHeadingSettings from "./ElementHeadingSettings"
import RichElementSettingsStyle from "./RichElementSettingsStyle"

export default function ElementSettings() {
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const nodeSubType = useSelector((state) => state.designerProjectState.activeNodeObject?.subtype)
    const isNodeRepeatable = useSelector((state) => (state.designerProjectState.activeNodeObject?.repeatable) ? true : false )
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)

    const move = true;
    const addRich = true;
    const deleteNode = true;

    const dispatch = useDispatch();

    function handleClick(e) {
        e.stopPropagation();
        dispatch(setActiveNodeId({id:activeNodeId}));
    }

    function handleClickDelete(e) {
        e.stopPropagation();
        dispatch(deleteActiveNode());
    }

    function handleClickClearId(e) {
        e.stopPropagation();
        dispatch(clearActiveNode());
    }

    function handleMouseOver(e) {
        e.stopPropagation();
    }

    const activeNode = useSelector((state) => {
        return document.querySelector(`[el_id="${activeNodeId}"]`)
    });
    const activeNodePositionX = useSelector((state) => {
        return activeNode?.offsetLeft;
    });

    const activeNodePositionY = useSelector((state) => {
        if(activeNode?.offsetTop < 28) {
            return 0
        }
        return activeNode?.offsetTop - 28;
    });

    function handleDuplicate() {
        dispatch(setCopiedNodes());
        dispatch(pasteCopiedNodes());
    }

    return (
            <div className={"rich-element-settings_box" + ((activeNodeId !== "") ? " active" : "")} 
            style={{ transform: `translate(${activeNodePositionX}px,${activeNodePositionY}px)`}}>
                <div className="rich-element-settings" onClick={handleClick} onMouseOver={handleMouseOver}>
                    <div className="rich-element-settings_flex">
                        <div className={"rich-element-settings_button button-centered" + ((move) ? " active" : "")} onClick={() => dispatch(movePreRenderedNode({moveReverse:true}))}>↑</div>
                        <div className={"rich-element-settings_button button-centered" + ((move) ? " active" : "")} onClick={() => dispatch(movePreRenderedNode({moveReverse:false}))}>↓</div>
                        <div className={"rich-element-settings_button button-centered" + ((addRich) ? " active" : "")} onClick={() => dispatch(setProjectPopUp("addElement"))}>✎</div>
                        <div className={"rich-element-settings_button button-centered" + ((isNodeRepeatable) ? " active" : "")} onClick={handleDuplicate}>❐</div>
                        
                        <ElementHeadingSettings />
                        

                        {preRenderedStyles.find(({id}) => id === stylesInActiveNode[0]?.id)?.childrens.map((child,index) => {
                                return (
                                    <RichElementSettingsStyle child={child} index={index} key={index} />
                                )
                        })}

                        <div className={"rich-element-settings_button button-centered" + ((deleteNode) ? " active" : "")} 
                        onClick={handleClickDelete}>✕</div>

                        <div className="rich-element-settings_button button-centered active" 
                        onClick={handleClickClearId}>✕</div>

                    </div>
                </div>
            </div>
    )
}