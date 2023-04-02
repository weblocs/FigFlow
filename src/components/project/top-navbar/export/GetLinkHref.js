function isCmsPageLink(node) {
  return node?.cmsLinkConnect === true
}

export default function GetLinkHref(node, pages, collection, collectionItem) {
  let pageSlug = ''
  if (!isCmsPageLink(node)) {
    pageSlug = '/' + pages.find(({ id }) => id === node.link)?.slug
    if (pageSlug === '') pageSlug = '/'
  } else {
    pageSlug = '/' + collection?.slug + '/' + collectionItem?.slug
  }
  return `href=${pageSlug} `
}
