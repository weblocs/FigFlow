import { current } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUndoState, checkIfActvieNodeParentDispayStyleIsFlex, setSymbolsHeights, setActionActiveFalse, setActiveCollectionTemplateId, setActiveLayoutId, setActiveNodeComputedStyles, setActiveNodeId, setActiveNodeObject, setActiveNodeParentsPath, setActivePage, setActiveStyleOptionIndex, updateActiveStyleProperties, updateActiveStyleListAndId } from "../features/pre-rendered-html-nodes"


export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const undoActionActive = useSelector((state) => state.designerProjectState.undoActionActive)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateActiveStyleListAndId());
        // dispatch(setActiveStyleOptionIndex(stylesInActiveNode?.length - 2));
    },[activeNodeId]);

    useEffect(() => {
        dispatch(setActiveNodeObject());
        dispatch(checkIfActvieNodeParentDispayStyleIsFlex());
        dispatch(setActiveNodeParentsPath());
    },[activeNodeId, preRenderedHTMLNodes]);

    useEffect(() => {
        dispatch(updateActiveStyleProperties());
    },[activeNodeId, activeProjectResolution, preRenderedHTMLNodes, preRenderedStyles, activeStyleId]);

    useEffect(() => {
        dispatch(setActiveNodeComputedStyles());
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