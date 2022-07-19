import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import NavigationNodeFolder from "./NavigationNodeFolder";

export default function ProjectNavigator() {
    
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    useEffect(() => {
      setItems(preRenderedHTMLNodes);
    },[preRenderedHTMLNodes]);
    return (
      <div className={"navigatorWrapper "+ ((activeProjectTab === "Navigator") ? "active" : "" )}>
        <div className="projectTabTitleBox">Navigator</div>

        {/* <SortableTree
          items={items}
          onItemsChanged={dispatch(setPreRenderedHTMLNodes())}
          TreeItemComponent={React.forwardRef((props, ref) => (
            <SimpleTreeItemWrapper {...props} ref={ref}>
              <div>{props.item.type}</div>
            </SimpleTreeItemWrapper>
          ))}
        /> */}

        {preRenderedHTMLNodes.map((node) => (
          <div key={node.id}>
              <NavigationNodeFolder node={node} depth={0} />
          </div>
        ))}
      </div>
    )
}