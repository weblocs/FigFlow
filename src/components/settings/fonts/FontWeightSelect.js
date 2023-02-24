import { useDispatch } from 'react-redux'
import { editFontWeight } from '../../../features/project'
import Label from '../../ui/Label'

export default function FontWeightSelect({ fontId, weight }) {
  const dispatch = useDispatch()

  function handleChange(e) {
    dispatch(
      editFontWeight({
        fontId: fontId,
        weightId: weight.id,
        weight: e.target.value,
      })
    )
  }

  return (
    <div className="">
      <select onChange={handleChange} value={weight.weight}>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
        <option value="600">600</option>
        <option value="700">700</option>
        <option value="800">800</option>
        <option value="900">900</option>
      </select>
    </div>
  )
}
