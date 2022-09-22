import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setActiveProjectResolution } from "../../../features/project";
import ResolutionSettingsIcon from '../../../img/dots-vertical.svg';
import ModalBackgroundCloser from "../_atoms/ModalBackgroundCloser";

export default function CustomResolutionsButton() {
    const projectMode = useSelector((state) => state.project.projectMode)
    const activeProjectResolution = useSelector((state) => state.project.activeProjectResolution)
    const dispatch = useDispatch()

    const [listIsOpened, setListIsOpened] = useState(false);

    function handleItemClick(resolutionNumber) {
        setListIsOpened(false);
        dispatch(setActiveProjectResolution(resolutionNumber));
    }

    if (projectMode === "developer") {
        return (
            <>

            <ModalBackgroundCloser 
            handleClick={() => setListIsOpened(false)} 
            isActiveIf={listIsOpened} />

            <div style={{position: "relative"}}>
                
                <div className={"custom-resolutions-button" + ((activeProjectResolution === "3" || activeProjectResolution === "5" || activeProjectResolution === "6" || activeProjectResolution === "7") ? " active" : "")} 
                onClick={() => setListIsOpened(true)}>
                    <img src={ResolutionSettingsIcon} />
                </div>

                <div className={"custom-resolutions-list" + ((listIsOpened) ? " active" : "")}>
                    <div className="custom-resolutions-list_item label-item">
                        Use custom resolution
                    </div>
                    <div className="custom-resolutions-list_item" onClick={() => handleItemClick("3")}>
                        <div>Portrait view</div>
                        <div className="text-description">Beetween 767px and 478px</div>
                    </div>
                    <div className="custom-resolutions-list_item" onClick={() => handleItemClick("5")}>
                        <div>Medium Destop View</div>
                        <div className="text-description">1280px and more</div>
                    </div>
                    <div className="custom-resolutions-list_item" onClick={() => handleItemClick("6")}>
                        <div>Large Destop View</div>
                        <div className="text-description">1440px and more</div>
                    </div>
                    <div className="custom-resolutions-list_item" onClick={() => handleItemClick("7")}>
                        <div>X-Large Destop View</div>
                        <div className="text-description">1920px and more</div>
                    </div>
                </div>

            </div>
            </>
        )
    }
}