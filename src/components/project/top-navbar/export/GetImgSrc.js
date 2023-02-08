export default function getImgSrc(node, styleURLDots) {
  let imageSrc = node.src

  const types = ['webp', 'avif', 'jpg', 'jpeg', 'png', 'gif', 'svg']
  types.forEach((type) => {
    if (imageSrc.slice(-4) === '-' + type) {
      imageSrc = imageSrc.slice(0, -4)
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
