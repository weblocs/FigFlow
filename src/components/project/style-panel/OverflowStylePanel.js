import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import OverflowInputButton from "./OverflowInputButton";
import ProprtyInputLabel from "./ProprtyInputLabel";

export default function OverflowStylePanel () {


    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">

                <ProprtyInputLabel text="Overflow" property="overflow" />

                <div className="display-buttons-box">
                    <OverflowInputButton letter="V" value="visible" />
                    <OverflowInputButton letter="H" value="hidden" />
                    <OverflowInputButton letter="S" value="scroll" />
                    <OverflowInputButton letter="A" value="auto" />
                </div>
            </div>
        </div>
    )
}