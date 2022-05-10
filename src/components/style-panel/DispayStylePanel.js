import React, {useState, useEffect} from "react";


import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"

import DisplayStyleButton from "./DisplayStyleButton"

export default function DispayStylePanel () {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    const dispatch = useDispatch()

    return (
        <>

<div className="style-panel-box">
      <div className="display-horizontal-grid">
        <div className="style-title-box">
          <div className="text">Display</div>
        </div>
        <div className="display-buttons-box">
          <DisplayStyleButton value="block" letter="B"/>
          <DisplayStyleButton value="flex" letter="F"/>
          <DisplayStyleButton value="grid" letter="G"/>
          <DisplayStyleButton value="inline" letter="I"/>
          <DisplayStyleButton value="inline-block" letter="IB"/>
          <DisplayStyleButton value="none" letter="N"/>
        </div>
      </div>
    </div>
        </>
    )
}