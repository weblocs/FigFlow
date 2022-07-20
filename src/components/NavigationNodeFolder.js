import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationNodeItem from "./NavigationNodeItem";

 function NavigationNodeFolder ({parents, node, depth}) {

    if(node?.children?.length > 0) {
        return (
            <div>
                <NavigationNodeItem parents={parents} node={node} depth={depth} />
                {node.children.map((nodeChild) => (
                    <div className="navigation-node-folder" key={nodeChild.id}>
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

export default NavigationNodeFolder;
 