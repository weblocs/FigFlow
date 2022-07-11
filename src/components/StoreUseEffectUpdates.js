import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStyleOptionIndex, updateActiveStyle } from "../features/pre-rendered-html-nodes"


export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(setActiveStyleOptionIndex(stylesInActiveNode.length - 2));
    },[activeNodeId]);

    useEffect(() => {
        dispatch(updateActiveStyle());
    },[activeNodeId, activeProjectResolution, preRenderedStyles, activeStyleId]);
}