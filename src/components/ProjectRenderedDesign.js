import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import {editSelectedFieldInPreRenderedHTMLNode, setActiveNodeId} from "../features/pre-rendered-html-nodes"
import ElementSettings from "./ElementSettings";
import ProjectParentsPathBar from "./ProjectParentsPathBar";

import RenderedNode from "./RenderedNode";

export default function ProjectRenderedDesign() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)
    const activeProjectResolution = useSelector((state) => state.designerProjectState.activeProjectResolution)

    const dispatch = useDispatch()

    return (
        <div className="Project">
            <style>{postRenderedStyles}</style>

            <div className={"project-rendered-design state-" + activeProjectResolution}>

                <ElementSettings />

                
                {preRenderedHTMLNodes.map((el) => (
                <RenderedNode
                    onChange={(text, id) => dispatch(editSelectedFieldInPreRenderedHTMLNode({id: id, field: 'title', value: text}))}
                    data={el}
                    cmsCollectionId={el.cmsCollectionId}
                    cmsFieldId={el.cmsFieldId}
                    type={el.type}
                    id={el.id}
                    key={el.id}
                    title={el.title}
                    children={el.children}
                    class={el.class}
                    onClick={([_id]) => dispatch(setActiveNodeId({id: _id}))}
                />
                ))}

                

            </div>

            <ProjectParentsPathBar />
        </div>
    )
}