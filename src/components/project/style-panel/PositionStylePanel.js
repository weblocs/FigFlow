import { useDispatch, useSelector } from "react-redux";
import PositionInput from "./PositionInput";
import ProprtyInputLabel from "./ProprtyInputLabel";
import SpaceStyleInput from "./SpaceStyleInput";

export default function PositionStylePanel () {

    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">
                <div className="input-label-box">
                    <ProprtyInputLabel text="Position" property="position" />
                </div>
                <div className="position-box">

                <div className="input position-select-input">
                    <PositionInput />
                </div>

                <div className="padding-wrapper">
                    <div className="padding-top">
                        <SpaceStyleInput style="top" />
                    </div>
                    <div className="margin-inside-wrapper">
                    <div className="padding-left">
                        <SpaceStyleInput style="left" />
                    </div>
                    <div className="padding-inside-wrapper"></div>
                    <div className="padding-left">
                        <SpaceStyleInput style="right" />
                    </div>
                    </div>
                    <div className="padding-top">
                        <SpaceStyleInput style="bottom" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}