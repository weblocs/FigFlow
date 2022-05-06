import React, { useState, useEffect } from "react";
import axios from "axios";

import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";
import Constants from "./const.js";
import Element from "./Element";

import AddHtmlNode from "./components/AddHtmlNode"

import saveProject from "./utils/save-project";
import {getIndexOfElement} from "./utils/nodes-editing"

import { useSelector, useDispatch } from 'react-redux'
import { setPreRenderedHTMLNodes, editTextByIdInPreRenderedHTMLNode, deleteNodeByIdInPreRenderedHTMLNodes, setPreRenderedStyles, editStyleByNameInPreRenderedStyles } from './features/pre-rendered-html-nodes'

export default function FigFlow(props) {

  const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
  const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
  const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)
  const dispatch = useDispatch()

  const [activeClass, setActiveClass] = useState("heading-2");
  
  
  function handleUpdatingClassStyle(_activeClass,_style,_value) {
    dispatch(editStyleByNameInPreRenderedStyles([_activeClass,_value]));
  }

  useEffect(() => {
    axios
      .get(
        Constants.BASE_API + "items"
      )
      .then((res) => {
        dispatch(setPreRenderedHTMLNodes([...res.data[0].items]));
        dispatch(setPreRenderedStyles([...res.data[0].preRenderedStyles]));        
      });
  }, []);



  return (
    <div>


      <style>{postRenderedStyles}</style>

      <button className="saveButton" onClick={() => saveProject(preRenderedHTMLNodes,preRenderedStyles)}>
        Save
      </button>

      <AddHtmlNode />
      

      <div className="projectWrapper">
        
        <SortableTree
          className="navigatorWrapper"
          canNodeHaveChildren={(node) => node.type === "div"}
          onChange={(treeData) => dispatch(setPreRenderedHTMLNodes([...treeData]))}
          isVirtualized={false}
          treeData={preRenderedHTMLNodes} 
          theme={FileExplorerTheme}
          
          generateNodeProps={({ node, path }) => ({
            title: (
              <div>
                <span className="typeSeparator">{node.type}</span>
                <span onClick={() => setActiveClass(node.class[0].name)}>{node.class[0].name}</span>
                
                <div
                  className="todoListItemDelete"
                  onClick={() => {
                    dispatch(deleteNodeByIdInPreRenderedHTMLNodes(node.id));
                  }}
                >x</div>
              </div>
            )
          })}
        />



        <div className="Project">
          {preRenderedHTMLNodes.map((el) => (
            <Element
              onChange={(text, id) => dispatch(editTextByIdInPreRenderedHTMLNode([id, text]))}
              type={el.type}
              id={el.id}
              key={el.id}
              title={el.title}
              children={el.children}
              class={el.class}
              onClick={(className) => setActiveClass(className)}
            />
          ))}
        </div>

        <div className="styleWrapper">

            {preRenderedStyles.map((el) => (
              <div key={el.name} onClick={() => setActiveClass(el.name)} className={"classElement " + ((activeClass == el.name) ? "active" : "")} >{el.name}</div>
            ))}

         <div>font size: {preRenderedStyles[getIndexOfElement(preRenderedStyles,activeClass)]?.styles.font_size}</div>
          <div style={{fontSize:"10px"}}>change to</div>
          <input onKeyPress={(e) => e.key === 'Enter' && handleUpdatingClassStyle(activeClass,"font_size",e.target.value)} />    
        
 {/* 
          <div>color: {preRenderedStyles[getIndexOfElement(preRenderedStyles,activeClass)].styles.color}</div>
          
          <div style={{fontSize:"10px"}}>change to</div>
          <input onKeyPress={(e) => e.key === 'Enter' && handleUpdatingClassStyle(activeClass,"color",e.target.value)} />    
         */}
        
        </div>
      </div>
    </div>
  );
}
