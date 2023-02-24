import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  editHtmlNode,
  setActiveHtmlNode,
  updateStateOnScroll,
} from '../../../features/project'
import { renderFontCss } from '../../../utils/nodes-editing'
import HtmlNodeSettings from './html-node-settings/HtmlNodeSettings'
import ProjectParentsPathBar from './html-nodes-path/ProjectParentsPathBar'
import RenderedNode from './RenderedNode'

export default function ProjectRenderedDesign() {
  const activeRightSidebarTab = useSelector(
    (state) => state.project.activeRightSidebarTab
  )
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const isProjectModeDev = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const postRenderedStyles = useSelector(
    (state) => state.project.postRenderedStyles
  )
  const activeProjectResolution = useSelector(
    (state) => state.project.activeProjectResolution
  )
  const styleState = useSelector((state) => state.project.styleState)
  const fonts = useSelector((state) => state.project.fonts)

  const nodesEditModeLayoutOrBlock = useSelector(
    (state) =>
      state.project.nodesEditMode === 'layout' ||
      state.project.nodesEditMode === 'block'
  )

  const dispatch = useDispatch()

  const [scale, setScale] = useState(1)
  const [style, setStyle] = useState({})

  // useEffect(() => {
  //   if (activeRightSidebarTab !== '' && activeProjectResolution === '1') {
  //     setStyle({
  //       minWidth: '1440px',
  //       transformOrigin: '720px 0',
  //       scale: ((document.body.clientWidth - 265) / 1440).toString(),
  //       height: '1068px',
  //     })
  //   } else {
  //     setStyle({})
  //   }
  // }, [activeRightSidebarTab, activeProjectResolution])

  const [fontsCss, setFontsCss] = useState('')

  useEffect(() => {
    setFontsCss(renderFontCss(fonts, null, true))
  }, [fonts])

  return (
    <div
      className={'Project  ' + 'd2g3-is-' + styleState}
      onWheel={() => dispatch(updateStateOnScroll())}
    >
      <style>{postRenderedStyles}</style>
      <style>{fontsCss}</style>

      <div
        style={style}
        id="project-view"
        className={'project-rendered-design state-' + activeProjectResolution}
      >
        <HtmlNodeSettings />
        {nodesEditModeLayoutOrBlock && <div className="body"></div>}

        <div className={nodesEditModeLayoutOrBlock ? 'body' : ''}>
          {preRenderedHTMLNodes.map((el) => {
            return (
              <RenderedNode
                id={el.id}
                title={el.title}
                styles={el.styles}
                type={el.type}
                subtype={el.subtype}
                src={el.src}
                cmsCollectionId={el.cmsCollectionId}
                filterCurrent={el.filterCurrent}
                cmsFieldId={el.cmsFieldId}
                symbolId={el.symbolId}
                key={el.id}
                children={el.children}
                class={el.class}
                onChange={(text, id) =>
                  dispatch(
                    editHtmlNode({ id: id, field: 'title', value: text })
                  )
                }
                onClick={([_id]) => dispatch(setActiveHtmlNode({ id: _id }))}
              />
            )
          })}
        </div>
      </div>
      {isProjectModeDev && <ProjectParentsPathBar />}
    </div>
  )
}
