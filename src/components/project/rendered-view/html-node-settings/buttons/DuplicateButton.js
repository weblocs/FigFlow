import { useDispatch, useSelector } from 'react-redux'
import { copyHtmlNodes, pasteHtmlNodes } from '../../../../../features/project';

export default function DuplicateButton() {
    const isNodeRepeatable = useSelector((state) => (state.project.activeNodeObject?.repeatable) ? true : false )
    const dispatch = useDispatch()

    function handleDuplicate() {
        dispatch(copyHtmlNodes());
        dispatch(pasteHtmlNodes());
    }

    return (
        <div className={"rich-element-settings_button button-centered" 
        + ((isNodeRepeatable) ? " active" : "")} onClick={handleDuplicate}>❐</div>
    )
}