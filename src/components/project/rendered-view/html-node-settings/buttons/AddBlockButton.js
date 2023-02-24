import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  pasteLayoutHtmlNodes,
  copyLayoutHtmlNodes,
} from '../../../../../features/project'
import ModalBackgroundCloser from '../../../_atoms/ModalBackgroundCloser'
import addImage from '../../../../../img/add-button.svg'
import useKeyboardShortcut from 'use-keyboard-shortcut'

export default function AddBlockButton() {
  const isNodeTypeSection = useSelector(
    (state) => state.project.activeNodeObject?.type === 'sec'
  )
  const isNodeTypeBody = useSelector(
    (state) => state.project.activeNodeObject?.type === 'body'
  )
  const blocks = useSelector((state) => state.project.blocks)
  const dispatch = useDispatch()

  const [listIsOpened, setListIsOpened] = useState(false)

  function handleAddBlockClick(sectionNodes) {
    dispatch(copyLayoutHtmlNodes(sectionNodes))
    dispatch(pasteLayoutHtmlNodes())
    setListIsOpened(false)
  }

  const { openListShortcut } = useKeyboardShortcut(
    ['E'],
    (shortcutKeys) => {
      setListIsOpened(!listIsOpened)
    },
    { overrideSystem: false, ignoreInputFields: true, repeatOnHold: false }
  )

  if (!isNodeTypeSection && !isNodeTypeBody) {
    return (
      <div>
        <ModalBackgroundCloser
          handleClick={() => setListIsOpened(false)}
          isActiveIf={listIsOpened}
        />

        <div
          className={'rich-element-settings_button button-centered active'}
          onClick={() => setListIsOpened(true)}
        >
          <img style={{ width: '12px' }} src={addImage} />
        </div>

        <div
          className={
            'heading-element-settings_list block-list' +
            (listIsOpened ? ' active' : '')
          }
        >
          {blocks?.map((folder) => (
            <div className="block-list_folder" key={folder.id}>
              <div className="blocks-list_name">{folder.name}</div>
              <div className="block-list_grid">
                {folder.blocks?.map((item) => (
                  <div
                    className="blocks-list_item"
                    key={item.id}
                    onClick={() =>
                      handleAddBlockClick(item.preRenderedHTMLNodes)
                    }
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
}
