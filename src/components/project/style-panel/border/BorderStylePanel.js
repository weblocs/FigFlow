import { useEffect, useState } from 'react'
import BorderStyleInput from '../BorderStyleInput'
import BorderWidthInput from '../BorderWidthInput'
import ColorPicker from '../ColorPicker'
import ProprtyInputLabel from '../ProprtyInputLabel'
import SizeStyleInput from '../SizeStyleInput'
import EmptyGridItem from './EmptyGridItem'
import Tab from './Tab'

export default function BorderStylePanel() {
  const [activeTab, setActiveTab] = useState('center')
  const [borderWidthProperty, setBorderWidthProperty] = useState('')
  const [borderColorProperty, setBorderColorProperty] = useState('')

  useEffect(() => {
    setBorderWidthProperty('border-' + activeTab + '-width')
    setBorderColorProperty('border-' + activeTab + '-color')
    if (activeTab === 'center') {
      setBorderWidthProperty('border-width')
      setBorderColorProperty('border-color')
    }
  }, [activeTab])

  return (
    <div className="style-panel-box">
      <div className="border-panel_wrapper">
        <div className="border-panel_column">
          <div className="border-panel_grid">
            <EmptyGridItem />

            <Tab
              tab="top"
              activeTab={activeTab}
              handleSetActiveTab={setActiveTab}
            />

            <EmptyGridItem />

            <Tab
              tab="left"
              activeTab={activeTab}
              handleSetActiveTab={setActiveTab}
            />

            <Tab
              tab="center"
              activeTab={activeTab}
              handleSetActiveTab={setActiveTab}
            />

            <Tab
              tab="right"
              activeTab={activeTab}
              handleSetActiveTab={setActiveTab}
            />

            <EmptyGridItem />

            <Tab
              tab="bottom"
              activeTab={activeTab}
              handleSetActiveTab={setActiveTab}
            />

            <EmptyGridItem />
          </div>
        </div>
        <div className="_1-col-style-grid">
          <SizeStyleInput style="border-radius" text="Radius" />
          <ColorPicker style={borderColorProperty} />

          <SizeStyleInput style={borderWidthProperty} text="Width" />

          <div className="size-style-box">
            <ProprtyInputLabel text="Style" property="border-style" />
            <BorderStyleInput />
          </div>

          {/* 
          <BorderWidthInput
            style="border-width"
            activeTab={activeTab}
            text="Width"
          /> */}

          <div className="_2-col-style-grid"></div>
        </div>
      </div>
    </div>
  )
}
