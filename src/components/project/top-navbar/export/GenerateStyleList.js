export default function generateStylesList(node, preRenderedStyles) {
  const listOfSubStyles = preRenderedStyles.find(
    ({ id }) => id === node?.class?.[0]?.id
  )?.childrens

  return node.class
    .map((cl, index) => {
      if (index !== 0 && cl.id !== '') {
        const styleDefaultName = listOfSubStyles?.[index - 1]?.defaultName
        if (styleDefaultName !== undefined) {
          return (
            styleDefaultName.replaceAll(' ', '-').toLowerCase() + '-' + cl.name
          )
        }
      }
      return cl.name
    })
    .toString()
    .replaceAll(',', ' ')
}
