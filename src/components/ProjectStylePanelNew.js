import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {connectStyleWithNode, editStyleInPreRenderedStyles, setActiveStyleId, deleteStyleFromStylesInActiveNode} from "../features/pre-rendered-html-nodes"

import StylePanelTitle from "./style-panel/StylePanelTitle"
import DispayStylePanel from "./style-panel/DispayStylePanel"
import SpacingStylePanel from "./style-panel/SpacingStylePanel"





export default function ProjectStylePanelNew() {

    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const activeStyleName = useSelector((state) => state.designerProjectState.activeStyleName)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)

    const dispatch = useDispatch()

    return (
        <>
            <div className="style-panel">
    <div className="style-panel-box">
      <div className="style-panel-title-box">
        <div className="text">{activeStyleName} styles</div>
      </div>
      <div className="selector-box">
        <div className="text">Selector</div>
        <div className="inheriting-box">
          <div className="text">Inheriting</div>
          <div className="text inheriting-text">1 selector</div>
        </div>
      </div>
      <div className="select-class-input">

            {stylesInActiveNode?.map((el) => (

            <div key={el.id} onClick={() => dispatch(setActiveStyleId(el.id))} className={"selected-class " + ((activeStyleId == el.id) ? "active" : "")}>
                <div className="text">{el.name}</div>
                <span 
                className="seleted-class-delete-button"
                onClick={() => dispatch(deleteStyleFromStylesInActiveNode(el.id))}
                > x
                </span>
            </div>
            ))}

      </div>
      <div className="style-panel-on-page-box">
        <div className="text on-page">1 on this page</div>
      </div>
    </div>
    

    <StylePanelTitle title="Layout" />
    <DispayStylePanel />

    <StylePanelTitle title="Spacing" />
    <SpacingStylePanel />

    
    <div className="style-panel-box title-box">
      <div className="text panel-title">Size</div>
    </div>
    <div className="style-panel-box">
      <div className="_2-col-style-grid">
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Width</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Height</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Min W</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Min H</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Max H</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Max H</div>
          </div>
          <div className="input"></div>
        </div>
      </div>
    </div>
    <div className="style-panel-box">
      <div className="display-horizontal-grid">
        <div className="style-title-box">
          <div className="text">Overflow</div>
        </div>
        <div className="display-buttons-box">
          <div className="display-button">
            <div className="text">V</div>
          </div>
          <div className="display-button">
            <div className="text">H</div>
          </div>
          <div className="display-button">
            <div className="text">S</div>
          </div>
          <div className="display-button">
            <div className="text">Auto</div>
          </div>
        </div>
      </div>
    </div>
    <div className="style-panel-box title-box">
      <div className="text panel-title">Size</div>
    </div>
    <div className="style-panel-box">
      <div className="display-horizontal-grid">
        <div className="style-title-box postion-title-box">
          <div className="text">Position</div>
        </div>
        <div className="position-box">
          <div className="possition-select">
            <div className="text">Relative</div>
          </div>
          <div className="padding-wrapper">
            <div className="padding-top">
              <div className="text">0</div>
            </div>
            <div className="margin-inside-wrapper">
              <div className="padding-left">
                <div className="text">0</div>
              </div>
              <div className="padding-inside-wrapper"></div>
              <div className="padding-left">
                <div className="text">0</div>
              </div>
            </div>
            <div className="padding-top">
              <div className="text">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="style-panel-box title-box">
      <div className="text panel-title">Typography</div>
    </div>
    <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Font</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Weight</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="_2-col-style-grid">
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Size</div>
            </div>
            <div className="input"></div>
          </div>
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Height</div>
            </div>
            <div className="input"></div>
          </div>
        </div>
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Color</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="display-horizontal-grid">
          <div className="style-title-box">
            <div className="text">Align</div>
          </div>
          <div className="display-buttons-box">
            <div className="display-button">
              <div className="text">L</div>
            </div>
            <div className="display-button">
              <div className="text">C</div>
            </div>
            <div className="display-button">
              <div className="text">R</div>
            </div>
            <div className="display-button">
              <div className="text">J</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="style-panel-box title-box">
      <div className="text panel-title">Background</div>
    </div>
    <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Color</div>
          </div>
          <div className="input"></div>
        </div>
      </div>
    </div>
    <div className="style-panel-box title-box">
      <div className="text panel-title">Border</div>
    </div>
    <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Radius</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="_2-col-style-grid">
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Color</div>
            </div>
            <div className="input"></div>
          </div>
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Width</div>
            </div>
            <div className="input"></div>
          </div>
        </div>
        <div className="display-horizontal-grid">
          <div className="style-title-box">
            <div className="text">Align</div>
          </div>
          <div className="display-buttons-box">
            <div className="display-button">
              <div className="text">L</div>
            </div>
            <div className="display-button">
              <div className="text">T</div>
            </div>
            <div className="display-button">
              <div className="text">R</div>
            </div>
            <div className="display-button">
              <div className="text">B</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

        </>
    )
    
}