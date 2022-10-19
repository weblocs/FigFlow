import { useSelector, useDispatch } from 'react-redux'
import {editHtmlNode, setActiveHtmlNode, updateStateOnScroll} from "../../../features/project"
import HtmlNodeSettings from "./html-node-settings/HtmlNodeSettings";
import ProjectParentsPathBar from "./html-nodes-path/ProjectParentsPathBar";
import RenderedNode from "./RenderedNode";

export default function ProjectRenderedDesign() {

    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.project.postRenderedStyles)
    const activeProjectResolution = useSelector((state) => state.project.activeProjectResolution)

    const dispatch = useDispatch()

    return (
        <div className="Project" onWheel={() => dispatch(updateStateOnScroll())}>
            <style>{postRenderedStyles}</style>
            <div id="project-view" className={"project-rendered-design state-" + activeProjectResolution}>

                <HtmlNodeSettings />

                {preRenderedHTMLNodes.map((el) => {
                    return(
                    <RenderedNode
                        id={el.id}
                        title={el.title}
                        styles={el.styles}
                        type={el.type}
                        subtype={el.subtype}
                        cmsCollectionId={el.cmsCollectionId}
                        cmsFieldId={el.cmsFieldId}
                        symbolId={el.symbolId}
                        key={el.id}
                        children={el.children}
                        class={el.class}
                        onChange={(text, id) => dispatch(editHtmlNode({id: id, field: 'title', value: text}))}
                        onClick={([_id]) => dispatch(setActiveHtmlNode({id: _id}))}
                    />)
                })}  

            </div>

            <ProjectParentsPathBar />
        </div>
    )
}