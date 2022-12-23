function isCmsField(node) {
  return node?.cmsFieldId !== undefined && node?.cmsFieldId !== ''
}

export default function generateNodeText(node, collectionItem, item) {
  console.log(node)
  if (!isCmsField(node)) {
    return node.title
  } else {
    if (collectionItem !== null) {
      if (node.cmsFieldId === '0') {
        return collectionItem.name
      }
      return collectionItem.data?.find(
        ({ fieldId }) => fieldId === node.cmsFieldId
      )?.fieldValue
    } else {
      // return item.data?.find(({ fieldId }) => fieldId === node.cmsFieldId)
      //   ?.fieldValue
    }
  }

  return null
}
