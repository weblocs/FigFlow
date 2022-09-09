import { useDispatch, useSelector } from "react-redux"
import LogoIcon from '../img/logo.svg';
import ModeChanger from "./ModeChanger";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectLogo() {
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const dispatch = useDispatch()

    const [listIsOpened, setListIsOpened] = useState(false);

    useEffect(() => {
        setListIsOpened(false);
    },[projectMode]);

    return (
        <div className="addNodeButton">
            <div className="project-logo_wrapper" onClick={() => setListIsOpened(true)}>
                <img src={LogoIcon} style={{ width: "15px", opacity: "0.6"}} />
            </div>
            <div className={"unit-chooser_closer" + ((listIsOpened) ? " active" : "")}
                onClick={() => setListIsOpened(false)}>
            </div>
            <div className={"logo-settings-panel" + ((listIsOpened) ? " active" : "")}>
                <Link to="/">
                    <div className="logo-settings-panel-link">Dashboard</div>
                </Link>
                <ModeChanger />
            </div>
        </div>
)
}