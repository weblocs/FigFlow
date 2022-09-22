import { useDispatch, useSelector } from "react-redux";
import { editStyleProperty } from "../../../features/project";
import ProprtyInputLabel from "./ProprtyInputLabel";
import SpaceStyleInput from "./SpaceStyleInput";

export default function PositionStylePanel () {

    const nodeStyleValue = useSelector((state) => state.project.activeNodeComputedStyles?.position);

    const dispatch = useDispatch();

    function handleInputChange(e) {
        dispatch(editStyleProperty(["position",e.target.value]));
    }

    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">
                <div className="input-label-box">
                    <ProprtyInputLabel text="Position" property="position" />
                </div>
                <div className="position-box">

                <div className="input position-select-input">

                    <select className="style-panel-select text" value={nodeStyleValue} onChange={handleInputChange}>
                        <option value="static">Static</option>
                        <option value="relative">Relative</option>
                        <option value="absolute">Absolute</option>
                        <option value="fixed">Fixed</option>
                        <option value="sticky">Sticky</option>
                    </select>
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