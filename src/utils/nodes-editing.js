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
    return JSON.stringify(_classes)
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