import React from 'react'
import SizeStyleInput from './SizeStyleInput'
import FontStyleEditor from './FontStyleEditor'
import ColorPickerOld from './ColorPickerOld'
import AlignStyleInput from './AlignStyleInput'
import ColorPicker from './ColorPicker'

export default function TypographyStylePanel() {
  return (
    <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <FontStyleEditor />

        <div className="_2-col-style-grid">
          <SizeStyleInput style="font-size" text="Size" />
          <SizeStyleInput
            style="line-height"
            text="Height"
            placeholder="auto"
          />
        </div>

        <SizeStyleInput
          style="letter-spacing"
          text="Spacing"
          placeholder="auto"
        />

        <ColorPicker style="color" />

        <AlignStyleInput />
      </div>
    </div>
  )
}
