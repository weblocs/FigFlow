import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import NavigationNodeFolder from "./NavigationNodeFolder";

import { deleteNodeByIdInPreRenderedHTMLNodes, setActiveNodeId, setHoveredNodeId, setPreRenderedHTMLNodes } from "../../../../features/pre-rendered-html-nodes";
import AddNodeButton from "./AddNodeButton";
import NavigationNodeSection from "./NavigationNodeSection";

export default function ProjectNavigator() {
    
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    
    
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    useEffect(() => {
      setItems(preRenderedHTMLNodes);
    },[preRenderedHTMLNodes]);


    if (activeProjectTab === "Navigator") {
      return (
        <div className={"navigatorWrapper active"}>
          
          <div style={{position: "sticky", top: "0", zIndex: "1"}}>
            <div className="projectTabTitleBox">Add</div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <AddNodeButton type="div" text="Div" />
                <AddNodeButton type="h" text="Heading" />
                <AddNodeButton type="p" text="Paragraph" />
                <AddNodeButton type="img" text="Image" />
                <AddNodeButton type="l" text="Link" />
                <AddNodeButton type="col" text="Collection" />
                <AddNodeButton type="sec" text="Layout Wrap" />
                <AddNodeButton type="sym" text="Symbol Wrap" />
                <AddNodeButton type="rich" text="Rich Wrap" />
            </div>
            <div className="projectTabTitleBox">Navigator</div>
          </div>
          
          <div id="nodes-navigator" style={{overflowY: "scroll", height: "calc(100vh - 193px)"}}>

           {preRenderedHTMLNodes.map((node) => 
                <NavigationNodeFolder parents={[]} node={node} depth={0} key={node.id} />
           )}

            {/* {preRenderedHTMLNodes.map((node) => 
                <NavigationNodeSection key={node.id} node={node} />
            )} */}

          </div>
        </div>
      )
      }
    
}