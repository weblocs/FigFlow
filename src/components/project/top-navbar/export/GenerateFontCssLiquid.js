export default function generateFontCssLiquid(fonts) {
  let css = ''

  fonts.forEach((font) => {
    font?.weights.forEach((weight) => {
      let fontName = weight.url
      let fontType = ''
      const types = ['ttf', 'otf', 'woff', 'woff2']
      types.forEach((type) => {
        if (fontName.slice(-4) === '-' + type) {
          fontName = fontName.slice(0, -4)
          fontName = fontName.concat('.' + type)
          fontType = type
        }
        if (fontName.slice(-5) === '-' + type) {
          fontName = fontName.slice(0, -5)
          fontName = fontName.concat('.' + type)
          fontType = type
        }
        if (fontName.slice(-6) === '-' + type) {
          fontName = fontName.slice(0, -6)
          fontName = fontName.concat('.' + type)
          fontType = type
        }
      })
      if (fontType === 'ttf') {
        fontType = 'truetype'
      }
      if (fontType === 'otf') {
        fontType = 'opentype'
      }
      let fontSrc = `url('{{ 'fonts/${fontName}' | asset_url }}') format('${fontType}')`
      //   if (isForInternalAppUse) {
      //     fontSrc = `url('https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/${weight.url}?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a') format('${fontType}')`
      //   }

      css += `\n@font-face {
    font-family: '${font.name}';
    src: ${fontSrc};
    font-weight: ${weight.weight};
    font-style: ${weight.style};
    font-display: swap;
  }`
    })
  })
  return css
}
