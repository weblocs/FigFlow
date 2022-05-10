import React, {useState, useEffect} from "react";
import useEventListener from '@use-it/event-listener'


import { useDispatch } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../features/pre-rendered-html-nodes"


export default function SpacingInput () {

    const dispatch = useDispatch()

    const [mouseY, setMouseY] = useState(0);
    const [startY, setStartY] = useState(0);
    const [changedSpace, setChangedSpace] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [space, setSpace] = useState(0);
    const [spacePx, setSpacePx] = useState("");

    function handleOnMouseDown() {
        setStartY(mouseY);
        setMouseDown(true);
    }

    function handleOnMouseUp() {
        setStartY(0);
        setMouseDown(false);
        setChangedSpace(0);
    }

    function handleMouseMove(e) {
        setMouseY(e.y);
        if(mouseDown === true) {
            setChangedSpace( Math.round((startY - mouseY)/30));
            setSpace(space + changedSpace);
            setSpacePx(space+"px");
            dispatch(editStyleInPreRenderedStyles(["margin_top",spacePx]));
        } 
    }

    useEventListener('mousemove', handleMouseMove);
    useEventListener('mouseup', handleOnMouseUp);

    return (
        <div className="SpacingInput"
        onMouseDown={handleOnMouseDown}
        >{space}</div>
    )
}