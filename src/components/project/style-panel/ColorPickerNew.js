import { useDispatch, useSelector } from 'react-redux'
import ProprtyInputLabel from './ProprtyInputLabel';

export default function ColorPickerNew(props) {
    const projectSwatches = useSelector((state) => state.project.projectSwatches);
    const editedStyleValue = useSelector((state) => state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]);
    
    const dispatch = useDispatch()

    return (
        <div className="size-style-box">

            <ProprtyInputLabel text="Color" property={props.style} />

            <div 
            className="color-picker_color-box" 
            style={{backgroundColor: editedStyleValue}} 
            onClick={handleOpeningSwatchesEditor}></div>

        </div>
    )
}