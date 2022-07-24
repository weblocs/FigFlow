{(false) ? (
  <SortableTree
    scaffoldBlockPxWidth={30}
    canNodeHaveChildren={(node) => node.type === "div" || node.type === "col" || node.type === "sec" || node.type === "rich" || node.type === "sym" || node.type === "l"}
    onChange={(treeData) => dispatch(setPreRenderedHTMLNodes(treeData))}
    isVirtualized={false}
    treeData={preRenderedHTMLNodes} 
    theme={FileExplorerTheme}
    generateNodeProps={({ node, path }) => ({
      title: (
        <div 
        onMouseOver={() => dispatch(setHoveredNodeId(node.id))}
        onMouseOut={() => dispatch(setHoveredNodeId(""))}

        className={"navigatorElement " + ((node.id == activeNodeId) ? "active " : " ") + ((node.id == hoveredNodeId) ? "hovered " : " ")} >
          <span className="typeSeparator">
            {node.type}
          </span>
          <span onClick={() => dispatch(setActiveNodeId({id: node.id}))}>
            {/* {node.type} */}
            {(node?.symbolId === undefined) ? ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : (projectSymbols.find( ({id}) => id === node.symbolId)?.name )}

            {/* {(node?.symbolId === undefined) ? ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : (projectSymbols.find( ({id}) => id === node.symbolId)?.name )} */}
          </span>
          
          <div
            className="deleteButton"
            onClick={() => {
              dispatch(deleteNodeByIdInPreRenderedHTMLNodes(node.id));
            }}
          >x</div>
        </div>
      )
    })}
  /> ) : <></>}