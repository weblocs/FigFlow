import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";

import Element from "./Element";

import { editNodeTitleById, deleteNodeById } from "./utils/edit-nodes";
import saveProject from "./utils/save-project";

export default function FigFlow(props) {
  const [elements, setElements] = useState(props.elements);
  const [classes, setClasses] = useState(props.classes);
  const [addTodoItemInput, setAddTodoItemInput] = useState("");
  const [elementTypeInput, setElementTypeInput] = useState("div");

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

      setElements([...elements, newTodoItem]);
      setAddTodoItemInput("");
    } else {
      console.log("Empty input");
    }
  }

  function handleTaskStatusToggle(id) {
    setElements(deleteNodeById(elements, id, "New text"));
  }

  function handleElementOnChange(text, id) {
    setElements(editNodeTitleById(elements, id, text));
  }

  useEffect(() => {
    if (elements.length > 0) {
      console.log("Change");
      console.log(elements);
    }
  }, [elements]);

  useEffect(() => {
    console.log("Start");
    axios
      .get(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-icorv/endpoint/" +
          "items"
      )
      .then((res) => {
        setElements(res.data[0].items);
      });
  }, []);

  return (
    <div>
      <button className="saveButton" onClick={() => saveProject(elements)}>
        Save
      </button>
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
      <SortableTree
        canNodeHaveChildren={(node) => node.type === "div"}
        onChange={(treeData) => setElements([...treeData])}
        isVirtualized={false}
        treeData={elements}
        theme={FileExplorerTheme}
        generateNodeProps={({ node, path }) => ({
          title: (
            <div>
              <span className="typeSeparator">{node.type}</span>
              {/* {node.title} */}
              {/* <span>|</span> */}
              {node.class[0].name}
              <div
                className="todoListItemDelete"
                onClick={() => {
                  handleTaskStatusToggle(node.id);
                }}
              >
                x
              </div>
            </div>
          )
        })}
      />

      <div className="Project">
        {elements.map((el) => (
          <Element
            onChange={(text, id) => handleElementOnChange(text, id)}
            type={el.type}
            id={el.id}
            key={el.id}
            title={el.title}
            children={el.children}
            class={el.class}
          />
        ))}
      </div>
    </div>
  );
}

FigFlow.defaultProps = {
  elements: [],
  classes: [{ name: "heading-1", styles: { color: "green" } }]
};
