import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setKeyboardNavigationOn, updateProjectPageProperty, setOpenedSettingsPage, clearOpenedSettingPage, deleteProjectPage } from "../features/pre-rendered-html-nodes"
import ConfirmPopUpButton from "./DeletePopUpButton"

export default function PageSettingsPanel() {
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const openedSettingsPage = useSelector((state) => state.designerProjectState.openedSettingsPage)
    const dispatch = useDispatch()
    const inputRef = useRef();
    const inputSlugRef = useRef();
    const inputMetaNameRef = useRef();

    function handleSubmit() {
        event.preventDefault();
        dispatch(updateProjectPageProperty({property: "name", value: inputRef.current.value}));
        dispatch(updateProjectPageProperty({property: "slug", value: inputSlugRef.current.value}));
        dispatch(clearOpenedSettingPage());
    }
    
    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    useEffect(() => {
        inputRef.current.value = openedSettingsPage.name;
        
        inputSlugRef.current.value = openedSettingsPage.slug;

        if(openedSettingsPage.slug === undefined) {
            inputSlugRef.current.value = "";
        }
    },[openedSettingsPage]);

    return (
        <form onSubmit={handleSubmit}>
        <div className={"projectPagesPanel wider "
        + ((activeProjectTab === "Pages" && (openedSettingsPage?.id)) ? "active" : "" )
        }>
            <div className="projectTabTitleBox">
                Page Settings
                <div className="projectTabTitleButtonsBox">
                
                <ConfirmPopUpButton handleOnClick={() => dispatch(deleteProjectPage())} />

                <div className="settings-button white-button" onClick={() => dispatch(setOpenedSettingsPage({}))}>Close</div>
                <button className="settings-button">Save</button>
                </div>
            </div>
            <div className="page-settings-wrapper">
                
                <label className="settings-label">Page Name</label>
                <input 
                className="settings-input"
                ref={inputRef}
                onFocus={handleFocus} 
                onBlur={handleBlur}  />

                <label className="settings-label">Page Slug</label>
                <input
                className="settings-input"
                style={{marginBottom: "0"}}
                ref={inputSlugRef}
                onFocus={handleFocus} 
                onBlur={handleBlur}  />
                <span style={{fontSize: "10px", lineHeight: "10px", marginTop: "4px", marginBottom: "12px", padding: "4px 8px", border: "1px solid #cecece"}}>
                    figflow.com/{openedSettingsPage.slug}
                </span>

                {!(openedSettingsPage?.children?.length > 0) && 
                <>
                    <label className="settings-label">Title Tag</label>
                    <input 
                    className="settings-input"
                    ref={inputMetaNameRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}  />

                    <label className="settings-label">Meta Description</label>
                    <input 
                    className="settings-input"
                    ref={inputMetaNameRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}  />

                    <label className="settings-label">Custom Code Head</label>
                    <input 
                    className="settings-input"
                    ref={inputMetaNameRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}  />

                    <label className="settings-label">Custom Code Body</label>
                    <input 
                    className="settings-input"
                    ref={inputMetaNameRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}  />
                </>}

            </div>
                
                
        </div>
        </form>
    )
}