export default function getStyleUrlDots(type, depth) {
  let styleURLDots = '../'
  if (type === 'page') {
    styleURLDots = ''
    for (let i = 1; i < depth; i++) {
      styleURLDots += '../'
    }
    depth === 1 && (styleURLDots = './')
  }
  return styleURLDots
}
