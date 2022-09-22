import { useDispatch } from 'react-redux'
import { moveHtmlNode } from '../../../../../features/project'

export default function NodeMoveArrows({isHtmlNodeMoveable}) {
    const dispatch = useDispatch()
    return (
        <>
            <div className={"rich-element-settings_button button-centered" + ((isHtmlNodeMoveable) ? " active" : "")} 
            onClick={() => dispatch(moveHtmlNode({moveReverse:true}))}>↑</div>
            <div className={"rich-element-settings_button button-centered" + ((isHtmlNodeMoveable) ? " active" : "")} 
            onClick={() => dispatch(moveHtmlNode({moveReverse:false}))}>↓</div>           
        </>
    )
}