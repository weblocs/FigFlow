export default function updateDataIfCollection(type, collection, item) {
  if (type === 'collection') {
    const nodes = collection.preRenderedHTMLNodes
    const metaTitle = replaceCmsFieldsInMetaData('metaTitle', collection, item)
    const metaDescription = replaceCmsFieldsInMetaData(
      'metaDescription',
      collection,
      item
    )
    return [nodes, metaTitle, metaDescription]
  }
}
