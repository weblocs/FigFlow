import React, { useState, useEffect } from "react";
import Nestable from "react-nestable";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";

import { editNodeTitleById, deleteNodeById } from "./utils/edit-nodes";
import saveProject from "./utils/save-project";

export default function FigFlow(props) {
  const [elements, setElements] = useState(props.elements);
  const [addTodoItemInput, setAddTodoItemInput] = useState("");

  function handleNestedChange(items) {
    setElements(items.items);
  }

  function handleAddingTodoItem(e) {
    e.preventDefault();
    if (addTodoItemInput.length > 0) {
      let newTodoItem = {
        id: uuidv4(),
        title: addTodoItemInput
      };

      setElements([...elements, newTodoItem]);
      setAddTodoItemInput("");
    } else {
      console.log("Empty input");
    }
  }

  const renderItem = ({ item }) => {
    return (
      <div className="todoListItem" key={item.id}>
        {item.title}
        <div
          className="todoListItemDelete"
          onClick={() => {
            handleTaskStatusToggle(item.id);
          }}
        >
          x
        </div>
      </div>
    );
  };

  function handleTaskStatusToggle(id) {
    setElements(deleteNodeById(elements, id, "New text"));
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
    // setElements(items);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>

      <SortableTree
        onChange={(treeData) => setElements([...treeData])}
        isVirtualized={false}
        treeData={elements}
        theme={FileExplorerTheme}
        generateNodeProps={({ node, path }) => ({
          title: (
            <input
              style={{ fontSize: "1rem" }}
              value={node.title}
              onChange={(event) => {
                const name = event.target.value;
                setElements(editNodeTitleById(elements, node.id, name));
              }}
            />
          )
        })}
      />

      <button className="saveButton" onClick={() => saveProject(elements)}>
        Save
      </button>

      <form onSubmit={handleAddingTodoItem} className="addTodoItemForm">
        <input
          name="addTodoItemTitle"
          className="addTodoItemInput"
          placeholder="Add Todo Item"
          value={addTodoItemInput}
          onInput={(e) => setAddTodoItemInput(e.target.value)}
        />
        <button className="addTodoItemButton">Add</button>
      </form>

      <div className="todoList">
        <Nestable
          idProp="id"
          items={elements}
          onChange={(items) => handleNestedChange(items)}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
}

FigFlow.defaultProps = {
  elements: []
};
