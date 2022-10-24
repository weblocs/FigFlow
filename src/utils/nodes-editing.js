export function getIndexOfElementInArrayById(styleNodes, id) {
  let res;
  for (let i = 0; i < styleNodes.length; i++) {
    if (styleNodes[i].id === id) {
      res = i;
    }
  }
  return res;
}

export function getResolutionPathName(resolutionNumber) {
  if (resolutionNumber === "1") {
    return "styles"
  }
  if (resolutionNumber === "2") {
    return "tabletStyles"
  }
  if (resolutionNumber === "3") {
    return "mobileStyles"
  }
  if (resolutionNumber === "4") {
    return "portraitStyles"
  }
  if (resolutionNumber === "5") {
    return "mediumDesktopStyles"
  }
  if (resolutionNumber === "6") {
    return "largeDesktopStyles"
  }
  if (resolutionNumber === "7") {
    return "xLargeDesktopStyles"
  }
}

export function getResolutionName(resolutionNumber) {
  if (resolutionNumber === "1") {
    return "Base (Desktop)"
  }
  if (resolutionNumber === "2") {
    return "Tablet"
  }
  if (resolutionNumber === "3") {
    return "Mobile"
  }
  if (resolutionNumber === "4") {
    return "Portrait"
  }
  if (resolutionNumber === "5") {
    return "Medium Desktop"
  }
  if (resolutionNumber === "6") {
    return "Large Desktop"
  }
  if (resolutionNumber === "7") {
    return "X Large Desktop"
  }
}

export function isStyleContained(resolutionNumber, sizeResolution) {
  if(sizeResolution === "2") {
    return (resolutionNumber === "2" || resolutionNumber === "3" || resolutionNumber === "4" )
  }
  if(sizeResolution === "3") {
    return (resolutionNumber === "3" || resolutionNumber === "4")
  }
  if(sizeResolution === "4") {
    return (resolutionNumber === "4")
  }
  if(sizeResolution === "5") {
    return (resolutionNumber === "5" || resolutionNumber === "6" || resolutionNumber === "7")
  }
  if(sizeResolution === "6") {
    return (resolutionNumber === "6" || resolutionNumber === "7")
  }
  if(sizeResolution === "7") {
    return (resolutionNumber === "7")
  }
}



export function doesStylePropertyBelongToActiveStyle(activeStyleObject, property) {
  if (activeStyleObject?.[property] !== undefined) {
    return true;
  }
  return false;
}

export function doesStylePropertyIsInlineFx(activeNodeObject, property) {
  if (activeNodeObject?.styles?.styles?.[property] !== undefined) {
    return true;
  }
  return false;
}

export function getIdOfPreRenderedStyleByName(styleNodes, styleName, styleParents) {
  let res;
  for (let i = 0; i < styleNodes.length; i++) {
    if (styleNodes[i].name === styleName && JSON.stringify(styleNodes[i].parents) === JSON.stringify(styleParents)) {
        res = styleNodes[i].id;
    }
  }
  return res;
}

export function JSONtoCSS (_classes, activeResolution) {
  
    let tempClasses = [];
    let tempName = "";
    
    let resolution = "1";
    _classes.forEach(createTempClassesResolution)

    resolution = "2";
    (isStyleContained(activeResolution,resolution)) && (
      _classes.forEach(createTempClassesResolution)
    );

    resolution = "4";
    (isStyleContained(activeResolution,resolution)) && (
      _classes.forEach(createTempClassesResolution)
    );

    resolution = "3";
    (isStyleContained(activeResolution,resolution)) && (
      _classes.forEach(createTempClassesResolution)
    );

    resolution = "5";
    (isStyleContained(activeResolution,resolution)) && (
      _classes.forEach(createTempClassesResolution)
    );

    resolution = "6";
    (isStyleContained(activeResolution,resolution)) && (
      _classes.forEach(createTempClassesResolution)
    );

    resolution = "7";
    (isStyleContained(activeResolution,resolution)) && (
      _classes.forEach(createTempClassesResolution)
    );

    function createTempClassesResolution(_class, i) {
      tempName = _classes[i].name;
      // (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i][getResolutionPathName(resolution)]) && ( tempClasses.push({name:tempName, styles: _classes[i][getResolutionPathName(resolution)]}));
      _classes[i].childrens.forEach((childStyle) => {
        childStyle.options.forEach((option) => {
          (option[getResolutionPathName(resolution)]) && ( tempClasses.push({name:tempName + "."
          + ((childStyle?.defaultName !== undefined) ? (childStyle.defaultName?.replaceAll(" ","-").toLowerCase() + "-") : "") 
          + option.name, styles: option[getResolutionPathName(resolution)]}));
        })
      });
    }
    
    // Converting preRenderedStyles (JSON) into renderedStyles (CSS)
    return "* {-webkit-font-smoothing: antialiased;} " + JSON.stringify(tempClasses)
    .replaceAll("[","")
    .replaceAll("]","")
    .replaceAll('"',"")
    .replaceAll('{name:',"\n.")
    .replaceAll(',styles:',"")
    .replaceAll("}},","}")
    .replaceAll("}}","}")
    .replaceAll(",",";");
}


export function setStylesInActiveNode(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
  if (nodes[i].id === id) {
      return nodes[i].class;
      break;
  }
  if (nodes[i].children) {
      setStylesInActiveNode(nodes[i].children, id);
  }
  }
}

export function setStylesInActiveNodeAndActiveStyle(nodes, id) {
  let response = [];
  function findNode(nodes,id) {
    for (let i = 0; i < nodes.length; i++) {
      
      if (nodes[i].id === id) {
          response[0] = nodes[i]?.class;
          for(let i = nodes[i].class.length; i > 0; i--) {
            
            response[1] = nodes[i]?.class[i - 1]?.name;
            response[2] = nodes[i]?.class[i - 1]?.id;
          }
          
          break;
      }

      if (nodes[i].children) {
          findNode(nodes[i].children, id);
      }

    }
  }
  findNode(nodes,id);

  return response;
}


export function findActiveNode(nodes, id) {
  let response;
  function findNode(_nodes) {
      for (let i = 0; i < _nodes?.length; i++) {
          if(_nodes[i].id === id) {
              response = _nodes[i];
          }
          if(_nodes[i].children?.length > 0) {
              findNode(_nodes[i].children);
          }
      }
  }  
  findNode(nodes);
  return response;
} 
