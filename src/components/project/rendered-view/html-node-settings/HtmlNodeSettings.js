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
import ActionButton from './ActionButton'
import AddSectionButton from '../_atoms/AddSectionButton'
import EmbedSettings from './EmbedSettings'

export default function HtmlNodeSettings() {
  const activeNodeId = useSelector((state) => state.project.activeNodeId)
  const isActiveNodeSection = useSelector(
    (state) => state.project.activeNodeObject?.type === 'sec'
  )
  const isActiveNodeBody = useSelector(
    (state) => state.project.activeNodeObject?.type === 'body'
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
    const positionLeft =
      activeNode?.getBoundingClientRect().left -
      document
        .getElementsByClassName('project-rendered-design')[0]
        ?.getBoundingClientRect().left
    return positionLeft
  })

  const activeNodePositionY = useSelector((state) => {
    if (
      activeNode?.getBoundingClientRect().top <= 60 &&
      activeNode?.getBoundingClientRect().top > 0
    ) {
      if (activeNode?.getBoundingClientRect().bottom < 100) {
        return activeNode?.getBoundingClientRect().bottom - 27
      } else {
        return 5
      }
    }
    return activeNode?.getBoundingClientRect().top - 67
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
                  (!isActiveNodeSection && !isActiveNodeBody
                    ? ' with-arrow'
                    : '')
                }
              >
                <div className="rich-element-settings_button-text">
                  {/* <span>Name</span> */}
                  {activeStyleName}
                </div>
              </div>
              {!isActiveNodeSection && !isActiveNodeBody && <GoToParentNode />}
              <NodeStylesList />
              <StyleButton />

              <AltImageSettings />
              <ChangeImageButton />
              <HeadingTypeButton />

              <ActionButton />
              <LinkSettings />
              <InputSettings />
              <EmbedSettings />
              <AddBlockButton addRichSetting={true} />

              {!isActiveNodeSection && !isActiveNodeBody && (
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

                {/* {isActiveNodeSection && <AddSectionButton />} */}

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
