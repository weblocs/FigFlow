import { useDispatch, useSelector } from 'react-redux'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import { makeSymbolEditable } from '../../../../../features/project'

export default function SymbolSettings() {
  const editedSymbolId = useSelector((state) => state.project.editedSymbolId)
  const isNodeSymbol = useSelector(
    (state) => state.project.activeNodeObject?.type === 'sym'
  )
  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )
  const activeSymbolName = useSelector((state) => {
    const activeSymbolId = state.project.activeNodeObject?.symbolId
    if (activeSymbolId !== undefined) {
      return state.project.projectSymbols.find(
        ({ id }) => id === activeSymbolId
      )?.name
    }
  })
  const dispatch = useDispatch()

  // const { openSymbol } = useKeyboardShortcut(
  //   ['Shift'],
  //   (shortcutKeys) => {
  //     editedSymbolId.symbolId === '' &&
  //       dispatch(
  //         makeSymbolEditable({
  //           symbolId: activeNodeObject.symbolId,
  //           elementId: activeNodeObject.id,
  //         })
  //       )
  //   },
  //   {
  //     overrideSystem: false,
  //     ignoreInputFields: true,
  //     repeatOnHold: false,
  //   }
  // )

  if (isNodeSymbol) {
    return (
      <>
        <div
          className={
            'rich-element-settings_button button-centered text-button' +
            (isNodeSymbol ? ' active' : '')
          }
        >
          Symbol: {activeSymbolName}
        </div>
        <div
          className="rich-element-settings_button button-centered active"
          onClick={() =>
            editedSymbolId.symbolId === '' &&
            dispatch(
              makeSymbolEditable({
                symbolId: activeNodeObject.symbolId,
                elementId: activeNodeObject.id,
              })
            )
          }
        >
          ✎
        </div>
      </>
    )
  }
}
