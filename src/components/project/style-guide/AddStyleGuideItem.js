import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addStyleGuideItem,
  setKeyboardNavigationOn,
} from '../../../features/project'

export default function AddStyleGuideItem({ id }) {
  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [pickedStyleId, setPickedStyleId] = useState(null)
  const [pickedOptionId, setPickedOptionId] = useState(null)
  const [pickedOptionVersionId, setPickedOptionVersionId] = useState(null)
  const [pickedResolutionState, setPickedResolution] = useState('default')

  const inputRef = useRef()

  function handleSubmit() {
    event.preventDefault()
    dispatch(
      addStyleGuideItem({
        name: inputRef.current.value,
        folderId: id,
        styleId: pickedStyleId,
        optionId: pickedOptionId,
        optionVersionId: pickedOptionVersionId,
        resolutionState: pickedResolutionState,
      })
    )
    inputRef.current.focus()
    setIsOpen(false)
  }

  function handleClick() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus()
      setPickedStyleId(null)
      setPickedOptionId(null)
      setPickedOptionVersionId(null)
    }
  }, [isOpen])

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  function handleClickMainOption() {
    setPickedOptionId('')
    setPickedOptionVersionId('')
  }

  return (
    <div className="style-guide-add-folder_wrap">
      <div className="style-guide-add-folder_button" onClick={handleClick}>
        <div className="text">Add Item</div>
      </div>

      {isOpen && (
        <form className="style-guide-add-folder_form" onSubmit={handleSubmit}>
          <input
            className="settings-input"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
          />

          {pickedStyleId === null && (
            <div className="style-guide-add_class-pick_wrap">
              {preRenderedStyles.map((style) => (
                <div
                  className="style-guide-add_class-pick_item"
                  onClick={() => setPickedStyleId(style.id)}
                  key={style.id}
                >
                  {style.name}
                </div>
              ))}
            </div>
          )}
          {pickedStyleId !== null && pickedOptionId === null && (
            <div>
              <div className="style-guide-add_class-pick_picked-item">
                picked class:{' '}
                {
                  preRenderedStyles.find((style) => style.id === pickedStyleId)
                    .name
                }
                <div className="style-guide-add_class-pick_wrap">
                  <div
                    className="style-guide-add_class-pick_item"
                    onClick={handleClickMainOption}
                  >
                    main style
                  </div>
                  {preRenderedStyles
                    .find((style) => style.id === pickedStyleId)
                    .childrens.map((option) => (
                      <div
                        className="style-guide-add_class-pick_item"
                        onClick={() => setPickedOptionId(option.id)}
                        key={option.id}
                      >
                        {option.defaultName}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {pickedStyleId !== null &&
            pickedOptionId !== null &&
            pickedOptionId !== '' &&
            pickedOptionVersionId === null && (
              <div>
                <div className="style-guide-add_class-pick_picked-item">
                  picked class:{' '}
                  {
                    preRenderedStyles.find(
                      (style) => style.id === pickedStyleId
                    ).name
                  }
                </div>
                <div className="style-guide-add_class-pick_picked-item">
                  picked option:{' '}
                  {
                    preRenderedStyles
                      .find((style) => style.id === pickedStyleId)
                      .childrens.find((option) => option.id === pickedOptionId)
                      .defaultName
                  }
                </div>
                <div className="style-guide-add_class-pick_wrap">
                  {preRenderedStyles
                    .find((style) => style.id === pickedStyleId)
                    .childrens.find((option) => option.id === pickedOptionId)
                    .options.map((optionVersion) => (
                      <div
                        className="style-guide-add_class-pick_item"
                        onClick={() =>
                          setPickedOptionVersionId(optionVersion.id)
                        }
                        key={optionVersion.id}
                      >
                        {optionVersion.name}
                      </div>
                    ))}
                </div>
              </div>
            )}

          {pickedStyleId !== null &&
            pickedOptionId !== null &&
            pickedOptionVersionId !== null && (
              <div className="style-guide-add_class-pick_picked-item">
                picked class:{' '}
                {
                  preRenderedStyles.find((style) => style.id === pickedStyleId)
                    .name
                }
              </div>
            )}

          {pickedStyleId !== null &&
            pickedOptionId !== null &&
            pickedOptionVersionId !== null &&
            pickedOptionVersionId !== '' && (
              <div>
                <div className="style-guide-add_class-pick_picked-item">
                  picked option:{' '}
                  {
                    preRenderedStyles
                      .find((style) => style.id === pickedStyleId)
                      .childrens.find((option) => option.id === pickedOptionId)
                      .defaultName
                  }
                  -
                  {
                    preRenderedStyles
                      .find((style) => style.id === pickedStyleId)
                      .childrens.find((option) => option.id === pickedOptionId)
                      .options.find(
                        (optionVersion) =>
                          optionVersion.id === pickedOptionVersionId
                      ).name
                  }
                </div>

                <div>
                  <select
                    value={pickedResolutionState}
                    onChange={(e) => setPickedResolution(e.target.value)}
                  >
                    <option value="default">default</option>
                    <option value="hover">hover</option>
                  </select>
                </div>
              </div>
            )}

          {pickedStyleId !== null &&
            pickedOptionId !== null &&
            pickedOptionVersionId !== null && (
              <div>
                <button className="settings-button blue-button" type="submit">
                  Add Item
                </button>
              </div>
            )}
        </form>
      )}
    </div>
  )
}
