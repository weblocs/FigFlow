import { useDispatch, useSelector } from 'react-redux'
import {
  editStyleProperty,
  setKeyboardNavigationOn,
} from '../../../features/project'
import FontWeightsSelectInput from './FontWeightsSelectInput'
import ProprtyInputLabel from './ProprtyInputLabel'
import StyleSelectInput from './StyleSelectInput'

export default function FontStyleEditor() {
  const fonts = useSelector((state) => state.project.fonts)

  const dispatch = useDispatch()

  function handleFontWeightInputChange(e) {
    dispatch(editStyleProperty(['font-weight', e.target.value]))
  }

  return (
    <div className="_1-col-style-grid">
      <div className="size-style-box">
        <ProprtyInputLabel text="Font" property="font-family" />
        <StyleSelectInput style="font-family" options={fonts} />
      </div>
      <div className="size-style-box">
        <ProprtyInputLabel text="Weight" property="font-weight" />
        <FontWeightsSelectInput style="font-weight" />
      </div>
    </div>
  )
}
