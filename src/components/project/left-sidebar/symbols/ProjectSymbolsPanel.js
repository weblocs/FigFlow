import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editSymbolName,
  deleteSymbol,
  addSymbolToProject,
  addSymbol,
  setSymbols,
} from '../../../../features/project'
import CreateNewItemInput from '../navigator/CreateNewItemInput'
import ListItemEditIcon from '../_atoms/ListItemEditIcon'
import { arrayMoveImmutable } from 'array-move'
import addIcon from '../../../../img/plus.svg'
import SymbolEditButton from './SymbolEditButton'
import SidePanel from '../../../ui/SidePanel'

export default function ProjectSymbolsPanel() {
  const dispatch = useDispatch()
  const projectSymbols = useSelector((state) => state.project.projectSymbols)
  const isActiveTab = useSelector(
    (state) => state.project.activeTab === 'Symbols'
  )

  const [createInputVisible, setCreateInputVisible] = useState(false)

  function handleClickInSymbolItem(symbolId) {
    dispatch(addSymbolToProject({ id: symbolId }))
  }

  const [draggedStartIndex, setDraggedStartIndex] = useState(-1)
  const [draggedOverIndex, setDraggedOverIndex] = useState(-1)

  const onSortEnd = (oldIndex, newIndex) => {
    if (newIndex > oldIndex) {
      newIndex--
    }
    dispatch(setSymbols(arrayMoveImmutable(projectSymbols, oldIndex, newIndex)))
  }

  function handleDragOver(index, id) {
    event.preventDefault()
    if (
      event.clientY - document.querySelector(`[richid="${id}"]`).offsetTop >
      20
    ) {
      setDraggedOverIndex(index + 1)
    } else {
      setDraggedOverIndex(index)
    }
  }

  function handleDrop() {
    onSortEnd(draggedStartIndex, draggedOverIndex)
    setDraggedStartIndex(-1)
    setDraggedOverIndex(-1)
  }

  return (
    <SidePanel isActive={isActiveTab}>
      <div className="side-panel-title">
        Symbols
        <div className="projectTabTitleButtonsBox">
          <button
            className="settings-list-add-button"
            onClick={() => setCreateInputVisible(!createInputVisible)}
          >
            <img className="settings-list-add-icon" src={addIcon} />
          </button>
        </div>
      </div>

      <CreateNewItemInput
        visibility={createInputVisible}
        setVisibility={setCreateInputVisible}
        create={addSymbol}
        placeholder="New symbol"
      />

      <div className="pagesList">
        {projectSymbols.map((symbol, index) => {
          return (
            <div
              key={symbol.id}
              draggable="true"
              onDragStart={() => setDraggedStartIndex(index)}
              onDragOver={() => handleDragOver(index, symbol.id)}
              onDrop={handleDrop}
              className="edit-icon_wrapper"
              richid={symbol.id}
            >
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => handleClickInSymbolItem(symbol.id)}
                  className={
                    'projectPageItem block-item ' +
                    (draggedOverIndex === index ? 'draggedOver' : '') +
                    (draggedOverIndex === index + 1 &&
                    index === projectSymbols.length - 1
                      ? 'draggedOverBottom'
                      : '')
                  }
                >
                  {symbol.name}
                </div>

                <SymbolEditButton
                  text="Edit Symbol"
                  itemType="symbol"
                  element={symbol}
                  editFx={editSymbolName}
                  deleteFx={deleteSymbol}
                  active={false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </SidePanel>
  )
}
