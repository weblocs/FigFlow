import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setKeyboardNavigationOn, updateProjectPageProperty } from "../features/pre-rendered-html-nodes"

export default function AddPagePanel() {
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const openedSettingsPage = useSelector((state) => state.designerProjectState.openedSettingsPage)
    const dispatch = useDispatch()
    const inputRef = useRef();

    function handleSubmit() {
        event.preventDefault();
        dispatch(updateProjectPageProperty({property: "name", value: inputRef.current.value}));
    }
    
    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    useEffect(() => {
        inputRef.current.value = openedSettingsPage.name;
    },[openedSettingsPage]);

    return (
        <form onSubmit={handleSubmit}>
        <div className={"projectPagesPanel wider "
        + ((activeProjectTab === "Pages" && (openedSettingsPage?.id)) ? "active" : "" )
        }>
            <div className="projectTabTitleBox">
                Add page
                <div className="projectTabTitleButtonsBox">
                <div>Close</div>
                <button>Save</button>
                </div>
            </div>
            <label>Page Name</label>
            
                <input ref={inputRef}
                onFocus={handleFocus} 
                onBlur={handleBlur}  />
                
        </div>
        </form>
    )
}