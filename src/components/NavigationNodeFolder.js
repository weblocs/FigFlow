import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationNodeItem from "./NavigationNodeItem";

 function NavigationNodeFolder ({node, depth}) {

    if(node?.children?.length > 0) {
        return (
            <div>
                <NavigationNodeItem node={node} depth={depth} />
                {node.children.map((nodeChild) => (
                <div className="navigation-node-folder" key={nodeChild.id}>
                    <NavigationNodeFolder node={nodeChild} depth={depth + 1} /> 
                </div>
            ))}
            </div>
        )
    } else {
        return (
            <NavigationNodeItem node={node} depth={depth} />
        )
    }
}

export default NavigationNodeFolder;
 