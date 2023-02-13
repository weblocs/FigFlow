import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUndoState,
  setIsActiveHtmlNodeParentDisplayFlex,
  editSymbolsClickableArea,
  setActionActiveFalse,
  setActiveNodeComputedStyles,
  setGlobalActiveHtmlNode,
  setActiveHtmlNodeParentsPath,
  editActiveStyleProperties,
  updateActiveStyleListAndId,
  setHtmlNodesWithoutExpandedState,
  updateResolutionPathName,
  setStyleState,
} from '../features/project'

export default function StoreUseEffectUpdates() {
  const activeNodeId = useSelector((state) => state.project.activeNodeId)
  const hoveredNodeId = useSelector((state) => state.project.hoveredNodeId)
  const isAltPressed = useSelector((state) => state.project.isAltPressed)

  const activeProjectResolution = useSelector(
    (state) => state.project.activeProjectResolution
  )
  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )
  const activeStyleId = useSelector((state) => state.project.activeStyleId)
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const undoActionActive = useSelector(
    (state) => state.project.undoActionActive
  )
  const activeTab = useSelector((state) => state.project.activeTab)
  const elementsInlineStyleMode = useSelector(
    (state) => state.project.elementsInlineStyleMode
  )
  const activeClickedCmsItemIndex = useSelector(
    (state) => state.project.activeClickedCmsItemIndex
  )
  const activeHoveredCmsItemIndex = useSelector(
    (state) => state.project.activeHoveredCmsItemIndex
  )
  const styleState = useSelector((state) => state.project.styleState)
  const activePageId = useSelector((state) => state.project.activePageId)
  const editedSymbolId = useSelector((state) => state.project.editedSymbolId)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setGlobalActiveHtmlNode())
  }, [activeNodeId, preRenderedHTMLNodes])

  useEffect(() => {
    dispatch(updateActiveStyleListAndId())
  }, [activeNodeId, preRenderedHTMLNodes, elementsInlineStyleMode])

  useEffect(() => {
    if (styleState !== 'default') {
      dispatch(setStyleState('default'))
    }
  }, [activeNodeId])

  useEffect(() => {
    dispatch(setIsActiveHtmlNodeParentDisplayFlex())
  }, [activeNodeId, preRenderedHTMLNodes])

  useEffect(() => {
    const navList = document.querySelector("[isnavlist='true']")
    const navTrigger = document.querySelector("[isnavtrigger='true']")
    if (
      activeProjectResolution === '1' ||
      activeProjectResolution === '5' ||
      activeProjectResolution === '6' ||
      activeProjectResolution === '7'
    ) {
      navList?.classList.remove('is-nav-hidden')
      navTrigger?.classList.remove('is-trigger-visible')
    } else {
      navList?.classList.add('is-nav-hidden')
      navTrigger?.classList.add('is-trigger-visible')
    }
  }, [activeProjectResolution, activePageId, editedSymbolId])
  useEffect(() => {
    dispatch(editActiveStyleProperties())
  }, [
    activeNodeId,
    activeProjectResolution,
    preRenderedHTMLNodes,
    preRenderedStyles,
    activeStyleId,
    styleState,
  ])

  useEffect(() => {
    dispatch(updateResolutionPathName())
  }, [activeProjectResolution, styleState])

  useEffect(() => {
    dispatch(setActiveNodeComputedStyles())
  }, [
    activeNodeId,
    preRenderedStyles,
    preRenderedHTMLNodes,
    activeProjectResolution,
  ])

  useEffect(() => {
    dispatch(addUndoState())
  }, [preRenderedHTMLNodes, preRenderedStyles])

  useEffect(() => {
    dispatch(setActionActiveFalse())
  }, [undoActionActive])

  useEffect(() => {
    if (!isAltPressed) {
      document
        .querySelector(`.navigation-node.hovered`)
        ?.classList.remove('hovered')
      document
        .querySelector(`[nodeid='${hoveredNodeId}']`)
        ?.classList.add('hovered')
      document
        .querySelector(`.renderedNode.hovered`)
        ?.classList.remove('hovered')

      let activeHtmlNode = `[el_id='${hoveredNodeId}']`
      if (activeHoveredCmsItemIndex !== undefined) {
        activeHtmlNode = `[el_id='${hoveredNodeId}'][cms_item_index='${activeHoveredCmsItemIndex}']`
      }

      document.querySelector(activeHtmlNode)?.classList.add('hovered')
    }
  }, [hoveredNodeId, activeHoveredCmsItemIndex])

  useEffect(() => {
    document
      .querySelector(`.navigation-node.active`)
      ?.classList.remove('active')
    document
      .querySelector(`[nodeid='${activeNodeId}']`)
      ?.classList.add('active')
    document.querySelector(`.renderedNode.active`)?.classList.remove('active')

    let activeHtmlNode = `[el_id='${activeNodeId}']`
    if (activeClickedCmsItemIndex !== undefined) {
      activeHtmlNode = `[el_id='${activeNodeId}'][cms_item_index='${activeClickedCmsItemIndex}']`
    }
    // if (!isAltPressed) {
    document.querySelector(activeHtmlNode)?.classList.add('active')
    // }
  }, [
    activeNodeId,
    activeClickedCmsItemIndex,
    preRenderedHTMLNodes,
    isAltPressed,
  ])

  useEffect(() => {
    dispatch(setActiveHtmlNodeParentsPath())
  }, [
    activeNodeId,
    preRenderedHTMLNodes,
    preRenderedStyles,
    activeProjectResolution,
    styleState,
    activeStyleId,
  ])

  useEffect(() => {
    if (activeTab === 'Navigator') {
      dispatch(setActiveHtmlNodeParentsPath())
      document
        .querySelector(`.navigation-node.active`)
        ?.classList.remove('active')
      document
        .querySelector(`[nodeid='${activeNodeId}']`)
        ?.classList.add('active')
    }
  }, [activeTab])

  useEffect(() => {
    dispatch(editSymbolsClickableArea())
    setTimeout(() => {
      dispatch(editSymbolsClickableArea())
    }, 500)
  }, [preRenderedHTMLNodes, preRenderedStyles, activeProjectResolution])

  useEffect(() => {
    if (activeTab === 'Navigator') {
      setTimeout(() => {
        const actualNodePosition = document
          .querySelector(`[nodeid="${activeNodeId}"]`)
          ?.getBoundingClientRect().top
        if (
          actualNodePosition < 172 ||
          actualNodePosition > window.screen.height - 200
        ) {
          const actualViewPosition =
            document.getElementById('nodes-navigator').scrollTop
          const scrollMargin = 245
          document.getElementById('nodes-navigator').scrollTo({
            top: actualViewPosition + actualNodePosition - scrollMargin,
          })
        }
      }, 1)
    }
  }, [activeNodeId, activeTab])
}
