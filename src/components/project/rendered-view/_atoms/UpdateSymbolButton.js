import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editSymbolNodes } from '../../../../features/project'

export default function UpdateSymbolButton() {
  const editedSymbolId = useSelector((state) => state.project.editedSymbolId)
  const editedSymbolName = useSelector(
    (state) =>
      state.project.projectSymbols.find(
        ({ id }) => id === editedSymbolId.symbolId
      )?.name
  )
  const dispatch = useDispatch()

  const [isPositionTop, setIsPositionTop] = useState(false)

  if (editedSymbolId.symbolId !== '') {
    return (
      <div className={'update-symbol-wrap ' + (isPositionTop ? 'top' : '')}>
        <div className="flex items-center gap-8">
          <div
            className="update-symbol-button"
            onClick={() => dispatch(editSymbolNodes())}
          >
            Update Symbol: {editedSymbolName}
          </div>
          <div
            className="bg-white px-8 py-2 rounded-lg pointer text-sm"
            onClick={() => setIsPositionTop(!isPositionTop)}
          >
            {isPositionTop ? 'To Bottom' : 'To Top'}
          </div>
        </div>
      </div>
    )
  }
}
