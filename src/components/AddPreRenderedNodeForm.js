import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import {addNodeToRenderedHTMLNodesAsLastElement} from "../features/pre-rendered-html-nodes"
import { v4 as uuidv4 } from "uuid";

export default function AddPreRenderedNodeForm() {

    const [addTodoItemInput, setAddTodoItemInput] = useState("");
    const [elementTypeInput, setElementTypeInput] = useState("div");

    const dispatch = useDispatch()

    function handleAddingTodoItem(e) {
        e.preventDefault();
        if (addTodoItemInput.length > 0) {
          let newTodoItem = {
            id: uuidv4(),
            title: "Default text",
            type: elementTypeInput,
            children: [],
            class: [{ name: addTodoItemInput }]
          };
    
          dispatch(addNodeToRenderedHTMLNodesAsLastElement(newTodoItem));
          
          setAddTodoItemInput("");
        } else {
          console.log("Empty input");
        }
      }

    return (
        <form onSubmit={handleAddingTodoItem} className="addTodoItemForm">
        <input
          name="addTodoItemTitle"
          className="addTodoItemInput"
          placeholder="Class Name"
          value={addTodoItemInput}
          onInput={(e) => setAddTodoItemInput(e.target.value)}
        />
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