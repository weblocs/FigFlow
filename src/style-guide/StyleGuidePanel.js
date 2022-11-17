import { useDispatch, useSelector } from 'react-redux'
import StylePanelTitle from '../components/project/style-panel/StylePanelTitle'
import AddStyleGuideFolder from './AddStyleGuideFolder'
import AddStyleGuideItem from './AddStyleGuideItem'
import AddStyleGuideStyle from './AddStyleGuideStyle'
import EditStyleGuideItem from './EditStyleGuideItem'
import StyleGuideInput from './StyleGuideInput'

export default function StyleGuidePanel() {
  const activeRightSidebarTab = useSelector(
    (state) => state.project.activeRightSidebarTab
  )
  const isDeveloperMode = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const styleGuide = useSelector((state) => state.project.styleGuide)

  const dispatch = useDispatch()

  if (activeRightSidebarTab === 'Style Guide') {
    return (
      <div
        className={
          'style-guide-panel ' +
          (activeRightSidebarTab === 'Style Guide' ? ' active' : '')
        }
      >
        <div className="style-panel-box">
          <div className="style-panel-title-box">
            <div className="text">Style Guide</div>
            {isDeveloperMode && <AddStyleGuideFolder />}
          </div>
        </div>

        {styleGuide?.map((folder, index) => {
          return (
            <div key={folder.name}>
              <div className="style-panel-box title-box space-between">
                <div className="text panel-title">{folder.name}</div>
                {isDeveloperMode && (
                  <div className="style-guide-buttons">
                    <EditStyleGuideItem id={folder.id} name={folder.name} />
                    <AddStyleGuideItem id={folder.id} />
                  </div>
                )}
              </div>
              {folder.items?.map((item, index) => {
                return (
                  <div key={item.name}>
                    <div className="style-panel-box title-box space-between">
                      <div className="text panel-title">{item.name}</div>
                      {isDeveloperMode && (
                        <div className="style-guide-buttons">
                          <EditStyleGuideItem
                            folderId={folder.id}
                            id={item.id}
                            name={item.name}
                          />
                          <AddStyleGuideStyle
                            folderId={folder.id}
                            itemId={item.id}
                          />
                        </div>
                      )}
                    </div>

                    <div className="style-panel-box">
                      <div className="_1-col-style-grid">
                        {item.styles?.map((style, index) => {
                          return (
                            <div key={style.name}>
                              <StyleGuideInput
                                stylePropertyName={style.name}
                                text={style.name}
                                classId={item.classId}
                                optionId={item.optionId}
                                optionVersionId={item.optionVersionId}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* <StylePanelTitle title="Colors" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" />
                    <ColorPicker style="color" />
                </div>
            </div>

            <StylePanelTitle title="Headings" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <FontStyleEditor />
                    <ColorPicker style="color" />
                    <div className='_1-col-style-grid'>
                        
                        
                    </div>
                </div>
                
            </div>

            <StylePanelTitle title="Heading 1" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Heading 2" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Heading 3" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Heading 4" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Heading 5" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Heading 6" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Paragraph" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <FontStyleEditor />
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="line-height" text="Height"/>
                    <SizeStyleInput style="letter-spacing" text="Spacing"/>
                    <ColorPicker style="color" />
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Paragraph Large" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Paragraph Small" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Paragraph Light" />
            <div className='style-panel-box'>
                <div className='_2-col-style-grid'>
                    <SizeStyleInput style="opacity" text="Opacity"/>
                </div>
            </div>

            <StylePanelTitle title="Buttons" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <SizeStyleInput style="margin-bottom" text="Padding Horizontal"/>
                    <SizeStyleInput style="margin-bottom" text="Padding Vertical"/>
                    <SizeStyleInput style="border-radius" text="Radius"/>
                    <FontStyleEditor />
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="line-height" text="Height"/>
                    <SizeStyleInput style="letter-spacing" text="Spacing"/>
                    <SizeStyleInput style="border-width" text="Border Width"/>
                    <SizeStyleInput style="transition" text="Transition"/>
                </div>
            </div>

            <StylePanelTitle title="Primary Button" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" text="Background" />
                    <ColorPicker style="color" text="Border" />
                </div>
            </div>

            <StylePanelTitle title="Primary Button Hover" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" text="Background" />
                    <ColorPicker style="color" text="Border" />
                </div>
            </div>

            <StylePanelTitle title="Secondary Button" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" text="Background" />
                    <ColorPicker style="color" text="Border" />
                </div>
            </div>

            <StylePanelTitle title="Secondary Button Hover" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" text="Background" />
                    <ColorPicker style="color" text="Border" />
                </div>
            </div>

            <StylePanelTitle title="Tertiary Button" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" text="Background" />
                    <ColorPicker style="color" text="Border" />
                </div>
            </div>

            <StylePanelTitle title="Tertiary Button Hover" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" text="Background" />
                    <ColorPicker style="color" text="Border" />
                </div>
            </div>

            <StylePanelTitle title="Label" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <FontStyleEditor />
                    <SizeStyleInput style="font-size" text="Size"/>
                    <SizeStyleInput style="line-height" text="Height"/>
                    <SizeStyleInput style="letter-spacing" text="Spacing"/>
                    <ColorPicker style="color" />
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div>

            <StylePanelTitle title="Section" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Padding Vertical"/>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" />
                </div>
            </div>

            <StylePanelTitle title="Section Light" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" />
                </div>
            </div>

            <StylePanelTitle title="Section Dark" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <ColorPicker style="color" />
                    <ColorPicker style="color" />
                </div>
            </div>

            <StylePanelTitle title="Section Large" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Padding Vertical"/>
                </div>
            </div>

            <StylePanelTitle title="Container" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <SizeStyleInput style="font-size" text="Padding Horizontal"/>
                    <SizeStyleInput style="max-width" text="Width"/>
                </div>
            </div>

            <StylePanelTitle title="Section Header" />
            <div className='style-panel-box'>
                <div className='_1-col-style-grid'>
                    <SizeStyleInput style="margin-bottom" text="Margin"/>
                </div>
            </div> */}
      </div>
    )
  }
}
