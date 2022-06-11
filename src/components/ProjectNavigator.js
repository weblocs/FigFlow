import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import NavigationNodeFolder from "./NavigationNodeFolder";

export default function ProjectNavigator() {
    
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    return (
      <div className={"navigatorWrapper "+ ((activeProjectTab === "Navigator") ? "active" : "" )}>
        <div className="projectTabTitleBox">Navigator</div>

        {preRenderedHTMLNodes.map((node) => (
          <div key={node.id}>
              <NavigationNodeFolder node={node} depth={0} />
          </div>
        ))}
      </div>
    )
}