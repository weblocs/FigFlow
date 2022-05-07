import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import {editTextByIdInPreRenderedHTMLNode, setActiveNodeAndStyle} from "../features/pre-rendered-html-nodes"

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
                onChange={(text, id) => dispatch(editTextByIdInPreRenderedHTMLNode([id, text]))}
                type={el.type}
                id={el.id}
                key={el.id}
                title={el.title}
                children={el.children}
                class={el.class}
                onClick={([nodeId,className]) => dispatch(setActiveNodeAndStyle([nodeId, className]))}
            />
            ))}
        </div>
    )
}