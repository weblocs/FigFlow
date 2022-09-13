import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInlineNodeStyleProperty, deletePropertyInPreRenderedStyle } from "../../features/pre-rendered-html-nodes";
import {doesStylePropertyBelongToActiveStyle, doesStylePropertyIsInlineFx} from "../../utils/nodes-editing"

export default function ProprtyInputLabel ({text,property}) {

    const activeStyleObject = useSelector((state) => state.designerProjectState.activeStyleObject);
    const activeNodeObject = useSelector((state) => state.designerProjectState.activeNodeObject);


    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode);
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles);
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName);

    

    const doesStylePropertyBelongToActiveClass = useSelector((state) => 
        doesStylePropertyBelongToActiveStyle(activeStyleObject,property)
    );

    const doesStylePropertyIsInline = useSelector((state) => 
        doesStylePropertyIsInlineFx(activeNodeObject,property)
    );

    // const doesStylePropertyIsSetInAnyClass = useSelector((state) => {
        // let mainStyleId = stylesInActiveNode?.[0]?.id;
        // let activeStyles = preRenderedStyles?.find(({id}) => id ===  mainStyleId);
        // if (activeStyles?.[activeProjectResolutionStylesListName]?.[property] !== undefined) {
        // }
        // return true;
        //     console.log(activeStyles);
            
        // } else {
            // activeNodeObject?.class?.forEach((item, index) => {
            //     if(index === 0) {

            //     } else {
            //         // console.log(activeStyles?.childrens?.[index]?.options?.find(({id}) => id === item.id));
            //     }
                
            // })
        //     return false;
        // }
    // });

    const dispatch = useDispatch();

    function handleClick() {
        if(doesStylePropertyIsInline) {
            dispatch(deleteInlineNodeStyleProperty(property))
        } else if(doesStylePropertyBelongToActiveClass) {
            dispatch(deletePropertyInPreRenderedStyle(property));
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