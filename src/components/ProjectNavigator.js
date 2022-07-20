import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import NavigationNodeFolder from "./NavigationNodeFolder";

import { deleteNodeByIdInPreRenderedHTMLNodes, setActiveNodeAndStyle, setHoveredNodeId, setPreRenderedHTMLNodes } from "../features/pre-rendered-html-nodes";

export default function ProjectNavigator() {
    
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    
    
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    useEffect(() => {
      setItems(preRenderedHTMLNodes);
    },[preRenderedHTMLNodes]);
    return (
      <div className={"navigatorWrapper "+ ((activeProjectTab === "Navigator") ? "active" : "" )}>
        <div className="projectTabTitleBox">Navigator</div>

         {preRenderedHTMLNodes.map((node) => (
          <div key={node.id}>
              <NavigationNodeFolder parents={[]} node={node} depth={0} />
          </div>
        ))} 
      </div>
    )
}