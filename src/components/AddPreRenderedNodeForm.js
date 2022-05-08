import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import {addNodeToRenderedHTMLNodesAfterActiveNode} from "../features/pre-rendered-html-nodes"
import { v4 as uuidv4 } from "uuid";

export default function AddPreRenderedNodeForm() {

    const [elementTypeInput, setElementTypeInput] = useState("div");

    const dispatch = useDispatch()

    function handleAddingTodoItem(e) {
        e.preventDefault();
        
          let newTodoItem = {
            id: uuidv4(),
            title: "Default text",
            type: elementTypeInput,
            children: [],
            class: []
          };
    
          dispatch(addNodeToRenderedHTMLNodesAfterActiveNode(newTodoItem));
          
      }

    return (
        <form onSubmit={handleAddingTodoItem} className="addTodoItemForm">
        
        <select
          name="type"
          value={elementTypeInput}
          onInput={(e) => setElementTypeInput(e.target.value)}
        >
          <option value="div">Div</option>
          <option value="h">Heading</option>
          <option value="p">Paragraph</option>
          <option value="t">Text</option>
          <option value="ab">Link Block</option>
          <option value="a">Link</option>
          <option value="section">Section</option>
        </select>

        <button className="addTodoItemButton">Add</button>
      </form>
    )
}