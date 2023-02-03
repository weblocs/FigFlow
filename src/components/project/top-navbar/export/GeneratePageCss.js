import { fullJSONtoCSS } from '../../../../utils/nodes-editing'

function hasChildren(node) {
  return node.children.length > 0
}

export default function generatePageCss(preRenderedStyles, nodes, swatches) {
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

  return (
    `*{-webkit-font-smoothing: antialiased;box-sizing: border-box;}body{margin:0;}img{display: block;width: 100%; height: auto;}` +
    fullJSONtoCSS(updatedPreRenderedStyles, swatches)
  )
  //   return generatedCSS
}
