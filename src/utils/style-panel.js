export function findStyleUnit(styleValue) {
  if (styleValue?.includes('auto')) {
    return '-'
  }
  if (styleValue?.includes('px')) {
    return 'px'
  }
  if (styleValue?.includes('%')) {
    return '%'
  }
  if (styleValue?.includes('em')) {
    return 'em'
  }
  if (styleValue?.includes('vh')) {
    return 'vh'
  }
  return ''
}

export function deleteUnits(styleValue) {
  return styleValue
    ?.replace('px', '')
    ?.replace('%', '')
    ?.replace('em', '')
    ?.replace('vh', '')
}
