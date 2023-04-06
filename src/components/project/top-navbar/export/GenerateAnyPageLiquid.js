import { checkIfNodeContainesStyle } from '../../../../utils/nodes-editing'
import generateHead from './GenerateHead'
import GenerateHeadLiquid from './GenerateHeadLiquid'
import generateNodeText from './GenerateNodeText'
import generateStylesList from './GenerateStyleList'
import getImgSrcLiquid from './GetImgSrcLiquid'
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
  return type === 'h' || type === 'p' || node.type === 'a'
}

export default function GenerateAnyPageLiquid(
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
  slug,
  pageScripts,
  allScripts,
  libraries,
  projectSettings
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

  const pageScriptsWithData = pageScripts.map((script) => {
    const scriptData = allScripts.find(({ id }) => id === script.id)
    return {
      ...scriptData,
      ...script,
    }
  })

  const requiredLibraries = []

  pageScriptsWithData.forEach((script) => {
    script.requires.forEach((libraryId) => {
      if (!requiredLibraries.includes(libraryId)) {
        requiredLibraries.push(libraries.find(({ id }) => id === libraryId))
      }
    })
  })

  const styleURLDots = getStyleUrlDots(type, depth, slug)

  let pageSlug = `page-${slug}`
  if (slug === 'index') {
    pageSlug = 'index'
  }

  let generatedHTML = GenerateHeadLiquid(
    metaTitle,
    metaDescription,
    styleURLDots,
    pageSlug,
    projectSettings
  )

  function generateHtmlNodes(nodes, collection, collectionItem) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const type = transformTypeIntoHtml(node)
      const nodeStyleList = generateStylesList(node, preRenderedStyles)
      if (node.type === 'rich_text') {
        nodeStyleList = 'w_rich-text ' + nodeStyleList
      }
      generatedHTML += `<${type} `
      nodeStyleList !== '' && (generatedHTML += `class="${nodeStyleList}" `)
      checkIfNodeContainesStyle(node) &&
        (generatedHTML += `el='${node.id.slice(0, 8)}' `)
      type === 'a' &&
        (generatedHTML += GetLinkHref(node, pages, collection, collectionItem))
      type === 'img' &&
        (generatedHTML += getImgSrcLiquid(
          node,
          styleURLDots,
          collectionItem,
          item
        ))
      if (type === 'input' || type === 'textarea') {
        generatedHTML += GetInputData(node)
      }
      node.type === 'form' && (generatedHTML += `name="${node.inputName}" `)
      node.type === 'form' && (generatedHTML += `method="post" `)
      node.type === 'form' && (generatedHTML += `netlify `)
      node.type === 'i' && (generatedHTML += `type="${node.inputType}" `)
      node.type === 'c' && (generatedHTML += `type="checkbox" `)
      node.type === 'r' && (generatedHTML += `type="radio" `)
      node.type === 'sub' &&
        (generatedHTML += `type="submit" value=${node.title} `)
      node.type === 'nav_tr' && (generatedHTML += 'nav-trigger ')
      node.type === 'nav_l' && (generatedHTML += 'nav-list ')
      if (
        (type === 'input' || type === 'textarea') &&
        node.inputRequired === 'true'
      ) {
        generatedHTML += `required `
      }
      if (node.type === 'r') {
        generatedHTML += `value="${node.inputRadioValue}" `
      }
      if (
        (type === 'input' || type === 'textarea') &&
        node.inputAutofocus === 'true'
      ) {
        generatedHTML += `autofocus `
      }
      generatedHTML += `>`

      if (node.type === 'col') {
        const activeCollection = collections.find(
          ({ id }) => id === node.cmsCollectionId
        )
        activeCollection.items.forEach((item) => {
          generateHtmlNodes(node.children, activeCollection, item)
        })
      } else {
        if (hasChildren(node)) {
          generateHtmlNodes(node.children, collection, collectionItem)
        } else {
          if (isNodeText(node)) {
            generatedHTML += generateNodeText(node, collectionItem, item)
          }
          if (node.type === 'rich_text') {
            generatedHTML += generateNodeText(node, collectionItem, item)
          }
          if (node.type === 'embed') {
            generatedHTML += node.embed
          }
        }
      }

      generatedHTML += `</${type}>`
    }
  }

  generateHtmlNodes(nodes, null, null)

  generatedHTML += `<script>document.querySelector('[nav-trigger]').addEventListener("click", function() {document.querySelector('[nav-list]').classList.toggle('is-open')});</script>`
  generatedHTML += '\n'

  {
    requiredLibraries.map((library) => {
      if (library.type === 'js') {
        generatedHTML += `<script src="${library.url}"></script>`
      }
      if (library.type === 'css') {
        generatedHTML += `<link rel="stylesheet" href="${library.url}">`
      }
    })
  }

  if (pageScripts !== null && pageScripts !== undefined) {
    pageScripts.forEach((script) => {
      const scriptData = allScripts.find((s) => s.id === script.id)
      if (scriptData.css !== '') {
        generatedHTML += `<style>${scriptData.css}</style>`
      }
      if (scriptData.js !== '') {
        generatedHTML += `<script>${scriptData.js}</script>`
      }
    })
  }

  generatedHTML += ` </body></html>`
  return generatedHTML
}
