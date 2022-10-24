import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUndoState, setIsActiveHtmlNodeParentDisplayFlex, editSymbolsClickableArea, setActionActiveFalse, setActiveNodeComputedStyles, setGlobalActiveHtmlNode, setActiveHtmlNodeParentsPath, editActiveStyleProperties, updateActiveStyleListAndId, setHtmlNodesWithoutExpandedState } from "../features/project"

export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const hoveredNodeId = useSelector((state) => state.project.hoveredNodeId)
    
    const activeProjectResolution = useSelector((state) => state.project.activeProjectResolution)
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)
    const activeStyleId = useSelector((state) => state.project.activeStyleId)
    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const undoActionActive = useSelector((state) => state.project.undoActionActive)
    const projectMode = useSelector((state) => state.project.projectMode)
    const activeTab = useSelector((state) => state.project.activeTab)
    const activeClickedCmsItemIndex = useSelector((state) => state.project.activeClickedCmsItemIndex)
    const activeHoveredCmsItemIndex = useSelector((state) => state.project.activeHoveredCmsItemIndex)

    
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
    },[activeNodeId, preRenderedStyles, preRenderedHTMLNodes, activeProjectResolution]);

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

        let activeHtmlNode = `[el_id='${hoveredNodeId}']`
        if(activeHoveredCmsItemIndex !== undefined) {
            activeHtmlNode = `[el_id='${hoveredNodeId}'][cms_item_index='${activeHoveredCmsItemIndex}']`
        }
        document.querySelector(activeHtmlNode)?.classList.add("hovered");
    },[hoveredNodeId, activeHoveredCmsItemIndex])

    useEffect(() => {
        document.querySelector(`.navigation-node.active`)?.classList.remove("active");
        document.querySelector(`[nodeid='${activeNodeId}']`)?.classList.add("active");
        document.querySelector(`.renderedNode.active`)?.classList.remove("active");

        let activeHtmlNode = `[el_id='${activeNodeId}']`
        if(activeClickedCmsItemIndex !== undefined) {
            activeHtmlNode = `[el_id='${activeNodeId}'][cms_item_index='${activeClickedCmsItemIndex}']`
        }
        document.querySelector(activeHtmlNode)?.classList.add("active");
    },[activeNodeId, activeClickedCmsItemIndex, preRenderedHTMLNodes])

    
    useEffect(() => {   
        dispatch(setActiveHtmlNodeParentsPath());
    },[activeNodeId, preRenderedHTMLNodes, preRenderedStyles, activeProjectResolution]);

    useEffect(() => {
        if(activeTab === "Navigator") {
            dispatch(setActiveHtmlNodeParentsPath());
            document.querySelector(`.navigation-node.active`)?.classList.remove("active");
            document.querySelector(`[nodeid='${activeNodeId}']`)?.classList.add("active");
        }
    },[activeTab])
    

    useEffect(() => {
        if(projectMode === "developer" && activeTab === "Navigator" ) {
            setTimeout(() => {
                const actualNodePosition = document.querySelector(`[nodeid="${activeNodeId}"]`)?.getBoundingClientRect().top;
                if(actualNodePosition < 172 || actualNodePosition > window.screen.height - 200) {
                const actualViewPosition = document.getElementById("nodes-navigator").scrollTop;
                const scrollMargin = 245;
                document.getElementById("nodes-navigator").scrollTo({
                    top: actualViewPosition + actualNodePosition - scrollMargin,
                    
                });
                }
            },1);
        }
    },[activeNodeId, activeTab]);
 
}