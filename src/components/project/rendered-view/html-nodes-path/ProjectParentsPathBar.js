import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import {setActiveNodeId} from "../../../../features/pre-rendered-html-nodes"

export default function ProjectParentsPathBar() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)
    const activeNodeParentsPath = useSelector((state) => state.designerProjectState.activeNodeParentsPath)

    const dispatch = useDispatch()

    return (
        
        <div className="parents-path">
            {activeNodeParentsPath.map((node) => (
                <div key={node.id}  
                className="parents-path-item"
                onClick={() => dispatch(setActiveNodeId({id:node.id}))}>
                    {node.name}
                </div>
            ))}
        </div>
    )
}