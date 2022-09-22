import { useDispatch, useSelector } from "react-redux"
import {editSymbolNodes} from "../../../../features/project"


export default function UpdateSymbolButton() {
    const editedSymbolId = useSelector((state) => state.project.editedSymbolId)
    const editedSymbolName = useSelector((state) => state.project.projectSymbols.find(({id}) => id === editedSymbolId.symbolId)?.name)
    const dispatch = useDispatch()

    if(editedSymbolId.symbolId !== "") {
        return (
            <div className="update-symbol-button" 
            onClick={() => dispatch(editSymbolNodes())}>
                Update Symbol: {editedSymbolName}
            </div>
        )
    }
}