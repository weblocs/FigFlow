export function getIndexOfElementInArrayByName(nodes, name) {
    let res;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].name === name) {
        res = i;
      }
    }
    return res;
}

export function JSONtoCSS (_classes) {


    let tempClasses = [];
    let tempName = "";
    
    _classes.forEach(createTempClasses);

    function createTempClasses(_class, i) {
      tempName = _classes[i].name;
      if( _classes[i].parents.length == 1) { tempName = _classes[i].parents[0].name + "." + _classes[i].name };
      tempClasses.push({name:tempName, styles: _classes[i].styles});
    };



    console.log(tempClasses);
    
    // Converting preRenderedStyles (JSON) into renderedStyles (CSS)
    return JSON.stringify(tempClasses)
    .replaceAll("_","-")
    .replaceAll("[","")
    .replaceAll("]","")
    .replaceAll('"',"")
    .replaceAll('{name:',".")
    .replaceAll(',styles:',"")
    .replaceAll("}},","}")
    .replaceAll("}}","}")
    .replaceAll(",",";");
}