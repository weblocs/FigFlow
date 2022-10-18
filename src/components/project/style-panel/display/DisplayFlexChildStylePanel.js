import { useSelector } from "react-redux";
import ProprtyInputLabel from "../ProprtyInputLabel";
import DisplayFlexChildSizingButton from "./DisplayFlexChildSizingButton";

export default function DisplayFlexChildStylePanel () {

    const isActiveNodeParentDisplayStyleFlex = useSelector((state) => (state.project.isActiveNodeParentDisplayStyleFlex === true))
    
    return (
        <div className={"style-panel-box" + (isActiveNodeParentDisplayStyleFlex ? "" : " hidden")} >
            <div className="text text-margin-bottom-12">Flex Child</div>
            <div className="display-horizontal-grid">
                <div className="style-title-box">
                    <ProprtyInputLabel text="Sizing" property="flex-grow" />
                </div>
                <div className="display-buttons-box">
                    <DisplayFlexChildSizingButton value="shrink" letter="S"/>
                    <DisplayFlexChildSizingButton value="grow" letter="G"/>
                    <DisplayFlexChildSizingButton value="dont" letter="D"/>
                </div>
            </div>
        </div>
    )
}