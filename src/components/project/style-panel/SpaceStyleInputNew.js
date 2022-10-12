import React, { useState } from "react"
import { useSelector } from 'react-redux'
import ModalBackgroundCloser from "../_atoms/ModalBackgroundCloser";
import SpaceStyleInputEditor from "./SpaceStyleInputEditor";

function SpaceStyleInputNew({style}) {

    const styleValue = useSelector((state) => state.project.activeNodeComputedStyles?.[style.replace("-","_")])
    const [openEditor, setOpenEditor] = useState(false);

    return (
        <div>
            <span className="style-edit-text" onClick={() => setOpenEditor(true)}>{styleValue}</span>
            {openEditor &&
            <>
                <ModalBackgroundCloser handleClick={() => setOpenEditor(false)} isActiveIf={openEditor} />
                <SpaceStyleInputEditor />
            </>
            }
        </div>
    )
}

export default React.memo(SpaceStyleInputNew)