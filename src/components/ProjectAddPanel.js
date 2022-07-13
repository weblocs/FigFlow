import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import AddNodeButton from "./AddNodeButton";
import AddNodeButtonList from "./AddNodeButtonList";
import NavigationNodeFolder from "./NavigationNodeFolder";

export default function ProjectAddPanel() {
    
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    return (
      <div className={"navigatorWrapper "+ ((activeProjectTab === "Add") ? "active" : "" )}>
        <div className="projectTabTitleBox">Add</div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <AddNodeButton type="div" text="Div" />
                <AddNodeButton type="h" text="Heading" />
                <AddNodeButton type="p" text="Paragraph" />
                <AddNodeButton type="img" text="Image" />
                <AddNodeButton type="l" text="Link Block" />
                <AddNodeButton type="col" text="Collection" />
                <AddNodeButton type="sec" text="Section" />
                <AddNodeButton type="sym" text="Symbol" />
                <AddNodeButton type="rich" text="Rich Box" />
            </div>
            
      </div>
    )
}