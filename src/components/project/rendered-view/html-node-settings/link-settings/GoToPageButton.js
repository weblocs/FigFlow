import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveCollectionItemTemplate,
  setActiveCollectionTemplate,
  setActivePage,
} from '../../../../../features/project'
import Icon from '../../../../../img/open-link.svg'

export default function GoToPageButton({ handleHideTab, activeNodeLink }) {
  const hasNodeActiveLink = useSelector((state) =>
    state.project.projectPages?.find(({ id }) => id === activeNodeLink)
  )

  const nodesEditMode = useSelector((state) => state.project.nodesEditMode)

  const activeCollectionId = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = parentPath.length - 1; i >= 0; i--) {
      if (parentPath[i]?.type === 'col') {
        return parentPath[i]?.cmscollectionid
      }
    }
  })

  const isListFilteringCurrent = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = parentPath.length - 1; i >= 0; i--) {
      if (parentPath[i]?.type === 'col') {
        return parentPath[i]?.filterCurrent ? true : false
      }
    }
  })

  const activeCollectionItemTemplateId = useSelector(
    (state) => state.project.activeCollectionItemTemplateId
  )

  const activeClickedCmsItemIndex = useSelector(
    (state) => state.project.activeClickedCmsItemIndex
  )

  const activeCollectionItemId = useSelector(
    (state) =>
      state.project.collections
        .find(({ id }) => id === activeCollectionId)
        ?.items.filter((item) => item?.archived !== true)
        .filter(
          (item) =>
            !(
              item?.id === activeCollectionItemTemplateId &&
              isListFilteringCurrent !== true &&
              nodesEditMode === 'cmsTemplate'
            )
        )[activeClickedCmsItemIndex]?.id
  )

  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )

  // console.log(activeNodeObject)

  const isCmsLinkConnect = useSelector(
    (state) => state.project.activeNodeObject?.cmsLinkConnect
  )

  const dispatch = useDispatch()

  function handleClick(e) {
    e.stopPropagation()
    if (isCmsLinkConnect) {
      dispatch(setActiveCollectionTemplate(activeCollectionId))
      dispatch(setActiveCollectionItemTemplate(activeCollectionItemId))
    } else {
      dispatch(setActivePage(activeNodeLink))
    }
    handleHideTab()
  }

  if (hasNodeActiveLink || isCmsLinkConnect) {
    return (
      <div
        className="rich-element-settings_button button-centered active"
        onClick={handleClick}
      >
        <img src={Icon} style={{ width: '14px' }} />
      </div>
    )
  }
}
