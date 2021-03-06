import { useDispatch, useSelector } from "react-redux";
import {editStyleInPreRenderedStyles, setKeyboardNavigationOn} from "../../features/pre-rendered-html-nodes"
import ProprtyInputLabel from "./ProprtyInputLabel";

export default function FontStyleEditor () {
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const projectUploadedFonts = useSelector((state) => state.designerProjectState.projectUploadedFonts)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)
    
    const activeStyleOptionIndex = useSelector((state) => state.designerProjectState.activeStyleOptionIndex);
    const nodeStyles = useSelector((state) => {
        if(activeStyleId === stylesInActiveNode?.[0]?.id) {
            return preRenderedStyles[activeStyleIndex];
        } else {
            return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId);
        }   
    })
    const activeNodeFontFamilyNamePreRender = nodeStyles?.[activeProjectResolutionStylesListName]?.['font-family'];
    const activeNodeFontWeightNamePreRender = nodeStyles?.[activeProjectResolutionStylesListName]?.['font-weight'];

    
    
    const fontIsSet = useSelector((state) => {
        if (activeNodeFontFamilyNamePreRender !== undefined) {
            return true;
        }
        return false;
    });
    
    const activeNodeFontName = useSelector((state) => {
        if (activeNodeFontFamilyNamePreRender !== undefined) {
            return activeNodeFontFamilyNamePreRender;
        }
        if(activeNodeId !== "") {
            try {
                const activeNode = document.querySelector(`[el_id="${activeNodeId}"]`);
                return getComputedStyle(activeNode)?.['font-family'];
            } catch {
            }
        }  
    });



    const activeFontWeights = useSelector((state) => {
        if (projectUploadedFonts?.find(({name}) => name === activeNodeFontName)?.weights !== undefined) {
            return projectUploadedFonts?.find(({name}) => name === activeNodeFontName)?.weights;
        }
        return [""];
    });

    const dispatch = useDispatch();

    function handleFontInputChange(e) {
        dispatch(editStyleInPreRenderedStyles(['font-family',e.target.value]));
    }

    function handleFontWeightInputChange(e) {
        dispatch(editStyleInPreRenderedStyles(['font-weight',e.target.value]));
    }
    return (
    <div className="_1-col-style-grid">
        <div className="size-style-box">
            
            <ProprtyInputLabel text="Font" property="font-family" />

            <div className="input">
            <select className="style-panel-select text" onChange={handleFontInputChange} value={activeNodeFontName}>
                {projectUploadedFonts.map((font) => (
                    <option key={font.name}>{font.name}</option>
                ))}
            </select>
            </div>
        </div>
        <div className="size-style-box">
            <ProprtyInputLabel text="Weight" property="font-weight" />
            
            <div className="input">
                <select  className="style-panel-select text" onChange={handleFontWeightInputChange} value={activeNodeFontWeightNamePreRender}>
                    {activeFontWeights.map((fontWeight) => (
                        <option key={fontWeight}>{fontWeight}</option>
                    ))}
                </select>
            </div>
        </div>
    </div>
    )}