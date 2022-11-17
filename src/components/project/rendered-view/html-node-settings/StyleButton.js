import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import addImage from "../../../../img/styling.svg";

export default function StyleButton() {
    const objectGlobalStyles = useSelector(
        (state) => state.project.objectHierarchyStyles.filter(style => style.isInline === false)
    )
    const objectLocalStyles = useSelector(
        (state) => state.project.objectHierarchyStyles.filter(style => style.isInline === true)
    )
    const dispatch = useDispatch()

    const [isListOpen, setIsListOpen] = useState(false);

    function handleClick() {
        setIsListOpen(!isListOpen);
    }

    return (
        <div style={{position: "relative"}}>
            <div 
            onClick={handleClick}
            className="rich-element-settings_button button-centered active">
                <img style={{width: "12px"}} src={addImage} />
            </div>
            <div className={"heading-element-settings_list" + ((isListOpen) ? " active" : "")}>
                <div className='rich-element-settings_button-text hierarchy-item'>
                    Global
                </div>
                {objectGlobalStyles.map((style,i) => (
                    <div className='rich-element-settings_button-text hierarchy-item' key={i}>
                        <span>{style.style}</span>
                        {style.value}
                        <div className='hierarchy-from-wrap'>
                            <span>{style.origin}</span>
                            <span>{style.option}</span>
                        </div>
                    </div>
                ))}
                <div className='rich-element-settings_button-text hierarchy-item'>
                    Local
                </div>
                {objectLocalStyles.map((style,i) => (
                    <div className='rich-element-settings_button-text hierarchy-item' key={i}>
                        <span>{style.style}</span>
                        {style.value}
                        <div className='hierarchy-from-wrap'>
                            <span>{style.origin}</span>
                            <span>{style.option}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}