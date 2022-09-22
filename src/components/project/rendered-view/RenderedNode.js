import React, {useState, useEffect, useMemo} from "react";
import ContentEditable from "react-contenteditable";

import {useSelector, useDispatch} from "react-redux";
import {setHoveredHtmlNode, setKeyboardNavigationOn, makeSymbolEditable, setIsNodeSelectedFromNavigator} from "../../../features/project"
import useKeyboardShortcut from 'use-keyboard-shortcut'
import AddSectionButton from "./_atoms/AddSectionButton";
import Placeholder from '../../../img/placeholder.svg';

import { camelCase } from "lodash";

function RenderedNode(props) {

  const [editable, setEditable] = useState(false);

  const activeNodeId = useSelector((state) => state.project.activeNodeId);
  // const hoveredNodeId = useSelector((state) => state.project.hoveredNodeId);
  const activeProjectResolution = useSelector((state) => state.project.activeProjectResolution);
  const collections = useSelector((state) => state.project.collections);
  const projectMode = useSelector((state) => state.project.projectMode);
  const nodesEditMode = useSelector((state) => state.project.nodesEditMode);
  const editedSymbolId = useSelector((state) => state.project.editedSymbolId);
  const activeCollectionTemplateId = useSelector((state) => state.project.activeCollectionTemplateId);
  const activeCollectionItemTemplateId = useSelector((state) => state.project.activeCollectionItemTemplateId);
  const listOfNodeStyles = useSelector((state) => props.class.map((cl) => 
  (cl.name)).toString().replaceAll(","," ") + 
  " renderedNode " 
  // + ((state.project.activeNodeId === props.data.id) ? "active " : " ") 
  // + ((state.project.hoveredNodeId === props.data.id) ? "hovered" : " ")
  );

  // console.log("rend node");

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
    if(activeNodeId !== props.data.id) {
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
    dispatch(setIsNodeSelectedFromNavigator(false));
    props.onClick([props.data.id, props?.class[0]?.name]);
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
    dispatch(setHoveredHtmlNode(props.data.id));
  }

  function handleMouseOut(e) {
    e.stopPropagation();
    dispatch(setHoveredHtmlNode(""));
  }

  function handleSectionMouseOver() {
    
  }
  
  let customStyle = {};
  if (activeProjectResolution === "1") {
    if(props?.data?.styles?.styles !== undefined) {

      customStyle = props?.data?.styles?.styles;
      customStyle = Object.fromEntries(
        Object.entries(customStyle).map(([key, value]) =>
          [_.camelCase(key), value]
        )
      )
      
    }
  }
  if (activeProjectResolution === "2") {
    if(props?.data?.styles?.tabletStyles !== undefined) {
      customStyle = props?.data?.styles?.tabletStyles;
    }
  }
  if (activeProjectResolution === "4") {
    if(props?.data?.styles?.mobileStyles !== undefined) {
      customStyle = props?.data?.styles?.mobileStyles;
    }
  }
  if (activeProjectResolution === "3") {
    if(props?.data?.styles?.portraitStyles !== undefined) {
      customStyle = props?.data?.styles?.portraitStyles;
    }
  }
  
  

  // "div"
  
  let elementHTML = (
    <div 
    style={customStyle}
    el_id={props.data.id}
    onClick={handleOnClick}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    className={listOfNodeStyles}
    >
      {props.children.map((el) => (
        <RenderedNode
          data={el}
          key={el.id}
          itemIndex = {props.itemIndex}
          renderedCollectionIndex={props.renderedCollectionIndex}
          collectionItems={props.collectionItems}
          fieldId={props.fieldId}
          children={el.children}
          onChange={(text, id) => props.onChange(text, id)}
          class={el.class}
          onClick={([nodeId,className]) => props.onClick([nodeId,className])}
        />
      ))}
    </div>
  );

  if (props.data.type === "sec") {
    elementHTML = (
      <div onMouseEnter={handleSectionMouseOver}>

      <div 
      style={customStyle}
      el_id={props.data.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <RenderedNode
            data={el}
            key={el.id}
            itemIndex = {props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
            children={useMemo(()=> el.children)}
            onChange={(text, id) => props.onChange(text, id)}
            class={el.class}
            onClick={([nodeId,className]) => props.onClick([nodeId,className])}
          />
        ))}
        
      </div>
      <AddSectionButton sectionId={props.data.id} />
      </div>
    );
  }

  if (props.data.type === "rich") {
    elementHTML = (
      <div 
      style={customStyle}
      el_id={props.data.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <div key={el.id}>
            <RenderedNode
              data={el}
              key={el.id}
              itemIndex = {props.itemIndex}
              renderedCollectionIndex={props.renderedCollectionIndex}
              children={el.children}
              onChange={(text, id) => props.onChange(text, id)}
              class={el.class}
              onClick={([nodeId,className]) => props.onClick([nodeId,className])}
            />
          </div>
        ))}
      </div>
    );
  }

  if (props.data.type === "sym") {
    elementHTML = (
      <div 
      style={customStyle}
      id={props.data.id}
      el_id={props.data.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      >
        <div 
        onDoubleClick={() => (editedSymbolId.symbolId === "") && dispatch(makeSymbolEditable({symbolId:props.data.symbolId, elementId: props.data.id}))} 
        className={"symbol-box-wrapper" + 
        ((editedSymbolId.symbolId === props.data.symbolId &&
          editedSymbolId.elementId === props.data.id) ? " active" : "")}
        style={{position: "relative", height: "0"}}>
          <div symbol_id={props.data.id} className="symbol-wrapper" style={{width: "100%", height: "40px"}}></div>
        </div>

        {props.children.map((el) => (
          <RenderedNode
            data={el}
            key={el.id}
            children={el.children}
            class={el.class}

            itemIndex = {props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
            onChange={(text, id) => props.onChange(text, id)}
            onClick={([nodeId,className]) => props.onClick([nodeId,className])}
          />
        ))}
      </div>
    );
  }

  // Collection List
  if (props.data.type === "col") {

    let renderedCollectionIndex = collections.map(x => {
      return x.id;
    }).indexOf(props.data.cmsCollectionId);

    elementHTML = (
      <div 
      style={customStyle}
      el_id={props.data.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
          >
            {collections[renderedCollectionIndex]?.items.map((item,itemIndex) => (
              <div key={item.id}> 
              {props.children.map((el) => (
                <RenderedNode
                  data={el}
                  cmsCollectionId={el.cmsCollectionId}
                  cmsFieldId={el.cmsFieldId}
                  key={el.id}
                  itemIndex = {itemIndex}
                  renderedCollectionIndex={renderedCollectionIndex}
                  collectionItems={collections[renderedCollectionIndex]?.items[itemIndex].data}
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

  if (props.data.type === "img") {
    let imageSrc = props.data?.src;
    
    if(props.data.cmsFieldId) {
      imageSrc = collections[props.renderedCollectionIndex]?.items[props.itemIndex].data.find(({ fieldId }) => fieldId === props.data.cmsFieldId)?.fieldValue
    }
    elementHTML = (
      <img 
      style={customStyle}
      src={(imageSrc !== undefined) ? "https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+imageSrc+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a" : Placeholder}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      el_id={props.data.id}
      className={listOfNodeStyles}
      />
    );
  }

  let nodeText = props.data.title;
  if (props.data.type === "h" || props.data.type === "p") {
    if(nodesEditMode === "cmsTemplate" && props.data.cmsFieldId !== "" && props.data.cmsFieldId !== undefined) {
      nodeText = collections.find(({ id }) => id === activeCollectionTemplateId)?.items?.find(({id}) => id === activeCollectionItemTemplateId).data.find(({ fieldId }) => fieldId === props.data.cmsFieldId)?.fieldValue;
    }

    if(props.collectionItems) {
      if (props.data.cmsFieldId === "") {
        nodeText = props.data.title;
      } else {
        nodeText = props.collectionItems.find(({ fieldId }) => fieldId === props.data.cmsFieldId)?.fieldValue;
      }
    }

    if(nodeText === undefined) {
      nodeText = "empty"
    }
    
  }


  if (props.data.type === "h") {
    elementHTML = (
      <ContentEditable
        style={customStyle}
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
        el_id={props.data.id}
        tagName={(props.data?.subtype !== undefined) ? props.data.subtype : "h1"}
        html={nodeText}
        disabled={!editable}
      />
    );
  }

  if (props.data.type === "p") {
    elementHTML = (
      <ContentEditable
        style={customStyle}
        className={listOfNodeStyles}
        el_id={props.data.id}
        tagName="p"
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        html={nodeText}
        disabled={!editable}
      />
    );
  }

  if (props.data.type === "l") {
    elementHTML = (
      <div 
      style={customStyle}
      el_id={props.data.id}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <RenderedNode
            data={el}
            key={el.id}
            itemIndex = {props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
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

export default React.memo(RenderedNode);
