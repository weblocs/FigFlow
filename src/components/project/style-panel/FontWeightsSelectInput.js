import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'

export default function FontWeightsSelectInput({ style }) {
  const activeNodeFontFamilyNamePreRender = useSelector(
    (state) =>
      state.project.activeStyleObject?.font_family ||
      state.project.activeNodeComputedStyles?.font_family
  )
  const activeStyleValue = useSelector(
    (state) => state.project.activeNodeComputedStyles?.[style.replace('-', '_')]
  )
  const fonts = useSelector((state) => state.project.fonts)
  const activeFontWeights = useSelector(
    (state) =>
      state.project.fonts?.find(
        ({ name }) =>
          name === activeNodeFontFamilyNamePreRender?.replaceAll('"', '')
      )?.weights || ['']
  )

  const dispatch = useDispatch()

  function handleInputChange(e) {
    dispatch(editStyleProperty([style, e.target.value]))
  }

  return (
    <div className="select-input-wrap">
      <select
        className="style-panel-select text"
        onChange={handleInputChange}
        value={activeStyleValue?.replaceAll('"', '')}
      >
        {activeFontWeights.map((option, i) => (
          <option value={option.weight} key={i + option.weight}>
            {option.weight}
          </option>
        ))}
      </select>
    </div>
  )
}
