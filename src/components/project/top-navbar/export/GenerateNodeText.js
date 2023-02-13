function isCmsField(node) {
  return node?.cmsFieldId !== undefined && node?.cmsFieldId !== ''
}

export default function generateNodeText(node, collectionItem, item) {
  // Default Text
  if (!isCmsField(node)) {
    return node.title
  }
  // Collection List
  if (collectionItem !== null) {
    if (node.cmsFieldId === '0') {
      return collectionItem.name
    }
    return collectionItem.data?.find(
      ({ fieldId }) => fieldId === node.cmsFieldId
    )?.fieldValue
  }
  // Collection Page
  if (node.cmsFieldId === '0') {
    return item.name
  }
  return item.data?.find(({ fieldId }) => fieldId === node.cmsFieldId)
    ?.fieldValue
}
