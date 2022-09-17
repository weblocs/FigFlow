import { useDispatch, useSelector } from "react-redux"
import {updateEditedSymbol} from "../../../../features/pre-rendered-html-nodes"


export default function UpdateSymbolButton() {
    const editedSymbolId = useSelector((state) => state.designerProjectState.editedSymbolId)
    const editedSymbolName = useSelector((state) => state.designerProjectState.projectSymbols.find(({id}) => id === editedSymbolId.symbolId)?.name)
    const dispatch = useDispatch()

    if(editedSymbolId.symbolId !== "") {
        return (
            <div className="update-symbol-button" 
            onClick={() => dispatch(updateEditedSymbol())}>
                Update Symbol: {editedSymbolName}
            </div>
        )
    }
}