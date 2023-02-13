export default function transformTypeIntoHtml(node) {
  if (node.type === 'sec') {
    return 'div'
  }
  if (node.type === 'sym') {
    return 'div'
  }
  if (node.type === 'rich_text') {
    return 'div'
  }
  if (node.type === 'rich') {
    return 'div'
  }
  if (node.type === 'h') {
    return 'h2'
  }
  if (node.type === 'col') {
    return 'div'
  }
  if (node.type === 'i') {
    return 'input'
  }
  if (node.type === 'nav_tr') {
    return 'div'
  }
  if (node.type === 'nav_l') {
    return 'div'
  }
  if (node.type === 'l') {
    return 'a'
  }
  return node.type
}
