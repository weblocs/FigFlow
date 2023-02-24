import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import FontWeightSelect from './FontWeightSelect'
import DeleteFontButton from './DeleteFontButton'
import FontStyleSelect from './FontStyleSelect'

export default function FontItem({ fontId, weight }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  return (
    <div key={weight.weight} className="p-8 border border-b-0">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-8 mb-4 items-bottom">
            <FontWeightSelect fontId={fontId} weight={weight} />
            <FontStyleSelect fontId={fontId} weight={weight} />
          </div>
          <div className="text-sm">{weight?.name}</div>
        </div>
        <div className="flex gap-4">
          <DeleteFontButton fontId={fontId} weight={weight} />
        </div>
      </div>
    </div>
  )
}
