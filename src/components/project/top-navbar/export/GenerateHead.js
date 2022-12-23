export default function GenerateHead(metaTitle, metaDescription, styleURLDots) {
  return `
    <html>
    <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="${styleURLDots}style.css" rel="stylesheet">
    <meta charset="utf-8">
    <title>${metaTitle}</title>
    <meta name="description" content="${metaDescription}">
    </head>
    <body>`
}
