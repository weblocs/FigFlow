import { useDispatch, useSelector } from 'react-redux'
import { addActiveHtmlNodeBlockFolders } from '../../../features/project'

export default function BlockFolderCheckbox(props) {
    const blockState = useSelector((state) => state.project.activeNodeObject?.blockFolders?.find(({id}) => id === props.id)?.state || false)
    const dispatch = useDispatch()

    function handleChange(e) {
        dispatch(addActiveHtmlNodeBlockFolders({id:props.id,state:e.target.checked}));
    }

    return (
        <div className="style-panel-box" style={{display:"flex"}}>
            <div>{props.name}: </div> 
            <input type="checkbox" onChange={handleChange} checked={blockState} />
        </div>
    )
}