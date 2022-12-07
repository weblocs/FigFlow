import { useDispatch, useSelector } from 'react-redux'
import {
  deleteStylePropertyInDefinedStyle,
  editDefinedStyleProperty,
} from '../../../features/project'
import StyleGuideColorPicker from './SwatchColorPicker'
import StyleGuideInput from './InputSize'
import StylePropertyName from './StylePropertyName'

export default function StyleProperty({
  classId,
  optionId,
  optionVersionId,
  stylePropertyName,
  folderId,
  itemId,
  propertyId,
}) {
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  const styleValue = useSelector((state) => {
    let styles = {}
    if (optionId === '') {
      styles =
        state.project.preRenderedStyles.find(({ id }) => id === classId)
          .styles || {}
    } else {
      styles =
        state.project.preRenderedStyles
          .find(({ id }) => id === classId)
          ?.childrens.find(({ id }) => id === optionId)
          .options?.find(({ id }) => id === optionVersionId).styles || {}
    }
    for (const [key, value] of Object.entries(styles)) {
      if (key === stylePropertyName) {
        return {
          value: value.replace('px', '').replace('%', '').replace('em', ''),
          unit:
            getUnit(value, 'px') ||
            getUnit(value, '%') ||
            getUnit(value, 'em') ||
            '',
        }
      }
    }
  })

  function getUnit(value, unit) {
    if (value?.includes(unit)) {
      return unit
    }
  }
  const dispatch = useDispatch()

  function dispatchEditStyle(value) {
    dispatch(
      editDefinedStyleProperty({
        styleId: classId,
        optionId,
        optionVersionId,
        styleProperty: stylePropertyName,
        styleValue: value + (styleValue?.unit || ''),
        styleResolution: 'styles',
      })
    )
  }

  function getType() {
    if (
      stylePropertyName === 'color' ||
      stylePropertyName === 'background-color' ||
      stylePropertyName === 'border-color'
    ) {
      return 'color'
    } else {
      return 'size'
    }
  }

  function isDefinded() {
    if (styleValue === undefined) return false
    return true
  }

  return (
    <div className="style-guide-property-wrap">
      <StylePropertyName
        classId={classId}
        optionId={optionId}
        optionVersionId={optionVersionId}
        stylePropertyName={stylePropertyName}
        folderId={folderId}
        itemId={itemId}
        propertyId={propertyId}
      />

      {getType() === 'size' &&
        (isDefinded() ? (
          <StyleGuideInput
            styleValue={styleValue}
            dispatchEditStyle={dispatchEditStyle}
          />
        ) : (
          <div
            className="text auto-set-text"
            onClick={() => dispatchEditStyle('')}
          >
            Auto (Set size)
          </div>
        ))}

      {getType() === 'color' &&
        (isDefinded() ? (
          <StyleGuideColorPicker
            styleValue={styleValue.value}
            dispatchEditStyle={dispatchEditStyle}
          />
        ) : (
          <div
            className="text auto-set-text"
            onClick={() => dispatchEditStyle('')}
            // onClick={() => dispatchEditStyle(`{{${projectSwatches[0].id}}}`)}
          >
            Auto <span>(Set color)</span>
          </div>
        ))}
    </div>
  )
}
