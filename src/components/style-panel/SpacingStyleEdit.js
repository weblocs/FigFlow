import React, {useState, useEffect} from "react";


import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"


export default function SpacingStyleEdit () {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    const dispatch = useDispatch()

    return (
        <>
            <div>Spacing</div>

            

            
            {/* onClick={() => dispatch(editStyleInPreRenderedStyles(["display", "block"]))} */}
        </>
    )
}