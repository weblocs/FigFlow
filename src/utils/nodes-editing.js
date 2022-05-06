export function getIndexOfElement(nodes, name) {
    let res;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].name === name) {
        res = i;
      }
    }
    return res;
  }