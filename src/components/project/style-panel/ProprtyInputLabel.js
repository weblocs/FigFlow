import { useDispatch, useSelector } from "react-redux";
import { deleteActiveHtmlNodeInlineStyleProperty, deleteStyleProperty } from "../../../features/project";

export default function ProprtyInputLabel ({text,property}) {

    const doesStylePropertyBelongToActiveClass = useSelector((state) => 
        state.project.activeStyleObject?.[property] !== undefined
    );

    const doesStylePropertyIsInline = useSelector((state) => 
        state.project.activeNodeObject?.styles?.styles?.[property] !== undefined
    );

    const dispatch = useDispatch();

    function handleClick() {
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
    }

    return (
        <div 
        className={"style-title-box" + 
        ((doesStylePropertyBelongToActiveClass) ? " active" : "") +
        ((doesStylePropertyIsInline) ? " isInline" : "")}
        >
            <div className="text" onClick={handleClick}>{text}</div>
        </div>
    )
}