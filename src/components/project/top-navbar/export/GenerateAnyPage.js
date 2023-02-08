import { checkIfNodeContainesStyle } from '../../../../utils/nodes-editing'
import generateHead from './GenerateHead'
import generateNodeText from './GenerateNodeText'
import generateStylesList from './GenerateStyleList'
import getImgSrc from './GetImgSrc'
import GetInputData from './GetInputData'
import GetLinkHref from './GetLinkHref'
import getStyleUrlDots from './GetStyleUrlDots'
import replaceCmsFieldsInMetaData from './ReplaceCmsFieldsInMetaData'
import transformTypeIntoHtml from './TransformTypeIntoHtml'

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
      checkIfNodeContainesStyle(node) &&
        (generatedHTML += `el='${node.id.slice(0, 8)}' `)
      type === 'a' && (generatedHTML += GetLinkHref(node, pages))
      type === 'img' && (generatedHTML += getImgSrc(node, styleURLDots))
      type === 'input' && (generatedHTML += GetInputData(node))
      node.type === 'nav_tr' && (generatedHTML += 'nav-trigger ')
      node.type === 'nav_l' && (generatedHTML += 'nav-list ')
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

  generatedHTML += `<script>document.querySelector('[nav-trigger]').addEventListener("click", function() {document.querySelector('[nav-list]').classList.toggle('is-open')});</script>`
  generatedHTML += ` </body></html>`
  return generatedHTML
}
