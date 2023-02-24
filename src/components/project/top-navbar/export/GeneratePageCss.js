import {
  fullJSONtoCSS,
  getResolutionCssMedia,
  getResolutionPathName,
  renderFontCss,
} from '../../../../utils/nodes-editing'

function hasChildren(node) {
  return node.children.length > 0
}

export default function generatePageCss(
  preRenderedStyles,
  nodes,
  swatches,
  fonts,
  fontsURLDots
) {
  let usedCSSClasses = []
  function findUsedClasses(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      function isClassUsed(classId) {
        return usedCSSClasses.find(({ id }) => id === classId) !== undefined
          ? true
          : false
      }

      const options = []

      node?.class?.map((option, index) => {
        if (index !== 0 && option.name !== '') {
          options.push({ id: option.id, name: option.name })
        }
      })

      if (!isClassUsed(node?.class?.[0]?.id)) {
        usedCSSClasses.push({
          id: node?.class?.[0]?.id,
          className: node?.class?.[0]?.name,
          options: options,
        })
      } else {
        options.forEach((option) => {
          if (
            !usedCSSClasses
              ?.find(({ id }) => id === node?.class?.[0]?.id)
              ?.options.some(({ id }) => id === option?.id)
          ) {
            usedCSSClasses
              .find(({ id }) => id === node?.class?.[0]?.id)
              .options.push(option)
          }
        })
      }
      if (hasChildren(node)) {
        findUsedClasses(node.children)
      }
    }
  }

  findUsedClasses(nodes)

  let updatedPreRenderedStyles = preRenderedStyles
    .filter((style) => usedCSSClasses.some(({ id }) => id === style.id))
    .map((style) => {
      const childrens = style.childrens.map((child) => {
        const options = child.options
          .filter((option) => {
            return usedCSSClasses
              .find(({ id }) => id === style.id)
              ?.options.some(({ id }) => id === option.id)
          })
          .map((option) => {
            return option
          })

        return {
          ...child,
          options: options,
        }
      })

      return {
        ...style,
        childrens: childrens,
      }
    })

  function getInlineStyle(styles, id, swatches, isHover) {
    if (Object.keys(styles).length === 0) return ''
    let tempStyles = `[el="` + id.slice(0, 8) + `"]${isHover ? ':hover' : ''} {`
    for (const [key, value] of Object.entries(styles)) {
      const isPropertySwatch =
        value.charAt(0) === '{' && value.charAt(1) === '{'
      if (isPropertySwatch) {
        value = value.replaceAll('{{', '').replaceAll('}}', '')
        value = swatches?.find((swatch) => swatch.id === value)?.color
      }
      tempStyles += key + ': ' + value + ' !important;'
    }
    tempStyles += '}'
    return tempStyles
  }

  let inlineStyles = '/** Inline Style **/ '
  function getNodesInlineStyles(nodes, swatches, resolutionName) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      inlineStyles += getInlineStyle(
        node?.styles?.[resolutionName] || {},
        node.id,
        swatches,
        false
      )
      inlineStyles += getInlineStyle(
        node?.styles?.[resolutionName + '-hover'] || {},
        node.id,
        swatches,
        true
      )

      if (hasChildren(node)) {
        getNodesInlineStyles(node.children, swatches, resolutionName)
      }
    }
  }

  for (let i = 1; i <= 7; i++) {
    let resolutionNumber = i.toString()
    inlineStyles += getResolutionCssMedia(resolutionNumber) + '{'
    getNodesInlineStyles(
      nodes,
      swatches,
      getResolutionPathName(resolutionNumber, 'default')
    )
    inlineStyles += '}'
  }

  return (
    `*{-webkit-font-smoothing: antialiased;box-sizing: border-box;}body{margin:0;}img{display: block;width: 100%; height: auto;}` +
    fullJSONtoCSS(updatedPreRenderedStyles, swatches) +
    inlineStyles +
    renderFontCss(fonts, fontsURLDots)
  )
  //   return generatedCSS
}
