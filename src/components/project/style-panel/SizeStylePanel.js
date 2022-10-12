import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStyleProperty } from "../../../features/project";
import ProprtyInputLabel from "./ProprtyInputLabel";
import SizeStyleInput from "./SizeStyleInput";
import SizeStyleInputNew from "./SizeStyleInputNew";

export default function SizeStylePanel () {

    const nodeStyleValue = useSelector((state) => state.project.activeNodeComputedStyles?.object_fit);

    const dispatch = useDispatch();

    function handleInputChange(e) {
        dispatch(editStyleProperty(["object-fit",e.target.value]));
    }


    return (
        <div className="style-panel-box">
            <div className="_1-col-style-grid">
                <div className="_2-col-style-grid">
                    <SizeStyleInput style="width" text="Width" placeholder="auto" />
                    <SizeStyleInput style="height" text="Height" placeholder="auto" />
                    <SizeStyleInput style="min-width" text="Min W"/>
                    <SizeStyleInput style="min-height" text="Min H"/>
                    <SizeStyleInput style="max-width" text="Max W"/>
                    <SizeStyleInput style="max-height" text="Max H"/>
                </div>
                <div className="size-style-box">
                    <div className="input-label-box">
                        <ProprtyInputLabel text="Fit" property="object-fit" />
                    </div>
                    <div className="input position-select-input">
                        <select className="style-panel-select text" value={nodeStyleValue} onChange={handleInputChange}>
                            <option value="fill">Fill</option>
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}