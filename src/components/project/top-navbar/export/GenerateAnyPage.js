import generateHead from './GenerateHead'
import generateNodeText from './GenerateNodeText'
import generateStylesList from './GenerateStyleList'
import getImgSrc from './GetImgSrc'
import GetInputData from './GetInputData'
import GetLinkHref from './GetLinkHref'
import getStyleUrlDots from './GetStyleUrlDots'
import replaceCmsFieldsInMetaData from './ReplaceCmsFieldsInMetaData'
import transformTypeIntoHtml from './TransformTypeIntoHtml'
import updateDataIfCollection from './UpdateDataIfCollection'

function hasChildren(node) {
  return node.children.length > 0
}

function isNodeText(node) {
  const type = node.type
  return type === 'h' || type === 'p' || type === 'a'
}

export default function generateAnyPage(
  preRenderedStyles,
  type,
  collection,
  item,
  nodes,
  depth,
  metaTitle,
  metaDescription,
  collections,
  pages,
  slug
) {
  if (type === 'collection') {
    nodes = collection.preRenderedHTMLNodes
    metaTitle = replaceCmsFieldsInMetaData('metaTitle', collection, item)
    metaDescription = replaceCmsFieldsInMetaData(
      'metaDescription',
      collection,
      item
    )
  }

  const styleURLDots = getStyleUrlDots(type, depth, slug)

  let generatedHTML = generateHead(
    metaTitle,
    metaDescription,
    styleURLDots,
    slug
  )

  function generateHtmlNodes(nodes, collectionItem) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const type = transformTypeIntoHtml(node)
      const nodeStyleList = generateStylesList(node, preRenderedStyles)
      generatedHTML += `<${type} class="${nodeStyleList}" `
      generatedHTML += `el='${nodes[i].id}' `
      type === 'a' && (generatedHTML += GetLinkHref(node, pages))
      type === 'img' && (generatedHTML += getImgSrc(node, styleURLDots))
      type === 'input' && (generatedHTML += GetInputData(node))
      generatedHTML += `>`

      if (node.type === 'col') {
        const activeCollection = collections.find(
          ({ id }) => id === node.cmsCollectionId
        )
        activeCollection.items.forEach((item) => {
          generateHtmlNodes(node.children, item)
        })
      } else {
        if (hasChildren(node)) {
          generateHtmlNodes(node.children, collectionItem)
        } else {
          if (isNodeText(node)) {
            generatedHTML += generateNodeText(node, collectionItem, item)
          }
        }
      }

      generatedHTML += `</${type}>`
    }
  }

  generateHtmlNodes(nodes, null)

  // generatedHTML += `
  // <!-- Google Tag Manager (noscript) -->
  // <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4KQZS"
  // height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  // <!-- End Google Tag Manager (noscript) -->`
  generatedHTML += ` </body></html>`
  return generatedHTML
}
