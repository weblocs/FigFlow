import { useEffect, useState } from 'react'
import BorderWidthInput from '../BorderWidthInput'
import ColorPicker from '../ColorPicker'
import SizeStyleInput from '../SizeStyleInput'
import EmptyGridItem from './EmptyGridItem'
import Tab from './Tab'

export default function BorderStylePanel() {
  const [isActiveTab, setIsActiveTab] = useState('center')
  const [borderWidthProperty, setBorderWidthProperty] = useState('')
  const [borderColorProperty, setBorderColorProperty] = useState('')

  useEffect(() => {
    setBorderWidthProperty('border-' + isActiveTab + '-width')
    setBorderColorProperty('border-' + isActiveTab + '-color')
    if (isActiveTab === 'center') {
      setBorderWidthProperty('border-width')
      setBorderColorProperty('border-color')
    }
  }, [isActiveTab])

  return (
    <div className="style-panel-box">
      <div className="border-panel_wrapper">
        <div className="border-panel_column">
          <div className="border-panel_grid">
            <EmptyGridItem />

            <Tab
              tab="top"
              isActiveTab={isActiveTab}
              handleSetIsActiveTab={setIsActiveTab}
            />

            <EmptyGridItem />

            <Tab
              tab="left"
              isActiveTab={isActiveTab}
              handleSetIsActiveTab={setIsActiveTab}
            />

            <Tab
              tab="center"
              isActiveTab={isActiveTab}
              handleSetIsActiveTab={setIsActiveTab}
            />

            <Tab
              tab="right"
              isActiveTab={isActiveTab}
              handleSetIsActiveTab={setIsActiveTab}
            />

            <EmptyGridItem />

            <Tab
              tab="bottom"
              isActiveTab={isActiveTab}
              handleSetIsActiveTab={setIsActiveTab}
            />

            <EmptyGridItem />
          </div>
        </div>
        <div className="_1-col-style-grid">
          <SizeStyleInput style="border-radius" text="Radius" />
          <ColorPicker style={borderColorProperty} />

          <BorderWidthInput
            style="border-width"
            isActiveTab={isActiveTab}
            text="Width"
          />
          <div className="_2-col-style-grid"></div>
        </div>
      </div>
    </div>
  )
}
