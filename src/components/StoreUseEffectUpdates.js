import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStyleOptionIndex } from "../features/pre-rendered-html-nodes"


export default function StoreUseEffectUpdates () {

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(setActiveStyleOptionIndex(stylesInActiveNode.length - 2));
    },[activeNodeId]);
}