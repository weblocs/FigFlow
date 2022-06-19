import { useDispatch, useSelector } from "react-redux";
import {editStyleInPreRenderedStyles, setArrowNavigationOn} from "../../features/pre-rendered-html-nodes"

export default function FontStyleEditor () {
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const projectUploadedFonts = useSelector((state) => state.designerProjectState.projectUploadedFonts)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)
    const nodeStyles = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex])
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
            <div className={"style-title-box" + ((fontIsSet) ? " active" : "")}>
            <div className="text">Font</div>
            </div>
            <div className="input">
            <select className="style-panel-select text" onChange={handleFontInputChange} value={activeNodeFontName}>
                {projectUploadedFonts.map((font) => (
                    <option key={font.name}>{font.name}</option>
                ))}
            </select>
            </div>
        </div>
        <div className="size-style-box">
            <div className={"style-title-box" + ((activeNodeFontWeightNamePreRender !== undefined) ? " active" : "")}>
                <div className="text">Weight</div>
            </div>
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