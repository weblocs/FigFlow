import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeAndStyle, movePreRenderedNode, setProjectPopUp, deleteActiveNode} from "../features/pre-rendered-html-nodes"
import RichElementSettingsStyle from "./RichElementSettingsStyle"

export default function RichElementsSettings({id}) {
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)

    const dispatch = useDispatch();

    function handleClick(e) {
        e.stopPropagation();
        dispatch(setActiveNodeAndStyle({id:id}));
    }

    function handleClickDelete(e) {
        e.stopPropagation();
        dispatch(deleteActiveNode());
    }

    function handleMouseOver(e) {
        e.stopPropagation();
    }

    return (
        <div className={"rich-element-settings_box" + ((activeNodeId === id) ? " active" : "")}>
            <div className="rich-element-settings" onClick={handleClick} onMouseOver={handleMouseOver}>
                <div className="rich-element-settings_flex">
                    <div className="rich-element-settings_button" onClick={() => dispatch(movePreRenderedNode({moveReverse:true}))}>↑</div>
                    <div className="rich-element-settings_button" onClick={() => dispatch(movePreRenderedNode({moveReverse:false}))}>↓</div>
                    <div className="rich-element-settings_button" onClick={() => dispatch(setProjectPopUp("addElement"))}>✎</div>
                    {/* <div className="rich-element-settings_button">❐</div> */}
                    <div className="rich-element-settings_button" onClick={handleClickDelete}>✕</div>

                    {preRenderedStyles.find(({id}) => id === stylesInActiveNode[0]?.id)?.childrens.map((child,index) => {
                            return (
                                <RichElementSettingsStyle child={child} index={index} key={index} />
                            )
                    })}
                </div>
            </div>
        </div>
    )
}