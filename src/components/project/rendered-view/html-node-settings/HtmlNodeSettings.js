import { useDispatch, useSelector } from 'react-redux'
import { setActiveHtmlNode } from '../../../../features/project'
import HeadingTypeButton from './buttons/HeadingTypeButton'
import AddBlockButton from './buttons/AddBlockButton'
import NodeMoveArrows from './buttons/NodeMoveArrows'
import SymbolSettings from './symbol-settings/SymbolSettings'
import NodeStylesList from './node-styles/NodeStylesList'
import LinkSettings from './link-settings/LinkSettings'
import DuplicateButton from './buttons/DuplicateButton'
import DeleteButton from './buttons/DeleteButton'
import MoreImg from '../../../../img/more.svg'
import { useEffect, useState } from 'react'
import GoToParentNode from './GoToParentNode'
import AltImageSettings from './AltImageSettings'
import ChangeImageButton from './ChangeImageButton'
import StyleButton from './StyleButton'
import InlineStyleButton from './InlineStyleButton'
import InputSettings from './InputSettings'

export default function HtmlNodeSettings() {
  const activeNodeId = useSelector((state) => state.project.activeNodeId)
  const isActiveNodeSection = useSelector(
    (state) => state.project.activeNodeObject?.type === 'sec'
  )
  const activeStyleName = useSelector(
    (state) =>
      state.project.stylesInActiveNode?.[0]?.name
        .replaceAll('-', ' ')
        .replaceAll('_', ' - ') || state.project.activeNodeObject?.type
  )
  const isNodesEditModeBlock = useSelector(
    (state) => state.project.nodesEditMode === 'block'
  )
  const isNodeSymbol = useSelector(
    (state) => state.project.activeNodeObject?.type === 'sym'
  )
  const activeClickedCmsItemIndex = useSelector(
    (state) => state.project.activeClickedCmsItemIndex
  )
  const isAltPressed = useSelector((state) => state.project.isAltPressed)

  const dispatch = useDispatch()

  function handleClick(e) {
    e.stopPropagation()
    dispatch(setActiveHtmlNode({ id: activeNodeId }))
  }

  function handleClickClearId(e) {
    e.stopPropagation()
    dispatch(setActiveHtmlNode({ id: '' }))
  }

  function handleMouseOver(e) {
    e.stopPropagation()
  }

  const activeNode = useSelector((state) => {
    if (activeClickedCmsItemIndex !== undefined) {
      return document.querySelector(
        `[el_id="${activeNodeId}"][cms_item_index="${activeClickedCmsItemIndex}"]`
      )
    }
    return document.querySelector(`[el_id="${activeNodeId}"]`)
  })

  const activeNodePositionX = useSelector((state) => {
    return (
      activeNode?.getBoundingClientRect().left -
      document
        .getElementsByClassName('project-rendered-design')[0]
        ?.getBoundingClientRect().left
    )
  })

  const activeNodePositionY = useSelector((state) => {
    if (
      activeNode?.getBoundingClientRect().top <= 50 &&
      activeNode?.getBoundingClientRect().top > 0
    ) {
      return 5
    }
    return activeNode?.getBoundingClientRect().top - 61
  })

  const [openButtonList, setOpenButtonList] = useState(false)

  useEffect(() => {
    setOpenButtonList(false)
  }, [activeNodeId])

  return (
    <div
      className={
        'rich-element-settings_box' +
        (activeNodeId !== '' && !isNodesEditModeBlock && !isAltPressed
          ? ' active'
          : '')
      }
      style={{
        transform: `translate(${activeNodePositionX}px,${activeNodePositionY}px)`,
      }}
    >
      <div className="rich-element-settings" onClick={handleClick}>
        <div className="rich-element-settings_flex">
          {!isNodeSymbol && (
            <>
              <div
                className={
                  'rich-element-settings_button active' +
                  (!isActiveNodeSection ? ' with-arrow' : '')
                }
              >
                <div className="rich-element-settings_button-text">
                  {/* <span>Name</span> */}
                  {activeStyleName}
                </div>
              </div>
              {!isActiveNodeSection && <GoToParentNode />}
              <NodeStylesList />
              <StyleButton />

              <AltImageSettings />
              <ChangeImageButton />
              <HeadingTypeButton />

              <LinkSettings />
              <InputSettings />
              <AddBlockButton addRichSetting={true} />

              {!isActiveNodeSection && (
                <div
                  className="rich-element-settings_button button-centered active"
                  onClick={() => setOpenButtonList(!openButtonList)}
                >
                  <img src={MoreImg} style={{ width: '11px' }} />
                </div>
              )}

              <div
                className={
                  'html-node_nove-list' +
                  (openButtonList || isActiveNodeSection ? ' active' : '')
                }
              >
                <NodeMoveArrows isHtmlNodeMoveable={true} />

                <DuplicateButton />
                <DeleteButton />
                <div
                  className="rich-element-settings_button button-centered active"
                  onClick={handleClickClearId}
                >
                  ✕
                </div>
              </div>
            </>
          )}
          <SymbolSettings />
        </div>
      </div>
    </div>
  )
}
