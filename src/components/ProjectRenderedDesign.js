import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import {editSelectedFieldInPreRenderedHTMLNode, setActiveNodeAndStyle} from "../features/pre-rendered-html-nodes"

import RenderedNode from "./RenderedNode";

export default function ProjectRenderedDesign() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)

    const dispatch = useDispatch()

    return (
        <div className="Project">
            <style>{postRenderedStyles}</style>

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
                onClick={([_id,className]) => dispatch(setActiveNodeAndStyle({id: _id}))}
            />
            ))}
        </div>
    )
}