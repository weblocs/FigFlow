import React, {useState, useEffect} from "react";
import ContentEditable from "react-contenteditable";

import {useSelector, useDispatch} from "react-redux";
import {setHoveredNodeId, setArrowNavigationOn} from "../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'

function RenderedNode(props) {

  const [editable,setEditable] = useState(false);

  const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId);
  const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId);
  const projectCollections = useSelector((state) => state.designerProjectState.projectCollections);
  const arrowNavigationOn = useSelector((state) => state.designerProjectState.arrowNavigationOn);

  const { escapeEditableMode } = useKeyboardShortcut(
    ["Escape"],
    shortcutKeys => {
      if(editable) {
        setEditable(false);
        dispatch(setArrowNavigationOn(true));
      }
    },
    { 
      overrideSystem: false,
      ignoreInputFields: false, 
      repeatOnHold: false 
    }
  );

  useEffect(() => {
    if(activeNodeId !== props.id) {
      setEditable(false);
    }
  },[activeNodeId])

  function handleDoubleClick(e) {
    e.stopPropagation();
    setEditable(true);
    dispatch(setArrowNavigationOn(false))
  }

  function handleOnClick(e) {
    e.stopPropagation();
    props.onClick([props.id, props?.class[0]?.name]);
    if(!editable) {
      dispatch(setArrowNavigationOn(true))
    }
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
          data={el}
          type={el.type}
          cmsCollectionId={el.cmsCollectionId}
          cmsFieldId={el.cmsFieldId}
          id={el.id}
          key={el.id}
          itemIndex = {props.itemIndex}
          renderedCollectionIndex={props.renderedCollectionIndex}
          title={(props.collectionItems && el.cmsFieldId) ? props.collectionItems.find(({ fieldId }) => fieldId === el.cmsFieldId)?.fieldValue :  el.title}
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

    let renderedCollectionIndex = projectCollections.map(x => {
      return x.id;
    }).indexOf(props.cmsCollectionId);

    elementHTML = (
      <div 
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
          >
            {projectCollections[renderedCollectionIndex]?.items.map((item,itemIndex) => (
              <div key={item.id}> 
              {props.children.map((el) => (
                <RenderedNode
                  data={el}
                  type={el.type}
                  cmsCollectionId={el.cmsCollectionId}
                  cmsFieldId={el.cmsFieldId}
                  id={el.id}
                  key={el.id}
                  itemIndex = {itemIndex}
                  renderedCollectionIndex={renderedCollectionIndex}
                  collectionItems={projectCollections[renderedCollectionIndex]?.items[itemIndex].data}
                  title={ (el.cmsFieldId) ? projectCollections[renderedCollectionIndex]?.items[itemIndex].data.find(({ fieldId }) => fieldId === el.cmsFieldId)?.fieldValue : el.title }
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

  let h = `<h x-bind:class="(count > 8) ? 'h1' : ''" x-text="count" x-on:click="count = count + 1"></h>`;

  if (props.type === "img") {
    let imageSrc = props.data?.src;
    
    if(props.data.cmsFieldId) {
      imageSrc = projectCollections[props.renderedCollectionIndex]?.items[props.itemIndex].data.find(({ fieldId }) => fieldId === props.data.cmsFieldId)?.fieldValue
    }
    elementHTML = (
      <img 
      src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+imageSrc+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      el_id={props.id}
      className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
      />
    );
  }

  if (props.type === "h") {
    elementHTML = (
      // <div dangerouslySetInnerHTML={{__html: h}} />
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

  if (props.type === "l") {
    elementHTML = (
      <div 
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={(props.class.map((cl) => ( cl.name  ))).toString().replaceAll(","," ") + " renderedNode " + ((activeNodeId === props.id) ? "active " : " ") + ((hoveredNodeId === props.id) ? "hovered" : " ")}
      >
        {props.children.map((el) => (
          <RenderedNode
            data={el}
            type={el.type}
            cmsCollectionId={el.cmsCollectionId}
            cmsFieldId={el.cmsFieldId}
            id={el.id}
            key={el.id}
            itemIndex = {props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
            title={(props.collectionItems && el.cmsFieldId) ? props.collectionItems.find(({ fieldId }) => fieldId === el.cmsFieldId)?.fieldValue :  el.title}
            children={el.children}
            onChange={(text, id) => props.onChange(text, id)}
            class={el.class}
            onClick={([nodeId,className]) => props.onClick([nodeId,className])}
          />
        ))}
      </div>
    );
  }

  return elementHTML;
}

export default RenderedNode;
