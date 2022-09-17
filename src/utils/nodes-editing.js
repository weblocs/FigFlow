export function getIndexOfElementInArrayById(styleNodes, id) {
  let res;
  for (let i = 0; i < styleNodes.length; i++) {
    if (styleNodes[i].id === id) {
      res = i;
    }
  }
  return res;
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
    
    _classes.forEach(createTempClasses);

    (activeResolution === "2" || activeResolution === "3" || activeResolution === "4") && (
      _classes.forEach(createTempClassesTablet)
    );

    (activeResolution === "3" || activeResolution === "4") && (
      _classes.forEach(createTempClassesMobile)
    );

    (activeResolution === "3") && (
      _classes.forEach(createTempClassesPortrait)
    );
    

    function createTempClasses(_class, i) {
      tempName = _classes[i].name;
      // (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      tempClasses.push({name:tempName, styles: _classes[i].styles});
      _classes[i].childrens.forEach((childStyle) => {
        childStyle.options.forEach((option) => {
          tempClasses.push({name: tempName + "." + option.name, styles: option.styles});
        })
      });
    }

    function createTempClassesTablet(_class, i) {
      tempName = _classes[i].name;
      // (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i].tabletStyles) && ( tempClasses.push({name:tempName, styles: _classes[i].tabletStyles}));
      _classes[i].childrens.forEach((childStyle) => {
        childStyle.options.forEach((option) => {
          (option.tabletStyles) && ( tempClasses.push({name:tempName + "." + option.name, styles: option.tabletStyles}));
        })
      });
    }

    function createTempClassesPortrait(_class, i) {
      tempName = _classes[i].name;
      // (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i].portraitStyles) && ( tempClasses.push({name:tempName, styles: _classes[i].portraitStyles}));
      _classes[i].childrens.forEach((childStyle) => {
        childStyle.options.forEach((option) => {
          (option.portraitStyles) && ( tempClasses.push({name:tempName + "." + option.name, styles: option.portraitStyles}));
        })
      });
    }

    function createTempClassesMobile(_class, i) {
      tempName = _classes[i].name;
      // (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i].mobileStyles) && ( tempClasses.push({name:tempName, styles: _classes[i].mobileStyles}));
      _classes[i].childrens.forEach((childStyle) => {
        childStyle.options.forEach((option) => {
          (option.mobileStyles) && ( tempClasses.push({name:tempName + "." + option.name, styles: option.mobileStyles}));
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
