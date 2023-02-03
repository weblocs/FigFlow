import { useSelector, useDispatch } from 'react-redux'
import {
  editHtmlNode,
  setActiveHtmlNode,
  updateStateOnScroll,
} from '../../../features/project'
import HtmlNodeSettings from './html-node-settings/HtmlNodeSettings'
import ProjectParentsPathBar from './html-nodes-path/ProjectParentsPathBar'
import RenderedNode from './RenderedNode'

export default function ProjectRenderedDesign() {
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

  const nodesEditModeLayoutOrBlock = useSelector(
    (state) =>
      state.project.nodesEditMode === 'layout' ||
      state.project.nodesEditMode === 'block'
  )

  const dispatch = useDispatch()

  return (
    <div
      className={'Project  ' + 'd2g3-is-' + styleState}
      onWheel={() => dispatch(updateStateOnScroll())}
    >
      <style>{postRenderedStyles}</style>
      <div
        // style={{
        //   transform: 'scale(0.2)',
        //   height: '484%',
        //   transformOrigin: 'top',
        // }}
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
