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
  const projectUploadedFonts = useSelector(
    (state) => state.project.projectUploadedFonts
  )
  const activeFontWeights = useSelector(
    (state) =>
      state.project.projectUploadedFonts?.find(
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
        {activeFontWeights.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
