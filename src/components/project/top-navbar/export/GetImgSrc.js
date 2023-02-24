function isCmsField(node) {
  return node?.cmsFieldId !== undefined && node?.cmsFieldId !== ''
}

export default function getImgSrc(node, styleURLDots, collectionItem, item) {
  let imageSrc = ''
  // Default Image
  if (!isCmsField(node)) {
    imageSrc = node.src
  } else {
    // Collection List
    if (collectionItem !== null) {
      if (node.cmsFieldId === '0') {
        imageSrc = collectionItem.name
      }
      imageSrc = collectionItem.data?.find(
        ({ fieldId }) => fieldId === node.cmsFieldId
      )?.fieldValue
    } else {
      // Collection Page
      if (node.cmsFieldId === '0') {
        imageSrc = item.name
      }
      imageSrc = item.data?.find(
        ({ fieldId }) => fieldId === node.cmsFieldId
      )?.fieldValue
    }
  }

  const types = ['webp', 'avif', 'jpg', 'jpeg', 'png', 'gif', 'svg']
  types.forEach((type) => {
    if (imageSrc.slice(-4) === '-' + type) {
      imageSrc = imageSrc.slice(0, -4)
      imageSrc = imageSrc.concat('.' + type)
    }
    if (imageSrc.slice(-5) === '-' + type) {
      imageSrc = imageSrc.slice(0, -5)
      imageSrc = imageSrc.concat('.' + type)
    }
  })

  return (
    `src='${styleURLDots}assets/images/` +
    imageSrc +
    `'alt='${node.altText}' loading=` +
    (node?.isImgEager === 'true' ? '"eager"' : '"lazy"') +
    ' sizes="(max-width: 600px) 96vw, 700px" ' +
    ((node?.imgWidth !== 'undefined' || node?.imgWidth !== '') &&
      `width='${node?.imgWidth}' `) +
    ((node?.imgHeight !== 'undefined' || node?.imgHeight !== '') &&
      `height='${node?.imgHeight}' `)
  )
}
