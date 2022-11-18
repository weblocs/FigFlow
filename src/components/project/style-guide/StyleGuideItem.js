import { useDispatch, useSelector } from 'react-redux'
import AddStyleGuideStyle from './AddStyleGuideStyle'
import EditStyleGuideItem from './EditStyleGuideItem'
import StyleGuideInput from './StyleGuideInput'

export default function StyleGuideItem({ folder, item }) {
  const isDeveloperMode = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const dispatch = useDispatch()

  return (
    <div key={item.name}>
      <div className="style-panel-box title-box space-between item-box">
        <div className="text panel-title">{item.name}</div>
        {isDeveloperMode && (
          <div className="style-guide-buttons">
            <EditStyleGuideItem
              folderId={folder.id}
              id={item.id}
              name={item.name}
            />
            <AddStyleGuideStyle folderId={folder.id} itemId={item.id} />
          </div>
        )}
      </div>

      <div className="style-panel-box">
        <div className="_1-col-style-grid">
          {item.styles?.map((style) => {
            return (
              <StyleGuideInput
                key={style.name}
                stylePropertyName={style.name}
                text={style.name}
                classId={item.classId}
                optionId={item.optionId}
                optionVersionId={item.optionVersionId}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
