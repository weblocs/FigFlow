import React, {useState} from "react"
import { useSelector, useDispatch } from 'react-redux'

import preRenderedHtmlNodes, {setActiveStyle, connectStyleWithNode} from "../features/pre-rendered-html-nodes"

import ProjectStylePropertyEditor from "./atoms/ProjectStylePropertyEditor"

export default function ProjectRenderedDesign() {

    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleName = useSelector((state) => state.designerProjectState.activeStyleName)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)

    const [styleConnectorInput, setStyleConnectorInput] = useState("");

    const dispatch = useDispatch()

    function handleStyleConnectorSubmit(e) {
      e.preventDefault();
      dispatch(connectStyleWithNode(styleConnectorInput));
    }

    return (
        <div className="styleWrapper">

            <div className="selectStyleInPanelWrapper">
              <div>
                <form onSubmit={handleStyleConnectorSubmit}>
                  <input value={styleConnectorInput} onChange={(e) => setStyleConnectorInput(e.target.value)} />
                </form>
              </div>
            
            {stylesInActiveNode.map((el) => (
              <div key={el.name} onClick={() => dispatch(setActiveStyle(el.name))} className={"classElement " + ((activeStyleName == el.name) ? "active" : "")} >{el.name} </div>
            ))}

            </div>      

            {preRenderedStyles.map((el) => (
              <div key={el.name} onClick={() => dispatch(setActiveStyle(el.name))} className={"classElement small " + ((activeStyleName == el.name) ? "active" : "")} >{el.name}</div>
            ))}


            <ProjectStylePropertyEditor name="display" />
            <ProjectStylePropertyEditor name="font size" />
            <ProjectStylePropertyEditor name="color" />
            <ProjectStylePropertyEditor name="background" />
            <ProjectStylePropertyEditor name="padding top" />
            <ProjectStylePropertyEditor name="padding bottom" />
            <ProjectStylePropertyEditor name="padding left" />
            <ProjectStylePropertyEditor name="padding right" />
            <ProjectStylePropertyEditor name="margin top" />
            <ProjectStylePropertyEditor name="margin bottom" />
            <ProjectStylePropertyEditor name="margin left" />
            <ProjectStylePropertyEditor name="margin right" />

        </div>
    )
}