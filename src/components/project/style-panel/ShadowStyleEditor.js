import ProprtyInputLabel from './ProprtyInputLabel'
import SizeStyleInput from './SizeStyleInput'
import SpaceStyleInput from './SpaceStyleInput'

export default function ShadowStyleEditor() {
  return (
    <div className="style-panel-box">
      <div className="_2-col-style-grid">
        <SizeStyleInput style="width" text="Width" placeholder="auto" />
        <SizeStyleInput style="height" text="Height" placeholder="auto" />
        <SizeStyleInput style="min-width" text="Min W" />
        <SizeStyleInput style="min-height" text="Min H" />
        <SizeStyleInput style="max-width" text="Max W" />
      </div>
    </div>
  )
}
