import React, {useState, useEffect} from "react";
import ContentEditable from "react-contenteditable";

import {useSelector, useDispatch} from "react-redux";
import {setHoveredNodeId, setKeyboardNavigationOn, setHoveredSectionId, setEditedSymbolId} from "../features/pre-rendered-html-nodes"
import useKeyboardShortcut from 'use-keyboard-shortcut'
import AddSectionButton from "./AddSectionButton";
import AddRichTextElementButton from "./AddRichTextElementButton";
import sanitizeHtml from 'sanitize-html';

function RenderedNode(props) {

  const [editable,setEditable] = useState(false);

  const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId);
  const activeNodeObject = useSelector((state) => state.designerProjectState.activeNodeObject);
  const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId);
  const projectCollections = useSelector((state) => state.designerProjectState.projectCollections);
  const projectMode = useSelector((state) => state.designerProjectState.projectMode);
  const keyboardNavigationOn = useSelector((state) => state.designerProjectState.keyboardNavigationOn);
  const hoveredSectionId = useSelector((state) => state.designerProjectState.hoveredSectionId);
  const nodesEditMode = useSelector((state) => state.designerProjectState.nodesEditMode);
  const editedSymbolId = useSelector((state) => state.designerProjectState.editedSymbolId);
  const activeCollectionTemplateId = useSelector((state) => state.designerProjectState.activeCollectionTemplateId);
  const activeCollectionItemTemplateId = useSelector((state) => state.designerProjectState.activeCollectionItemTemplateId);
  const listOfNodeStyles = useSelector((state) => props.class.map((cl) => (cl.name)).toString().replaceAll(","," ") + " renderedNode " + ((state.designerProjectState.activeNodeId === props.id) ? "active " : " ") + ((state.designerProjectState.hoveredNodeId === props.id) ? "hovered" : " "));

  const dispatch = useDispatch()
  

  const { escapeEditableMode } = useKeyboardShortcut(
    ["Escape"],
    shortcutKeys => {
      if(editable) {
        setEditable(false);
        dispatch(setKeyboardNavigationOn(true));
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
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleOnClick(e) {
    e.stopPropagation();
    props.onClick([props.id, props?.class[0]?.name]);
    if (projectMode === "creator") {
      setEditable(true);
      dispatch(setKeyboardNavigationOn(false))
    } 
    if(!editable) {
      dispatch(setKeyboardNavigationOn(true))
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

  function handleSectionMouseOver() {
    dispatch(setHoveredSectionId(props.id));
  }
  
  

  // "div"
  
  let elementHTML = (
    <div 
    el_id={props.id}
    onClick={handleOnClick}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    className={listOfNodeStyles}
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
          collectionItems={props.collectionItems}
          fieldId={props.fieldId}
          title={el.title}
          children={el.children}
          onChange={(text, id) => props.onChange(text, id)}
          class={el.class}
          onClick={([nodeId,className]) => props.onClick([nodeId,className])}
        />
      ))}
    </div>
  );

  if (props.type === "sec") {
    elementHTML = (
      <div onMouseEnter={handleSectionMouseOver}>
      <div 
      el_id={props.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
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
            title={el.title}
            children={el.children}
            onChange={(text, id) => props.onChange(text, id)}
            class={el.class}
            onClick={([nodeId,className]) => props.onClick([nodeId,className])}
          />
        ))}
        
      </div>
      <AddSectionButton sectionId={props.id} />
      </div>
    );
  }

  if (props.type === "rich") {
    elementHTML = (
      <div 
      el_id={props.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <div key={el.id}>
            <RenderedNode
              data={el}
              type={el.type}
              cmsCollectionId={el.cmsCollectionId}
              cmsFieldId={el.cmsFieldId}
              id={el.id}
              key={el.id}
              itemIndex = {props.itemIndex}
              renderedCollectionIndex={props.renderedCollectionIndex}
              title={el.title}
              children={el.children}
              onChange={(text, id) => props.onChange(text, id)}
              class={el.class}
              onClick={([nodeId,className]) => props.onClick([nodeId,className])}
            />
          </div>
        ))}
        <AddRichTextElementButton elementId={props.id} nodes={props} />
      </div>
    );
  }

  if (props.type === "sym") {
    elementHTML = (
      <div 
      id={props.id}
      el_id={props.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      >
        <div 
        onDoubleClick={() => (editedSymbolId.symbolId === "") && dispatch(setEditedSymbolId({symbolId:props.data.symbolId, elementId: props.id}))} 
        className={"symbol-box-wrapper" + 
        ((editedSymbolId.symbolId === props.data.symbolId &&
          editedSymbolId.elementId === props.id) ? " active" : "")}
        style={{position: "relative", height: "0"}}>
          <div symbol_id={props.id} className="symbol-wrapper" style={{width: "100%", height: "40px"}}></div>
        </div>

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
            title={el.title}
            children={el.children}
            onChange={(text, id) => props.onChange(text, id)}
            class={el.class}
            onClick={([nodeId,className]) => props.onClick([nodeId,className])}
          />
        ))}
        <AddSectionButton />
      </div>
    );
  }

  // Collection List
  if (props.type === "col") {

    let renderedCollectionIndex = projectCollections.map(x => {
      return x.id;
    }).indexOf(props.cmsCollectionId);

    elementHTML = (
      <div 
      el_id={props.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
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
      className={listOfNodeStyles}
      />
    );
  }

  let nodeText = props.title;
  if (props.type === "h" || props.type === "p") {
    if(nodesEditMode === "cmsTemplate" && props.data.cmsFieldId !== "" && props.data.cmsFieldId !== undefined) {
      nodeText = projectCollections.find(({ id }) => id === activeCollectionTemplateId)?.items?.find(({id}) => id === activeCollectionItemTemplateId).data.find(({ fieldId }) => fieldId === props.cmsFieldId)?.fieldValue;
    }

    if(props.collectionItems) {
      if (props.cmsFieldId === "") {
        nodeText = props.title;
      } else {
        nodeText = props.collectionItems.find(({ fieldId }) => fieldId === props.cmsFieldId)?.fieldValue;
      }
    }

    if(nodeText === undefined) {
      nodeText = "empty"
    }
    
  }

  if (props.type === "h") {
    elementHTML = (
      <ContentEditable
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
        el_id={props.id}
        tagName={(props.data?.subtype !== undefined) ? props.data.subtype : "h1"}
        html={nodeText}
        disabled={!editable} // use true to disable edition
        onChange={(e) => props.onChange(sanitizeHtml(e.target.value , {
          allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
          allowedAttributes: {
            'a': [ 'href' ]
          }}), props.id)} // handle innerHTML change
      />
    );
  }

  if (props.type === "p") {
    elementHTML = (
      <ContentEditable
        className={listOfNodeStyles}
        el_id={props.id}
        tagName="p"
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        html={nodeText}
        disabled={!editable} // use true to disable edition
        onChange={(e) => props.onChange(sanitizeHtml(e.target.value , {
          allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
          allowedAttributes: {
            'a': [ 'href' ]
          }}), props.id)} // handle innerHTML change
      />
    );
  }

  if (props.type === "l") {
    elementHTML = (
      <div 
      el_id={props.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
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
            title={el.title}
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
