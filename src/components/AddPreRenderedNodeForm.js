import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import {addNodeToRenderedHTMLNodesAfterActiveNode} from "../features/pre-rendered-html-nodes"

export default function AddPreRenderedNodeForm() {

    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("div"))}>D</div>
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("h"))}>H</div>
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("p"))}>P</div>   
      </div>
    )
}