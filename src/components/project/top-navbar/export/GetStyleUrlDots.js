export default function getStyleUrlDots(type, depth, slug) {
  let styleURLDots = '../'
  const isIndex = slug === 'index'
  if (type === 'page') {
    styleURLDots = ''
    for (let i = 1; i < depth; i++) {
      styleURLDots += '../'
    }
    depth === 1 && (styleURLDots = '../')
    isIndex && (styleURLDots = '')
  }
  return styleURLDots
}

export function getFontsUrlDots(type, depth, slug) {
  let styleURLDots = '../'
  const isIndex = slug === 'index'
  if (type === 'page') {
    styleURLDots = ''
    for (let i = 1; i <= depth; i++) {
      styleURLDots += '../'
    }
    depth === 1 && (styleURLDots = '../')
    isIndex && (styleURLDots = '')
  }
  console.log(type, depth, slug, styleURLDots)
  return styleURLDots
}
