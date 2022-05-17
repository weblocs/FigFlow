import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {addNodeToRenderedHTMLNodesAfterActiveNode} from "../features/pre-rendered-html-nodes"

export default function AddPreRenderedNodeForm() {

    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <Link to="/">
        <div className="addNodeButton">we</div>
        </Link>
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("div"))}>D</div>
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("h"))}>H</div>
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("p"))}>P</div> 
        <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("col"))}>C</div>   
      </div>
    )
}