import { useDispatch, useSelector } from "react-redux";
import { deleteActiveHtmlNodeInlineStyleProperty, deleteStyleProperty } from "../../../features/project";
import {doesStylePropertyBelongToActiveStyle, doesStylePropertyIsInlineFx} from "../../../utils/nodes-editing"

export default function ProprtyInputLabel ({text,property}) {

    
    const activeStyleObject = useSelector((state) => state.project.activeStyleObject);
    const activeNodeObject = useSelector((state) => state.project.activeNodeObject);

    const doesStylePropertyBelongToActiveClass = useSelector((state) => 
        doesStylePropertyBelongToActiveStyle(activeStyleObject,property)
    );

    const doesStylePropertyIsInline = useSelector((state) => 
        doesStylePropertyIsInlineFx(activeNodeObject,property)
    );

    // const doesStylePropertyIsSetInAnyClass = useSelector((state) => {
        // let mainStyleId = stylesInActiveNode?.[0]?.id;
        // let activeStyles = preRenderedStyles?.find(({id}) => id ===  mainStyleId);
        // const activeStyle = activeStyles?.[activeResolutionName];
        
        // if (activeStyle?.[property] !== undefined) {
        //     return true;
        // } 

        // activeNodeObject?.class?.forEach((item, index) => {
        //     if(index !== 0) {
        //         const option = activeStyles?.childrens?.[index-1]?.options?.find(({id}) => id === item.id);
                
        //         if(option?.[activeResolutionName]?.[property] !== undefined) {
        //             // console.log(property);
        //             return true;
        //         }
        //         // console.log(property);
        //         // console.log(activeStyles?.childrens?.[index-1]?.options?.find(({id}) => id === item.id)?.[activeResolutionName]);
                
        //     }
        // })
    // });

    const dispatch = useDispatch();

    function handleClick() {
        if(doesStylePropertyIsInline) {
            dispatch(deleteActiveHtmlNodeInlineStyleProperty(property))
        } else if(doesStylePropertyBelongToActiveClass) {
            dispatch(deleteStyleProperty(property));
        }  
    }

    // console.log("render");

    return (
        <div 
        className={"style-title-box" + 
        // ((doesStylePropertyIsSetInAnyClass) ? " isSet" : "") +
        ((doesStylePropertyBelongToActiveClass) ? " active" : "") +
        ((doesStylePropertyIsInline) ? " isInline" : "")}
        >
            <div className="text" onClick={handleClick}>{text}</div>
        </div>
    )
}