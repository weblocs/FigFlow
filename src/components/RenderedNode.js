import React, {useState} from "react";
import ContentEditable from "react-contenteditable";

import {useSelector, useDispatch} from "react-redux";
import {setHoveredNodeId} from "../features/pre-rendered-html-nodes"

function RenderedNode(props) {

  const [editable,setEditable] = useState(false);

  const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId);
  const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId);

  function handleDoubleClick(e) {
    e.stopPropagation();
    setEditable(true);
  }

  function handleOnClick(e) {
    e.stopPropagation();
    props.onClick([props.id, props?.class[0]?.name]);
  }

  function handleMouseOver(e) {
    e.stopPropagation();
    dispatch(setHoveredNodeId(props.id));
  }

  function handleMouseOut(e) {
    e.stopPropagation();
    dispatch(setHoveredNodeId(""));
  }

  const dispatch = useDispatch()
  
  let elementHTML = (
    <div 
    onClick={handleOnClick}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
        >
      {props.children.map((el) => (
        <RenderedNode
          type={el.type}
          id={el.id}
          key={el.id}
          title={el.title}
          children={el.children}
          onChange={(text, id) => props.onChange(text, id)}
          class={el.class}
          onClick={([nodeId,className]) => props.onClick([nodeId,className])}
        />
      ))}
    </div>
  );

  // Collection List
  if (props.type === "col") {

    let collectionListItems = [{id:"23420"},{id:"1312"},{id:"1231240"},{id:"56750"}]

    elementHTML = (
      <div 
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
          >
            {collectionListItems.map((item) => (
              <div key={item.id} >
              {props.children.map((el) => (
                <RenderedNode
                  type={el.type}
                  id={el.id}
                  key={el.id}
                  title={el.title}
                  children={el.children}
                  onChange={(text, id) => props.onChange(text, id)}
                  class={el.class}
                  onClick={([nodeId,className]) => props.onClick([nodeId,className])}
                />
              ))}
              </div>
            ))}
      </div>
    );
  }

  if (props.type === "h") {
    elementHTML = (
      <ContentEditable
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
        el_id={props.id}
        tagName="h2"
        html={props.title} // innerHTML of the editable div
        disabled={!editable} // use true to disable edition
        onChange={(e) => props.onChange(e.target.value, props.id)} // handle innerHTML change
      />
    );
  }

  if (props.type === "p") {
    elementHTML = (
      <ContentEditable
        className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
        el_id={props.id}
        tagName="p"
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        html={props.title} // innerHTML of the editable div
        disabled={!editable} // use true to disable edition
        onChange={(e) => props.onChange(e.target.value, props.id)} // handle innerHTML change
      />
    );
  }

  if (props.type === "a") {
    elementHTML = (
      <a href="#" el_id={props.id}>
        {props.title}
      </a>
    );
  }

  return elementHTML;
}

export default RenderedNode;
