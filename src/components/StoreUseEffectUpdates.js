import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUndoState, setIsActiveHtmlNodeParentDisplayFlex, editSymbolsClickableArea, setActionActiveFalse, setActiveNodeComputedStyles, setGlobalActiveHtmlNode, setActiveHtmlNodeParentsPath, editActiveStyleProperties, updateActiveStyleListAndId } from "../features/project"

export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const hoveredNodeId = useSelector((state) => state.project.hoveredNodeId)
    
    const activeProjectResolution = useSelector((state) => state.project.activeProjectResolution)
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)
    const activeStyleId = useSelector((state) => state.project.activeStyleId)
    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const undoActionActive = useSelector((state) => state.project.undoActionActive)
    const projectMode = useSelector((state) => state.project.projectMode)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setGlobalActiveHtmlNode());
    },[activeNodeId, preRenderedHTMLNodes]);

    useEffect(() => {
        dispatch(updateActiveStyleListAndId());
    },[activeNodeId]);

    useEffect(() => {
        if(projectMode === "developer") {
            dispatch(setIsActiveHtmlNodeParentDisplayFlex());
        }
    },[activeNodeId, preRenderedHTMLNodes]);

    useEffect(() => {
        if(projectMode === "developer") {
            dispatch(editActiveStyleProperties());
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
        console.log('hej');
        
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
        
        dispatch(setActiveHtmlNodeParentsPath());
        
    },[activeNodeId]);

    useEffect(() => {
        if(projectMode === "developer") {
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
        }
    },[activeNodeId]);
 
}