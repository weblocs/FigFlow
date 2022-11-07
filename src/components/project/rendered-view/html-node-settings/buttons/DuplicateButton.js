import { useDispatch, useSelector } from 'react-redux'
import { copyHtmlNodes, pasteHtmlNodes } from '../../../../../features/project';
import PasteIcon from '../../../../../img/paste.svg';

export default function DuplicateButton() {
    const isNodeRepeatable = useSelector((state) => (state.project.activeNodeObject?.repeatable) ? true : false )
    const dispatch = useDispatch()

    function handleDuplicate() {
        dispatch(copyHtmlNodes());
        dispatch(pasteHtmlNodes());
    }

    return (
        <div className={"rich-element-settings_button button-centered active"} onClick={handleDuplicate}>
            <img src={PasteIcon} style={{width: "12px"}} />
        </div>
    )
}