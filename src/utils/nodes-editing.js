

export function getIndexOfElementInArrayById(styleNodes, id) {
  let res;
  for (let i = 0; i < styleNodes.length; i++) {
    if (styleNodes[i].id === id) {
      res = i;
    }
  }
  return res;
}



export function getResolutionPathName(resolutionNumber, state) {

  function getState(resolution) {
    if(state !== "default") {
      return resolution + "-" + state;
    }
    return resolution
  }

  if (resolutionNumber === "1") {
    return getState("styles");
  }
  if (resolutionNumber === "2") {
    return getState("tabletStyles")
  }
  if (resolutionNumber === "3") {
    return getState("mobileStyles")
  }
  if (resolutionNumber === "4") {
    return getState("portraitStyles")
  }
  if (resolutionNumber === "5") {
    return getState("mediumDesktopStyles")
  }
  if (resolutionNumber === "6") {
    return getState("largeDesktopStyles")
  }
  if (resolutionNumber === "7") {
    return getState("xLargeDesktopStyles")
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
  if(sizeResolution === "1") {
    return true
  }
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

export function JSONtoCSS (_classes, activeResolution, activeState) {
  
    let tempClasses = [];
    let tempName = "";
    let tempResolution = "";
    let styleState = "";


    styleState = "default";
    for(let j = 1; j <= 7; j++) {
      tempResolution = j.toString();
      if (isStyleContained(activeResolution,tempResolution)) {
        _classes.forEach(createTempClassesResolution)
      }
    }

    styleState = "hover";
    for(let j = 1; j <= 7; j++) {
      tempResolution = j.toString();
      (isStyleContained(activeResolution,tempResolution)) && (
        _classes.forEach(createTempClassesResolution)
      );
    }

    function createTempClassesResolution(_class, i) {
      console.log(_classes[i].name + " - " + styleState);
      tempName = _classes[i].name;
      if(styleState === "hover") {
        tempName = tempName + ":hover, .d2g3-is-hover ." + tempName + ".renderedNode.active";
      } 
      let resolutionPathName = getResolutionPathName(tempResolution, styleState);
      (_classes[i][resolutionPathName]) && ( tempClasses.push({name:tempName, styles: _classes[i][resolutionPathName]}));
      _classes[i].childrens?.forEach((childStyle) => {
        childStyle.options.forEach((option) => {
          let optionName = _classes[i].name + "."
          + ((childStyle?.defaultName !== undefined) ? (childStyle.defaultName?.replaceAll(" ","-").toLowerCase() + "-") : "") 
          + option.name;
          if(styleState === "hover") {
            optionName = optionName + ":hover, .d2g3-is-hover ." + optionName  + ".renderedNode.active"
          } 
          (option[resolutionPathName]) && ( tempClasses.push({
            name: optionName, 
          styles: option[resolutionPathName]}));
        })
      });
    }


    let tempStyle = "* {-webkit-font-smoothing: antialiased;}\n";
    console.log(tempClasses);
    tempClasses.forEach((item) => {
      tempStyle += "." + item.name + "{";
      
      for (const [key, value] of Object.entries(item.styles)) {
        tempStyle += key + ": " + value + ";";
      }
      tempStyle += "}\n"
    })

    return tempStyle;
    
    // Converting preRenderedStyles (JSON) into renderedStyles (CSS)
    // return "* {-webkit-font-smoothing: antialiased;} " + JSON.stringify(tempClasses)
    // .replaceAll("[","")
    // .replaceAll("]","")
    // .replaceAll('"',"")
    // .replaceAll('{name:',"\n.")
    // .replaceAll(',styles:',"")
    // .replaceAll("}},","}")
    // .replaceAll("}}","}");
    // .replaceAll(",",";");
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
