import React, {useState, useEffect} from "react";


import { useDispatch, useSelector } from 'react-redux'
import {editStyleProperty} from "../../../features/project"


export default function SpacingStyleEdit () {

    const activeStyleIndex = useSelector((state) => state.project.activeStyleIndex)
    const displayStyle = useSelector((state) => state.project.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    const dispatch = useDispatch()

    return (
        <>
            <div>Spacing</div>

            

            
            {/* onClick={() => dispatch(editStyleProperty(["display", "block"]))} */}
        </>
    )
}