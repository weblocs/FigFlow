import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOpenedSettingsPage } from "../features/pre-rendered-html-nodes";

export default function ConfirmPopUpButton({handleOnClick}) {
    const openedSettingsPage = useSelector((state) => state.designerProjectState.openedSettingsPage)
    const dispatch = useDispatch()

    const [confirmPopUpOpened, setConfirmPopUpOpened] = useState(false);

    function confirmClick() {
        handleOnClick();
        setConfirmPopUpOpened(false);
        dispatch(setOpenedSettingsPage({}));
    }

    return (
        <div>
            <div className={"confirm-popup" + (confirmPopUpOpened ? " active" : "")}>
                <div className="confirm-popup_close-bg" onClick={() => setConfirmPopUpOpened(false)}></div>
                <div className="confirm-popup_box">
                    
                <div className="confirmation-popup_message">
                    Are you sure you want to delete the "{openedSettingsPage?.name}" {(openedSettingsPage?.children?.length > 0) ? "folder" : "page"}?
                </div>
                

                <div className="projectTabTitleButtonsBox">
                    <div className="settings-button" onClick={() => setConfirmPopUpOpened(false)}>
                        Cancel
                    </div>
                    <div onClick={confirmClick} className="settings-button delete-button">
                        Delete
                    </div>
                </div>
                    
                </div>
            </div>
            <div className="settings-close-button" onClick={() => setConfirmPopUpOpened(true)}>Delete</div>
        </div>
    )
}