import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import generateAnyPage from './export/GenerateAnyPage'

export default function ExportButton() {
  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )
  const postRenderedStyles = useSelector(
    (state) => state.project.postRenderedStyles
  )
  const projectPages = useSelector((state) => state.project.projectPages)
  const collections = useSelector((state) => state.project.collections)
  const projectPageFolderStructure = useSelector(
    (state) => state.project.projectPageFolderStructure
  )

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
          zip.file(
            `${parentToFolderLink}${pageSlug}.html`,
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
              collections
            )
          )
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

    zip.file(
      'project/style.css',
      `body{margin:0;}img{display: block;}${postRenderedStyles}`
    )

    collections.forEach((collection) => {
      collection.items.forEach((item) => {
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
            collections
          )
        )
      })
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'project.zip')
    })
  }

  return (
    <button className="saveButton light" onClick={handleOnClick}>
      Export
    </button>
  )
}
