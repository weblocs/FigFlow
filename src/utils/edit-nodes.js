export function editNodeTitleById(nodes, id, title) {
  let res;
  let startNodes = JSON.stringify(nodes);

  function findNode(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        startNodes = startNodes.replace(
          JSON.stringify(nodes[i]),
          JSON.stringify(nodes[i]).replace(nodes[i].title, title)
        );
        res = JSON.parse(startNodes);
        break;
      }
      if (nodes[i].children) {
        findNode(nodes[i].children, id);
      }
    }
  }

  findNode(nodes, id);

  return res;
}

export function deleteNodeById(nodes, id) {
  let res;
  let startNodes = JSON.stringify(nodes);

  function findNode(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        startNodes = startNodes.replace("," + JSON.stringify(nodes[i]), "");
        startNodes = startNodes.replace(JSON.stringify(nodes[i]) + ",", "");
        startNodes = startNodes.replace(JSON.stringify(nodes[i]), "");

        console.log(startNodes);
        res = JSON.parse(startNodes);
        break;
      }
      if (nodes[i].children) {
        findNode(nodes[i].children, id);
      }
    }
  }

  findNode(nodes, id);

  return res;
}
