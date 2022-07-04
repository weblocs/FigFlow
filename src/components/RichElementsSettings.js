import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeAndStyle, movePreRenderedNode, setProjectPopUp, deleteNodeByIdInPreRenderedHTMLNodes} from "../features/pre-rendered-html-nodes"


export default function RichElementsSettings({id}) {
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const dispatch = useDispatch();

    function handleClick(e) {
        e.stopPropagation();
        dispatch(setActiveNodeAndStyle({id:id}));
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
                        <div className="rich-element-settings_button" onClick={() => dispatch(deleteNodeByIdInPreRenderedHTMLNodes(id))}>✕</div>
                    </div>
                </div>
            </div>
        )
}