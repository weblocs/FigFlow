import React, {useState, useEffect} from "react";


import { useDispatch, useSelector } from 'react-redux'
import {editStyleProperty} from "../../../features/pre-rendered-html-nodes"


export default function DisplayStyleEdit () {

    const activeStyleIndex = useSelector((state) => state.project.activeStyleIndex)
    const displayStyle = useSelector((state) => state.project.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    const dispatch = useDispatch()

    return (
        <>
            <div>Display</div>
            <div className="displayButtonsWrapper">
                <div
                    className={"displayButton " + ((displayStyle === "block") ? "active" : "")}
                    onClick={() => dispatch(editStyleProperty(["display", "block"]))}
                >
                    B
                </div>
                <div className={"displayButton " + ((displayStyle === "flex") ? "active" : "")}
                    onClick={() => dispatch(editStyleProperty(["display", "flex"]))}
                >
                    F
                </div>
                <div className={"displayButton " + ((displayStyle === "grid") ? "active" : "")}
                    onClick={() => dispatch(editStyleProperty(["display", "grid"]))}
                >
                    G
                </div>
                <div className={"displayButton " + ((displayStyle === "inline-block") ? "active" : "")}
                    onClick={() => dispatch(editStyleProperty(["display", "inline-block"]))}
                >
                    IB
                </div>
                <div className={"displayButton " + ((displayStyle === "inline") ? "active" : "")}
                    onClick={() => dispatch(editStyleProperty(["display", "inline"]))}
                >
                    I
                </div>
                <div className={"displayButton " + ((displayStyle === "none") ? "active" : "")}
                    onClick={() => dispatch(editStyleProperty(["display", "none"]))}
                >
                    N
                </div>
            </div>
        </>
    )
}