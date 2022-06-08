export function getIndexOfElementInArrayById(styleNodes, id) {
  let res;
  for (let i = 0; i < styleNodes.length; i++) {
    if (styleNodes[i].id === id) {
      res = i;
    }
  }
  return res;
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
      _classes.forEach(createTempClassesPortrait)
    );
    (activeResolution === "4") && (
      _classes.forEach(createTempClassesMobile)
    );
    

    function createTempClasses(_class, i) {
      tempName = _classes[i].name;
      (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      tempClasses.push({name:tempName, styles: _classes[i].styles});
    }

    function createTempClassesTablet(_class, i) {
      tempName = _classes[i].name;
      (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i].tabletStyles) && ( tempClasses.push({name:tempName, styles: _classes[i].tabletStyles}));
    }

    function createTempClassesPortrait(_class, i) {
      tempName = _classes[i].name;
      (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i].portraitStyles) && ( tempClasses.push({name:tempName, styles: _classes[i].portraitStyles}));
    }

    function createTempClassesMobile(_class, i) {
      tempName = _classes[i].name;
      (_classes[i].parents.length == 1) && (tempName = _classes[i].parents[0].name + "." + _classes[i].name);
      (_classes[i].mobileStyles) && ( tempClasses.push({name:tempName, styles: _classes[i].mobileStyles}));
    }
    
    // Converting preRenderedStyles (JSON) into renderedStyles (CSS)
    return JSON.stringify(tempClasses)
    .replaceAll("_","-")
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

export function setActiveStyleNameByAcitveNode(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
        return nodes[i].class[nodes[i].class.length - 1].name;
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
          response[1] = nodes[i]?.class[nodes[i].class.length - 1]?.name;
          response[2] = nodes[i]?.class[nodes[i].class.length - 1]?.id;

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

