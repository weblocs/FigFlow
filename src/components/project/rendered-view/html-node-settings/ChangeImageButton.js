import { useDispatch, useSelector } from 'react-redux'
import { setActiveProjectTab, setActiveProjectTabOn } from '../../../../features/project';
import Icon from '../../../../img/photo.svg';

export default function ChangeImageButton() {
    const isActiveNodeImage = useSelector((state) => state.project.activeNodeObject?.type === "img")
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(setActiveProjectTab("Images"))
    }

    return (
        <div className={"rich-element-settings_button button-centered " + (isActiveNodeImage ? " active" : "")} onClick={handleClick}>
            <img src={Icon} style={{width: "12px"}} />
        </div>
    )
}