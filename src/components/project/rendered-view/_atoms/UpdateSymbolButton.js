import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import {
  editSymbolNodes,
  editSymbolNodesOnInactivePage,
  finishEditingSymbolNodes,
  unlinkSymbolNodes,
  unwrapActiveHtmlNode,
} from '../../../../features/project'

export default function UpdateSymbolButton() {
  const editedSymbolId = useSelector((state) => state.project.editedSymbolId)
  const isSymbolEdited = useSelector(
    (state) => state.project.editedSymbolId.symbolId !== ''
  )
  const editedSymbolName = useSelector(
    (state) =>
      state.project.projectSymbols.find(
        ({ id }) => id === editedSymbolId.symbolId
      )?.name
  )

  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )

  const activePageIndex = useSelector((state) => state.project.activePageIndex)
  const nodesEditMode = useSelector((state) => state.project.nodesEditMode)

  const dispatch = useDispatch()

  const [isPositionTop, setIsPositionTop] = useState(false)

  // useEffect(() => {
  //   if (isSymbolEdited) {
  //     dispatch(editSymbolNodes())
  //   }
  // }, [activeNodeObject])

  function handleClick() {
    dispatch(editSymbolNodes())
    dispatch(finishEditingSymbolNodes())
  }

  const { updateASymbol } = useKeyboardShortcut(
    ['A'],
    (shortcutKeys) => {
      console.log('1')
      dispatch(editSymbolNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { updateSymbol } = useKeyboardShortcut(
    ['Shift', 'A'],
    (shortcutKeys) => {
      dispatch(editSymbolNodes())
      dispatch(finishEditingSymbolNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { finishSymbol } = useKeyboardShortcut(
    ['Escape'],
    (shortcutKeys) => {
      dispatch(editSymbolNodes())
      dispatch(finishEditingSymbolNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  // useEffect(() => {
  //   if (isSymbolEdited) {
  //     console.log('1')
  //     dispatch(editSymbolNodesOnInactivePage({pageId: }))
  //   }
  // }, [activePageIndex, nodesEditMode])

  if (isSymbolEdited) {
    return (
      <div className={'update-symbol-wrap ' + (isPositionTop ? 'top' : '')}>
        <div className="flex items-center gap-8">
          <div className="update-symbol-button" onClick={handleClick}>
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
