import { useDispatch, useSelector } from 'react-redux'
import { deleteActiveHtmlNode } from '../../../../../features/project';
import DeleteIcon from '../../../../../img/bin.svg';

export default function DeleteButton() {
    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const dispatch = useDispatch()

    function handleClick(e) {
        e.stopPropagation();
        dispatch(deleteActiveHtmlNode());
    }

    return (
        <div className={"rich-element-settings_button button-centered active"} 
            onClick={handleClick}>
            <img src={DeleteIcon} style={{width: "10px"}} />
        </div>
    )
}