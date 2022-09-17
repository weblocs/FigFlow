import { useDispatch, useSelector } from "react-redux"
import {
    setActiveNodeId, 
    movePreRenderedNode,
    deleteActiveNode,
    setCopiedNodes,
    pasteCopiedNodes,
    clearActiveNode,
    setEditedSymbolId 
} from "../../../../features/pre-rendered-html-nodes"
import HeadingButton from "./HeadingButton";
import StyleItem from "./StyleItem";
import Delete from '../../../../img/delete.svg';
import Settings from '../../../../img/settings.svg';
import AddBlockButton from "./AddBlockButton";

export default function ElementSettings() {
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const editedSymbolId = useSelector((state) => state.designerProjectState.editedSymbolId)
    const nodeObject = useSelector((state) => state.designerProjectState.activeNodeObject)
    const nodeType = useSelector((state) => state.designerProjectState.activeNodeObject?.type)
    
    const activeSymbolName = useSelector((state) => {
        const activeSymbolId = state.designerProjectState.activeNodeObject?.symbolId;
        if(activeSymbolId !== undefined) {
           return state.designerProjectState.projectSymbols.find(({id}) => id === activeSymbolId).name;
        } 
    })
    const isNodeRepeatable = useSelector((state) => (state.designerProjectState.activeNodeObject?.repeatable) ? true : false )
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)

    const move = true;
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
        return activeNode?.getBoundingClientRect().left - 
            document.getElementsByClassName("project-rendered-design")[0]?.getBoundingClientRect().left;
    });

    const activeNodePositionY = useSelector((state) => {
        if(activeNode?.getBoundingClientRect().top <= 33 && activeNode?.getBoundingClientRect().top > 0) {
            return 0;
        }
        return activeNode?.getBoundingClientRect().top - 61;
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

                        <div className={"rich-element-settings_button button-centered text-button" + ((nodeType === "sym") ? " active" : "")}>
                            Symbol: {activeSymbolName}
                        </div>

                        {(nodeType !== "sym") ? 
                        <>
                        {(nodeType === "l") && 
                        <div className="rich-element-settings_button button-centered active">
                            <img src={Settings} style={{width: "14px"}} />
                        </div>
                        }

                        <div className={"rich-element-settings_button button-centered" + ((move) ? " active" : "")} onClick={() => dispatch(movePreRenderedNode({moveReverse:true}))}>↑</div>
                        <div className={"rich-element-settings_button button-centered" + ((move) ? " active" : "")} onClick={() => dispatch(movePreRenderedNode({moveReverse:false}))}>↓</div>
                       
                        <AddBlockButton addRichSetting={true} />
                        <HeadingButton />
                        
                        {preRenderedStyles.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens.map((child,index) => {
                                return (
                                    <StyleItem child={child} index={index} key={index} />
                                )
                        })}

                        <div className={"rich-element-settings_button button-centered active"}
                        >✎</div>
                        <div className={"rich-element-settings_button button-centered" + ((isNodeRepeatable) ? " active" : "")} onClick={handleDuplicate}>❐</div>
                        
                        <div className={"rich-element-settings_button button-centered" + ((deleteNode) ? " active" : "")} 
                        onClick={handleClickDelete}>
                            <img src={Delete} style={{width: "14px"}} />
                        </div>

                        <div className="rich-element-settings_button button-centered active" 
                        onClick={handleClickClearId}>✕</div>

                        </> :

                        <>
                        <div className="rich-element-settings_button button-centered active"
                        onClick={() => (editedSymbolId.symbolId === "") && dispatch(setEditedSymbolId({symbolId:nodeObject.symbolId, elementId: nodeObject.id}))}
                        >✎</div>
                        </>
                        }

                    </div>
                </div>
            </div>
    )
}