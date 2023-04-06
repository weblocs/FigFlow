import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import generateAnyPage from './export/GenerateAnyPage'
import { useEffect, useState } from 'react'
import HowToDeploy from './HowToDeploy'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import JSZipUtils from './JsZipUtils'
import { fullJSONtoCSS } from '../../../utils/nodes-editing'
import Resizer from 'react-image-file-resizer'
import generatePageCss from './export/GeneratePageCss'
import getStyleUrlDots, { getFontsUrlDots } from './export/GetStyleUrlDots'
import generateFontCss from './export/GenerateFontCss'
import GenerateAnyPageLiquid from './export/GenerateAnyPageLiquid'
import generateFontCssLiquid from './export/GenerateFontCssLiquid'

import { Octokit } from 'octokit'
import { encode, decode } from 'js-base64'
import { Base64File } from 'js-base64-file'

export default function ExportButtonLiquid() {
  const octokit = new Octokit({
    auth: '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',
  })
  const owner = 'weblocs'
  const repo = 'shopify'

  async function pushFileToGit(path, content) {
    let sha = null
    let isContentChanged = false
    try {
      await octokit
        .request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner: owner,
          repo: repo,
          path: path,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        .then((response) => {
          sha = response.data.sha
          if (content !== decode(response.data.content)) {
            isContentChanged = true
          }
        })
    } catch (error) {
      console.log(error)
    }

    if (sha === null) {
      await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: owner,
        repo: repo,
        path: path,
        message: `create ${path}`,
        committer: {
          name: 'Maciej Kociela',
          email: 'kocielam@gmail.com',
        },
        content: encode(content),
        sha: sha,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    } else {
      if (isContentChanged) {
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: owner,
          repo: repo,
          path: path,
          message: `update ${path}`,
          committer: {
            name: 'Maciej Kociela',
            email: 'kocielam@gmail.com',
          },
          content: encode(content),
          sha: sha,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
      }
    }
  }

  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  const postRenderedStyles = useSelector(
    (state) => state.project.postRenderedStyles
  )
  const projectPages = useSelector((state) => state.project.projectPages)
  const collections = useSelector((state) => state.project.collections)
  const allScripts = useSelector((state) => state.project.scripts)
  const libraries = useSelector((state) => state.project.libraries)
  const projectPageFolderStructure = useSelector(
    (state) => state.project.projectPageFolderStructure
  )
  const projectSlug = useSelector(
    (state) => state.project.projectNameAndSlug.slug
  )
  const projectImages = useSelector((state) =>
    state.project.images.concat([
      { name: state.project?.faviconImage },
      { name: state.project?.faviconMobileImage },
    ])
  )
  const projectSettings = useSelector((state) => {
    return {
      favicon: state.project.faviconImage,
      faviconMobile: state.project.faviconMobileImage,
    }
  })

  const fonts = useSelector((state) => state.project.fonts)

  const [buttonText, setButtonText] = useState('Publish')

  function handleOnClick() {
    var zip = new JSZip()
    let isFirstPage = true

    pushFileToGit(
      `config/settings_data.json`,
      `{
            "current": "Default",
            "presets": {
              "Default": {
              }
        }`
    )

    pushFileToGit(
      `config/settings_schema.json`,
      `[
        {
          "name": "theme_info",
          "theme_name": "Aplo Starer",
          "theme_version": "1.0.0",
          "theme_author": "Aplo",
          "theme_documentation_url": "https://help.shopify.com/manual/online-store/themes",
          "theme_support_url": "https://support.shopify.com/"
        }
    ]`
    )

    pushFileToGit(
      `layout/theme.liquid`,
      `<!doctype html>
      <html class="no-js" lang="{{ request.locale.iso_code }}">
        <head>
        </head>
        <body>
          {{ content_for_header }}
          {{ content_for_layout }}
        </body>
      </html>`
    )

    pushFileToGit(
      `layout/password.liquid`,
      `<!doctype html>
      <html class="no-js" lang="{{ request.locale.iso_code }}">
        <head>
        </head>
        <body>
          {{ content_for_header }}
          {{ content_for_layout }}
        </body>
      </html>`
    )

    function renderPages(pages, parents) {
      pages.forEach((page, i) => {
        let pageSlug = page?.slug
        if (!page.children) {
          const nodes = projectPages.find(
            ({ slug }) => slug === page.slug
          ).preRenderedHTMLNodes
          const scripts =
            projectPages.find(({ slug }) => slug === page.slug)?.scripts || []
          const metaTitle = projectPages.find(
            ({ slug }) => slug === page.slug
          ).metaTitle
          const metaDescription = projectPages.find(
            ({ slug }) => slug === page.slug
          ).metaDescription

          let parentToFolderLink = ''
          parents.forEach((parent) => {
            parentToFolderLink += parent + '/'
          })
          if (isFirstPage) {
            pageSlug = 'index'
            isFirstPage = false
          }

          let stylePath = `assets/page-${pageSlug}.css`
          if (pageSlug === 'index') {
            stylePath = `assets/index.css`
          }

          let path = `templates/page.${pageSlug}.liquid`
          if (pageSlug === 'index') {
            path = `templates/index.liquid`
          }
          if (pageSlug === '404') {
            path = `templates/404.liquid`
          }
          if (pageSlug === 'starter-page') {
            path = `templates/page.liquid`
          }
          if (pageSlug === 'blog') {
            path = `templates/blog.liquid`
          }
          if (pageSlug === 'product') {
            path = `templates/product.liquid`
          }
          if (pageSlug === 'cart') {
            path = `templates/cart.liquid`
          }

          if (!page.isStarter) {
            const fontsURLDots = getFontsUrlDots(
              'page',
              parents.length,
              pageSlug
            )
            pushFileToGit(
              stylePath,
              generatePageCss(
                preRenderedStyles,
                nodes,
                projectSwatches,
                fonts,
                fontsURLDots
              )
            )
            pushFileToGit(
              `assets/fonts.css.liquid`,
              generateFontCssLiquid(fonts)
            )

            pushFileToGit(
              path,
              // generatePage(nodes, parents.length, metaTitle, metaDescription)
              GenerateAnyPageLiquid(
                preRenderedStyles,
                'page',
                null,
                null,
                nodes,
                parents.length,
                metaTitle,
                metaDescription,
                collections,
                projectPages,
                pageSlug,
                scripts,
                allScripts,
                libraries,
                projectSettings
              )
            )
          }
        } else {
          let updatedParents = [...parents, pageSlug]
          let parentToFolderLink = ''
          updatedParents.forEach((parent) => {
            parentToFolderLink += parent + '/'
          })
          zip.folder(`${parentToFolderLink}`)
          renderPages(page.children, updatedParents)
        }
      })
    }

    renderPages(projectPageFolderStructure, ['project'])

    async function urlToPromise(url) {
      return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    projectImages.forEach((image) => {
      const imageUrl =
        // 'http://phpstack-913418-3170396.cloudwaysapps.com/uploads/image-1.jpeg'
        'https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/' +
        image.name +
        '?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'
      const file = urlToPromise(imageUrl)
      let imageSrc = image.name
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

      //   pushFileToGit(`assets/images/${imageSrc}`, file, {
      //     binary: true,
      //   })
    })

    fonts.forEach((font) => {
      font.weights.forEach((weight) => {
        const types = ['ttf', 'otf', 'woff', 'woff2']
        let fontName = weight.url
        types.forEach((type) => {
          if (fontName.slice(-4) === '-' + type) {
            fontName = fontName.slice(0, -4)
            fontName = fontName.concat('.' + type)
          }
          if (fontName.slice(-5) === '-' + type) {
            fontName = fontName.slice(0, -5)
            fontName = fontName.concat('.' + type)
          }
          if (fontName.slice(-6) === '-' + type) {
            fontName = fontName.slice(0, -6)
            fontName = fontName.concat('.' + type)
          }
        })
        let fontSrc = `https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/${weight.url}?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a`
        getFontFile(fontSrc, fontName)
      })
    })

    function getBase64(file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        console.log(reader.result)
        return reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }

    function getFontFile(fontUrl, name) {
      const fontFile = getBase64(fontUrl)
      pushFileToGit(`assets/fonts/${name}`, fontFile)
    }
  }

  return (
    <div className="is-relative">
      <button className="saveButton light" onClick={handleOnClick}>
        {buttonText}
      </button>
    </div>
  )
}
