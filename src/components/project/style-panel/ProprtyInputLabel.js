import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActiveHtmlNodeInlineStyleProperty, deleteStyleProperty } from "../../../features/project";
import { getResolutionName } from "../../../utils/nodes-editing";

export default function ProprtyInputLabel ({text,property}) {


    const objectHierarchyStyles = useSelector((state) => state.project.objectHierarchyStyles?.findLast(({style}) => style === property));

    const doesStylePropertyBelongToActiveClass = useSelector((state) => (objectHierarchyStyles?.isActive === true));

    const isPropertyInStyleHierarchy = useSelector((state) => objectHierarchyStyles !== undefined);

    const doesStylePropertyIsInline = useSelector((state) => objectHierarchyStyles?.isInline === true);

    const isStylePropertyFromActiveResolution = useSelector((state) => objectHierarchyStyles?.resolution === state.project.activeProjectResolution);

    const dispatch = useDispatch();

    const [isInfoOpen, setIsInfoOpen] = useState(false);

    function handleClick() {
        if(isPropertyInStyleHierarchy || doesStylePropertyIsInline || doesStylePropertyBelongToActiveClass) {
            setIsInfoOpen(true);
        }
    }

    function handlePropertyReset() {
        if(doesStylePropertyIsInline) {
            dispatch(deleteActiveHtmlNodeInlineStyleProperty(property))
            if (property === "flex-grow") { 
                dispatch(deleteActiveHtmlNodeInlineStyleProperty("flex-shrink"));
                dispatch(deleteActiveHtmlNodeInlineStyleProperty("flex-basis"));
            }
        } else if(doesStylePropertyBelongToActiveClass) {
            dispatch(deleteStyleProperty(property));
            if (property === "flex-grow") { 
                dispatch(deleteStyleProperty("flex-shrink"));
                dispatch(deleteStyleProperty("flex-basis"));
            }
        }  
        setIsInfoOpen(false);
    }

    return (
        <div 
        className={"style-title-box" + 
        ((doesStylePropertyBelongToActiveClass) ? " active" : "") +
        ((doesStylePropertyIsInline && isStylePropertyFromActiveResolution) ? " isInline" : "") +
        ((isPropertyInStyleHierarchy) ? " isInHierarchy" : "")}
        >
            <div className="text" onClick={handleClick}>{text}</div>
                <div 
                onClick={() => setIsInfoOpen(false)}
                className={"style-property-info_closer" + 
                    ((isInfoOpen) ? " active" : "")}></div>
                <div className={"style-property-info" + 
                    ((isInfoOpen) ? " active" : "")}>
                    <div 
                    className={"reset-button" + ((doesStylePropertyIsInline || doesStylePropertyBelongToActiveClass) ? " active" : "")}
                    onClick={handlePropertyReset}>Reset</div>



                    <div className={"style-property-info-text" + 
                        ((doesStylePropertyIsInline) ? " active" : "")}>
                        Inline property
                    </div>

                    <div className={"style-property-info-text" + 
                        ((objectHierarchyStyles?.origin !== '') ? " active" : "")}>
                        Class: {objectHierarchyStyles?.origin}
                    </div>
                    <div className={"style-property-info-text" + 
                        ((objectHierarchyStyles?.option !== '') ? " active" : "")}>
                        Option: {objectHierarchyStyles?.option}
                    </div>
                    <div className={"style-property-info-text" + 
                        ((objectHierarchyStyles?.resolution !== '') ? " active" : "")}>
                        Resolution: {getResolutionName(objectHierarchyStyles?.resolution)}
                    </div>
                    <div className={"style-property-info-text active"}>
                        State: <span>{objectHierarchyStyles?.state}</span>
                    </div>
                </div>
        </div>
    )
}