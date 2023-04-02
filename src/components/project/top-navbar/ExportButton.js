import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import generateAnyPage from './export/GenerateAnyPage'
import { useState } from 'react'
import HowToDeploy from './HowToDeploy'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import JSZipUtils from './JsZipUtils'
import { fullJSONtoCSS } from '../../../utils/nodes-editing'
import Resizer from 'react-image-file-resizer'
import generatePageCss from './export/GeneratePageCss'
import getStyleUrlDots, { getFontsUrlDots } from './export/GetStyleUrlDots'
import generateFontCss from './export/GenerateFontCss'

export default function ExportButton() {
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

  const [isOpen, setIsOpen] = useState(false)

  function handleOnClick() {
    var zip = new JSZip()
    let isFirstPage = true

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

          let path = `${parentToFolderLink}/${pageSlug}/`
          if (pageSlug === 'index') {
            path = `${parentToFolderLink}/`
          }

          if (!page.isStarter) {
            const fontsURLDots = getFontsUrlDots(
              'page',
              parents.length,
              pageSlug
            )
            zip.file(
              `${path}/style.css`,
              generatePageCss(
                preRenderedStyles,
                nodes,
                projectSwatches,
                fonts,
                fontsURLDots
              )
            )
            zip.file(`project/fonts.css`, generateFontCss(fonts))

            zip.file(
              `${path}/index.html`,
              // generatePage(nodes, parents.length, metaTitle, metaDescription)
              generateAnyPage(
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

    collections.forEach((collection) => {
      collection.items.forEach((item) => {
        const scripts = collection?.scripts || []
        const fontsURLDots = getFontsUrlDots('collection', null, item.slug)
        zip.file(
          `project/${collection.slug}/style.css`,
          generatePageCss(
            preRenderedStyles,
            collection.preRenderedHTMLNodes,
            projectSwatches,
            fonts,
            fontsURLDots
          )
        )

        zip.file(
          `project/${collection.slug}/${item.slug}.html`,
          // generateCollectionPage(collection, item)
          generateAnyPage(
            preRenderedStyles,
            'collection',
            collection,
            item,
            null,
            null,
            null,
            null,
            collections,
            projectPages,
            item.slug,
            scripts,
            allScripts,
            libraries,
            projectSettings
          )
        )
      })
    })

    function urlToPromise(url) {
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

      zip.file(`project/assets/images/${imageSrc}`, file, {
        binary: true,
      })
      // zip.file(`project/assets/images/${image.name}`, resizedfFile, {
      //   binary: true,
      // })
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

    function getFontFile(fontUrl, name) {
      zip.file(`project/assets/fonts/${name}`, urlToPromise(fontUrl), {
        binary: true,
      })
    }

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'project.zip')
    })
  }

  return (
    <div className="is-relative">
      <button className="saveButton light" onClick={() => setIsOpen(!isOpen)}>
        Export
      </button>
      {isOpen && (
        <div className="export-modal">
          <div className="export-modal_link" onClick={handleOnClick}>
            1. Download Code
          </div>
          <a
            className="export-modal_link"
            target="_blank"
            href={`https://app.netlify.com/sites/${projectSlug}/deploys`}
          >
            2. Open Netlify Deployment
          </a>
          <HowToDeploy />
        </div>
      )}
    </div>
  )
}
