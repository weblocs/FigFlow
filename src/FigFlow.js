import React, { useEffect } from "react";
import axios from "axios";


import Constants from "./utils/const.js";

import RenderedNode from "./components/RenderedNode";
import AddPreRenderedNodeForm from "./components/AddPreRenderedNodeForm"
import ProjectNavigator from "./components/ProjectNavigator"

import saveProject from "./utils/save-load-project";
import {getIndexOfElementInArrayByName} from "./utils/nodes-editing"

import { useSelector, useDispatch } from 'react-redux'
import { setActiveNodeAndStyle, setActiveStyle, setPreRenderedHTMLNodes, editTextByIdInPreRenderedHTMLNode, deleteNodeByIdInPreRenderedHTMLNodes, setPreRenderedStyles, editStyleByNameInPreRenderedStyles, editStyleInPreRenderedStyles } from './features/pre-rendered-html-nodes'

export default function FigFlow() {

  const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
  const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
  const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)
  const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
  const activeStyleName = useSelector((state) => state.designerProjectState.activeStyleName)
  const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)

  const dispatch = useDispatch()
  

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

      <AddPreRenderedNodeForm />
      

      <div className="projectWrapper">
        
        <ProjectNavigator />

        <div className="Project">
          {preRenderedHTMLNodes.map((el) => (
            <RenderedNode
              onChange={(text, id) => dispatch(editTextByIdInPreRenderedHTMLNode([id, text]))}
              type={el.type}
              id={el.id}
              key={el.id}
              title={el.title}
              children={el.children}
              class={el.class}
              onClick={([nodeId,className]) => dispatch(setActiveNodeAndStyle([nodeId, className]))}
            />
          ))}
        </div>

        <div className="styleWrapper">
            {preRenderedStyles.map((el) => (
              <div key={el.name} onClick={() => dispatch(setActiveStyle(el.name))} className={"classElement " + ((activeStyleName == el.name) ? "active" : "")} >{el.name}</div>
            ))}
          <div>font size: {preRenderedStyles[activeStyleIndex]?.styles.font_size}</div>
          <div style={{fontSize:"10px"}}>change to</div>
          <input onKeyPress={(e) => e.key === 'Enter' && dispatch(editStyleInPreRenderedStyles(["font_size",e.target.value]))  } />
        </div>


      </div>
    </div>
  );
}
