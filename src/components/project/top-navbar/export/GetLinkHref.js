export default function GetLinkHref(node, pages) {
  const pageSlug = pages.find(({ id }) => id === node.link)?.slug
  return `href=${pageSlug} `
}
