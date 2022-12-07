import { useDispatch, useSelector } from 'react-redux'
import { addFunctionToHtmlNode } from '../../../../features/project'
import PanelTabTitle from '../../left-sidebar/_atoms/PanelTabTitle'
import AddStoreItemForm from './AddStoreItemForm'
import ElementFunctionItem from './ElementFunctionItem'

export default function ElementsClassChanger() {
  const allFunctions = useSelector((state) => state.project.functions)
  const elementFunctions = useSelector(
    (state) => state.project.activeNodeObject?.functions
  )
  const dispatch = useDispatch()

  function handleFunctionItemClick(id) {
    dispatch(
      addFunctionToHtmlNode({
        functionId: id,
      })
    )
  }

  return (
    <>
      <PanelTabTitle text="Data Flows" />
      <div className="style-panel-box"></div>
      <PanelTabTitle text="Store" />
      <div className="style-panel-box"></div>
      <PanelTabTitle text="Data" />
      <div className="style-panel-box">
        <AddStoreItemForm />
      </div>
      <PanelTabTitle text="Actions" />
      <div className="style-panel-box">
        <div>
          <div className="text">On Click:</div>
          <div className="text">On Mouse Enter:</div>
        </div>
      </div>
      <PanelTabTitle text="Text" />
      <div className="style-panel-box"></div>
      <div className="style-panel-box title-box space-between folder-box">
        <div className="text panel-title">Styles</div>
        Add
      </div>

      <div className="style-panel-box"></div>
      <PanelTabTitle text="Watch" />
      <div className="style-panel-box"></div>

      <PanelTabTitle text="Global Actions" />
      <div className="style-panel-box">
        {allFunctions?.map((func) => (
          <div onClick={() => handleFunctionItemClick(func.id)} key={func.id}>
            {func.name}
          </div>
        ))}
        <div className="text">
          <b>Element functions</b>
        </div>
        {elementFunctions?.map((func) => (
          <ElementFunctionItem id={func.id} key={func.id} />
        ))}
      </div>
    </>
  )
}
