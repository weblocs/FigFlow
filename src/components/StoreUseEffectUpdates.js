import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUndoState, checkIfActvieNodeParentDispayStyleIsFlex, editSymbolsClickableArea, setActionActiveFalse, setActiveNodeComputedStyles, setActiveNodeObject, setActiveNodeParentsPathAndExpandNodes, updateActiveStyleProperties, updateActiveStyleListAndId } from "../features/pre-rendered-html-nodes"

export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    
    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const undoActionActive = useSelector((state) => state.designerProjectState.undoActionActive)
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveNodeObject());
    },[activeNodeId, preRenderedHTMLNodes]);

    useEffect(() => {
        dispatch(updateActiveStyleListAndId());
    },[activeNodeId]);

    useEffect(() => {
        if(projectMode === "developer") {
            dispatch(checkIfActvieNodeParentDispayStyleIsFlex());
        }
    },[activeNodeId, preRenderedHTMLNodes]);

    

    useEffect(() => {
        if(projectMode === "developer") {
            dispatch(updateActiveStyleProperties());
        }
    },[activeNodeId, activeProjectResolution, preRenderedHTMLNodes, preRenderedStyles, activeStyleId]);

    useEffect(() => {
        if(projectMode === "developer") {
            dispatch(setActiveNodeComputedStyles());
        }
    },[activeNodeId, preRenderedStyles]);

    useEffect(() => {
        dispatch(addUndoState());
    },[preRenderedHTMLNodes, preRenderedStyles]);

    useEffect(() => {
        dispatch(setActionActiveFalse());
    },[undoActionActive]);  

    useEffect(() => {
        dispatch(editSymbolsClickableArea());
    },[preRenderedHTMLNodes, preRenderedStyles]);  


    useEffect(() => {
        document.querySelector(`.navigation-node.hovered`)?.classList.remove("hovered");
        document.querySelector(`[nodeid='${hoveredNodeId}']`)?.classList.add("hovered");
        document.querySelector(`.renderedNode.hovered`)?.classList.remove("hovered");
        document.querySelector(`[el_id='${hoveredNodeId}']`)?.classList.add("hovered");
    },[hoveredNodeId])

    useEffect(() => {
        document.querySelector(`.navigation-node.active`)?.classList.remove("active");
        document.querySelector(`[nodeid='${activeNodeId}']`)?.classList.add("active");
        document.querySelector(`.renderedNode.active`)?.classList.remove("active");
        document.querySelector(`[el_id='${activeNodeId}']`)?.classList.add("active");
    },[activeNodeId, preRenderedHTMLNodes])

    useEffect(() => {
        dispatch(setActiveNodeParentsPathAndExpandNodes());
    },[activeNodeId, preRenderedHTMLNodes]);

    useEffect(() => {
        setTimeout(() => {
            const actualNodePosition = document.querySelector(`[nodeid="${activeNodeId}"]`)?.getBoundingClientRect().top;
            if(actualNodePosition < 172 || actualNodePosition > window.screen.height - 200) {
            const actualViewPosition = document.getElementById("nodes-navigator").scrollTop;
            const scrollMargin = 245;
            document.getElementById("nodes-navigator").scrollTo({
                top: actualViewPosition + actualNodePosition - scrollMargin,
                behavior: "smooth"
            });
            }
        },1);
    },[activeNodeId]);    
 
}