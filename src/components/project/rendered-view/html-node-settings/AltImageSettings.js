import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode, setKeyboardNavigationOn } from '../../../../features/project';

export default function AltImageSettings() {
    const isNodeImage = useSelector((state) => state.project.activeNodeObject?.type === "img")
    const altText = useSelector((state) => state.project.activeNodeObject?.altText || "")
    const dispatch = useDispatch()

    const [isListOpen, setIsListOpen] = useState(false);

    const areaRef = useRef();

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
        dispatch(editHtmlNode({field: 'altText', value: areaRef.current.value}))
    }

    useEffect(() => {
        areaRef.current.value = altText; 
    },[altText])
    
    return (
        <div>
            <div className={"rich-element-settings_button alt-text-button"  + ((altText !== "") ? " active" : "") + ((isNodeImage) ? " isImage" : "")}
            onClick={() => setIsListOpen(isListOpen => !isListOpen)}>ALT</div>
            
            <div className={"heading-element-settings_list alt-text-box" + ((isListOpen && isNodeImage) ? " active" : "")}>
                <span className='alt-text-title'>Set text</span>
                <textarea ref={areaRef} onFocus={handleFocus} onBlur={handleBlur}></textarea>
            </div>
        </div>
    )
}