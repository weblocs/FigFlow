export default function GenerateHead(
  metaTitle,
  metaDescription,
  styleURLDots,
  slug,
  projectSettings
) {
  function getImgUrl(imageSrc) {
    const types = ['webp', 'avif', 'jpg', 'jpeg', 'png', 'gif', 'svg']
    types.forEach((type) => {
      if (imageSrc?.slice(-4) === '-' + type) {
        imageSrc = imageSrc.slice(0, -4)
        imageSrc = imageSrc.concat('.' + type)
      }
      if (imageSrc?.slice(-5) === '-' + type) {
        imageSrc = imageSrc.slice(0, -5)
        imageSrc = imageSrc.concat('.' + type)
      }
    })
    return `${styleURLDots}assets/images/${imageSrc}`
  }

  // function getImgUrl(img) {
  //   return (
  //     'https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/' +
  //     img +
  //     '?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'
  //   )
  // }
  // <link href="${styleURLDots}style.css" rel="stylesheet">

  return `
    <!DOCTYPE html>
    <html lang="pl-PL">
    <head>
    <style>
    /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}details,main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}
    </style>
    <link href="style.css" rel="stylesheet">
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>${metaTitle}</title>
    <meta name="description" content="${metaDescription}">
    <link href="${getImgUrl(
      projectSettings.favicon
    )}" rel="shortcut icon" type="image/x-icon">
    <link href="${getImgUrl(
      projectSettings.faviconMobile
    )}" rel="apple-touch-icon">

    <style>
    a { color: #000; text-decoration: none; }
    @media(min-width:901px){[nav-trigger]{ display: none;}}
    @media(max-width:900px){.navbar_link-list:not(.is-open){display: none;}}
    </style>
    </head>
    <body>
    `
}
