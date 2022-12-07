import { useDispatch, useSelector } from 'react-redux'
import ColorPickerSwatch from './ColorPickerSwatch'
import { ChromePicker } from 'react-color'
import {
  deleteSwatch,
  editStyleProperty,
  editSwatch,
} from '../../../features/project'
import { useEffect, useState } from 'react'
import addIcon from '../../../img/plus.svg'
import ColorPickerAddSwatch from './ColorPickerAddSwatch'
import ColorPickerDeleteSwatch from './ColorPickerDeleteSwatch'
import ColorPickerEditSwatch from './ColorPickerEditSwatch'

export default function ColorPickerPopUp({
  color,
  activeSwatchId,
  style,
  swatchName,
}) {
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  const dispatch = useDispatch()

  function handleColorPickerChange(color, event) {
    if (colorPickerState !== 'edit') {
      dispatch(editStyleProperty([style, color.hex]))
    } else {
      dispatch(
        editSwatch({
          id: activeSwatchId,
          color: color.hex,
        })
      )
    }
    if (colorPickerState !== 'add' && colorPickerState !== 'edit') {
      setColorPickerState('')
    }
  }

  function handleUnlink() {
    dispatch(editStyleProperty([style, color]))
    setColorPickerState('')
  }

  useEffect(() => {
    if (activeSwatchId !== '') {
      setColorPickerState('picked')
    }
  }, [])

  const [colorPickerState, setColorPickerState] = useState('') // "add", "picked", "unlink", "edit", "delete"

  return (
    <div>
      <div className="swatches-box active">
        <ChromePicker color={color} onChange={handleColorPickerChange} />
        <div className="swatches-list">
          {projectSwatches.map((swatch) => {
            return (
              <ColorPickerSwatch
                style={style}
                activeSwatchId={activeSwatchId}
                key={swatch.id}
                swatch={swatch}
                handleSwatchClick={() => setColorPickerState('picked')}
              />
            )
          })}
          {colorPickerState !== 'add' && (
            <div
              className="swatch-add-new-button"
              onClick={() => setColorPickerState('add')}
            >
              <img
                src={addIcon}
                alt=""
                className="swatch-add-new-button-icon"
              />
            </div>
          )}
        </div>
        {colorPickerState === 'add' && (
          <ColorPickerAddSwatch
            style={style}
            color={color}
            cancelClick={() => setColorPickerState('')}
          />
        )}
        {colorPickerState === 'picked' && (
          <div className="swatch-picked-wrap">
            <div className="swatch-picked-message">Swatch: {swatchName}</div>
            <div className="swatch-picked-buttons">
              <div className="swatch-picked-button" onClick={handleUnlink}>
                Unlink
              </div>
              <div
                className="swatch-picked-button"
                onClick={() => setColorPickerState('edit')}
              >
                Edit
              </div>
              <div
                className="swatch-picked-button"
                onClick={() => setColorPickerState('delete')}
              >
                Delete
              </div>
            </div>
          </div>
        )}
        {colorPickerState === 'delete' && (
          <ColorPickerDeleteSwatch
            setColorPickerState={setColorPickerState}
            activeSwatchId={activeSwatchId}
            color={color}
          />
        )}
        {colorPickerState === 'edit' && (
          <ColorPickerEditSwatch
            swatchName={swatchName}
            setColorPickerState={setColorPickerState}
            activeSwatchId={activeSwatchId}
            color={color}
          />
        )}
      </div>
    </div>
  )
}
