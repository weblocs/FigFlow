import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pasteLayoutHtmlNodes, copyLayoutHtmlNodes, setProjectPopUp } from "../../../../../features/project";
import ModalBackgroundCloser from "../../../_atoms/ModalBackgroundCloser";
import addImage from "../../../../../img/add-button.svg";
import useKeyboardShortcut from "use-keyboard-shortcut";

export default function AddBlockButton({addRichSetting}) {
    const blocks = useSelector((state) => state.project.blocks)
    const blockFolders = useSelector((state) => state.project.activeNodeObject?.blockFolders)
    const keyboardNavigationOn = useSelector((state) => state.project.keyboardNavigationOn)
    const activeBlockFolders = useSelector((state) => state.project.activeNodeObject?.blockFolders?.filter(folder => blockFoldersInclude(folder.id)))
    const dispatch = useDispatch()

    const [listIsOpened, setListIsOpened] = useState(false);

    function handleAddBlockClick(sectionNodes) {
        dispatch(copyLayoutHtmlNodes(sectionNodes));
        dispatch(pasteLayoutHtmlNodes());
        setListIsOpened(false)
    }

    function blockFoldersInclude(id) {
        if(blockFolders !== undefined) {
            for(let i = 0; i < blockFolders.length; i++) {
                if(blockFolders[i]?.id === id && blockFolders[i]?.state) {
                    return true
                }
            }
        }
        return false
    }

    const { openListShortcut } = useKeyboardShortcut(["E"],
        shortcutKeys => { 
            if(keyboardNavigationOn) {
                setListIsOpened(!listIsOpened) 
            }
        },
        { overrideSystem: false, ignoreInputFields: false, repeatOnHold: false }
    );

    return (
        <div>
            <ModalBackgroundCloser 
            handleClick={() => setListIsOpened(false)} 
            isActiveIf={listIsOpened} />

            <div className={"rich-element-settings_button button-centered active"}
            onClick={() => setListIsOpened(true)}>
                <img style={{width: "12px"}} src={addImage} />
            </div>

            <div className={"heading-element-settings_list block-list" + ((listIsOpened) ? " active" : "")}>
                {blocks?.map((folder) => (
                    <div className="block-list_folder" key={folder.id}>
                    <div className="blocks-list_name">{folder.name}</div>
                        <div className="block-list_grid">
                        {folder.blocks?.map((item) => (
                        <div className="blocks-list_item" key={item.id}
                        onClick={() => handleAddBlockClick(item.preRenderedHTMLNodes)}
                        >
                            {item.name}
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}