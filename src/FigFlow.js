import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";
import Constants from "./const.js";
import Element from "./Element";

import { editNodeTitleById, deleteNodeById } from "./utils/edit-nodes";
import saveProject from "./utils/save-project";
import JSONtoCSS from "./utils/json-to-css"

FigFlow.defaultProps = {
  elements: [],
  classes: [
    { name: "new-item", styles: [{ color: "green",  font_size: "0", padding: "20px", background: "#eee" }] },
    { name: "heading-1", styles: [{ color: "green",  font_size: "28px", margin_top: "0", margin_bottom: "0" }] },
    { name: "heading-2", styles: [{ color: "blue",  font_size: "44px", margin_top: "0" }] },
  ]
};

function getIndexOfElement(nodes, name) {
  let res;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].name === name) {
      res = i;
    }
  }
  return res;
}

export default function FigFlow(props) {
  const [elements, setElements] = useState(props.elements);
  const [classes, setClasses] = useState(props.classes);
  const [activeClass, setActiveClass] = useState("heading-2");
  const [addTodoItemInput, setAddTodoItemInput] = useState("");
  const [elementTypeInput, setElementTypeInput] = useState("div");
  const [css, setCss] = useState("");

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

      let newClass = { name: addTodoItemInput, styles: [{font_size:"20px"}] };

      setElements([...elements, newTodoItem]);
      setClasses([...classes, newClass]);
      setAddTodoItemInput("");
    } else {
      console.log("Empty input");
    }
  }

  function handleTaskStatusToggle(id) {
    setElements(deleteNodeById(elements, id));
  }

  function handleElementOnChange(text, id) {
    setElements(editNodeTitleById(elements, id, text));
  }

  function handleUpdatingClassStyle(_activeClass,_style,_value) {
    let tempClasses = classes;
    let _newStyle = tempClasses[getIndexOfElement(tempClasses,activeClass)].styles[0].font_size;
    _newStyle = _newStyle.replace('px','');
    _newStyle = parseInt(_newStyle) + 1;
    _newStyle = _newStyle.toString() + "px";
    tempClasses[getIndexOfElement(tempClasses,activeClass)].styles[0].font_size = _newStyle;
    setClasses(tempClasses);
  }

  useEffect(() => {
    setCss(JSONtoCSS(classes));
  }, [classes]);

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
        Constants.BASE_API + "items"
      )
      .then((res) => {
        setElements(res.data[0].items);
      });
  }, []);

  return (
    <div>
      <style>{css}</style>

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

      <div className="projectWrapper">
        <SortableTree
          className="navigatorWrapper"
          canNodeHaveChildren={(node) => node.type === "div"}
          onChange={(treeData) => setElements([...treeData])}
          isVirtualized={false}
          treeData={elements}
          theme={FileExplorerTheme}
          
          generateNodeProps={({ node, path }) => ({
            title: (
              <div>
                <span className="typeSeparator">{node.type}</span>
                <span onClick={() => setActiveClass(node.class[0].name)}>{node.class[0].name}</span>
                
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

        <div className="styleWrapper">

            {classes.map((el) => (
              <div key={el.name} onClick={() => setActiveClass(el.name)} className={"classElement " + ((activeClass == el.name) ? "active" : "")} >{el.name}</div>
            ))}

          <div>font size</div>
          <input onInput={(e) => handleUpdatingClassStyle(activeClass,"font_size",e.target.value)} value={classes[getIndexOfElement(classes,activeClass)].styles[0].font_size} name="styleFontSize" placeholder="font size" />
        </div>
      </div>

    </div>
  );
}
