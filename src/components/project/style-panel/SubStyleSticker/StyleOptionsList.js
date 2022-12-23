import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveStyleId,
  setActiveHtmlNodeStyleOption,
  editStyleSubOption,
  setActiveStyleOptionIndex,
  deleteStyleSubOption,
} from '../../../../features/project'
import SubStyleEdit from './SubStyleEdit'

export default function StyleOptionsList({
  index,
  handleOpen,
  editingOptionsTurnOn,
}) {
  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )
  const stylesInActiveNode = useSelector(
    (state) => state.project.stylesInActiveNode
  )

  const dispatch = useDispatch()

  function handleStyleOptionClick(id, name) {
    dispatch(setActiveHtmlNodeStyleOption({ index: index, id: id, name: name }))
    dispatch(setActiveStyleId(id))
    dispatch(setActiveStyleOptionIndex(index))
    handleOpen(false)
  }

  return (
    <div className="style-option-list">
      {preRenderedStyles
        .find(({ id }) => id === stylesInActiveNode?.[0].id)
        ?.childrens[index].options.map((option) => (
          <div className="style-option-item" key={option.id}>
            <div
              className="style-option-item-text"
              onClick={() => handleStyleOptionClick(option.id, option.name)}
            >
              {option.name}
            </div>
            {editingOptionsTurnOn && (
              <div className={'style-option-item_icons active'}>
                <div className="style-option-item_delete-icon">
                  <SubStyleEdit
                    index={index}
                    text="Edit Option"
                    itemType="option"
                    element={option}
                    editFx={editStyleSubOption}
                    deleteFx={deleteStyleSubOption}
                    active={true}
                    isDeleteButtonVisible={true}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
