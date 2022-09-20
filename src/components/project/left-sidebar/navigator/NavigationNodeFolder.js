import React from "react";
import NavigationNodeItem from "./NavigationNodeItem";

 function NavigationNodeFolder ({parents, node, depth}) {

    if(node?.children?.length > 0) {
        return (
            <div className={((node.type === "sym") ? " symbol-nav-folder" : "")}>
                <NavigationNodeItem  parents={parents} node={node} depth={depth} />
                {
                    node.children.map((nodeChild) => (
                    <div className={"navigation-node-folder" + ((node?.expanded) ? " opened" : "")} key={nodeChild.id}>
                        <NavigationNodeFolder parents={[...parents, {id: node.id, name: node.type }]} node={nodeChild} depth={depth + 1} /> 
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <NavigationNodeItem  parents={parents} node={node} depth={depth} />
        )
    }
}

// export default NavigationNodeFolder;
export default React.memo(NavigationNodeFolder);
 