import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import {setActiveHtmlNode} from "../../../../features/project"

export default function ProjectParentsPathBar() {

    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.project.postRenderedStyles)
    const activeNodeParentsPath = useSelector((state) => state.project.activeNodeParentsPath)

    const dispatch = useDispatch()

    return (
        
        <div className="parents-path">
            {activeNodeParentsPath.map((node) => (
                <div key={node.id}  
                className="parents-path-item"
                onClick={() => dispatch(setActiveHtmlNode({id:node.id}))}>
                    {node.name}
                </div>
            ))}
        </div>
    )
}