
import OpacityInputBox from "./OpacityInputBox"
import NoUnitInput from "./_ui-elements/NoUnitInput"

export default function EffectsStylePanel() {
    return (
        <div className="style-panel-box">
            <div className="_1-col-style-grid">
                <NoUnitInput style="opacity" text="Opacity"/>
                {/* <OpacityInputBox /> */}
            </div>
        </div>
    )
}