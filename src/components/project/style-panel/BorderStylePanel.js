import ColorPicker from "./ColorPicker"
import SizeStyleInput from "./SizeStyleInput"

export default function BorderStylePanel() {
    return (
        <div className="style-panel-box">
            <div className="_1-col-style-grid">
                <ColorPicker style="border-color" />
                <div className="_2-col-style-grid">
                    <SizeStyleInput style="border-radius" text="Radius"/>
                    <SizeStyleInput style="border-width" text="Width"/>
                </div>
            </div>
        </div>
    )
}