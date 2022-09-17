import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUndoState, checkIfActvieNodeParentDispayStyleIsFlex, setSymbolsHeights, setActionActiveFalse, setActiveNodeComputedStyles, setActiveNodeObject, setActiveNodeParentsPath, updateActiveStyleProperties, updateActiveStyleListAndId } from "../features/pre-rendered-html-nodes"

export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
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
        dispatch(setActiveNodeParentsPath());
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
        dispatch(setSymbolsHeights());
    },[preRenderedHTMLNodes, preRenderedStyles]);  
 
}