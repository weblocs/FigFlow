import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  pasteLayoutHtmlNodes,
  copyLayoutHtmlNodes,
} from '../../../../../features/project'
import ModalBackgroundCloser from '../../../_atoms/ModalBackgroundCloser'
import addImage from '../../../../../img/add-button.svg'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import Input from '../../../../ui/Input'
import BlocksList from './BlocksList'

export default function AddBlockButton() {
  const isNodeTypeSection = useSelector(
    (state) => state.project.activeNodeObject?.type === 'sec'
  )
  const isNodeTypeBody = useSelector(
    (state) => state.project.activeNodeObject?.type === 'body'
  )
  const keyboardNavigationOn = useSelector(
    (state) => state.project.keyboardNavigationOn
  )
  const dispatch = useDispatch()

  const [listIsOpened, setListIsOpened] = useState(false)

  const { closeListShortcut } = useKeyboardShortcut(
    ['Escape'],
    (shortcutKeys) => {
      if (!keyboardNavigationOn) return
      setListIsOpened(false)
    },
    { overrideSystem: false, ignoreInputFields: false, repeatOnHold: false }
  )

  const { openListShortcut } = useKeyboardShortcut(
    ['Meta', 'E'],
    (shortcutKeys) => {
      if (!keyboardNavigationOn) return
      setListIsOpened(true)
    },
    { overrideSystem: false, ignoreInputFields: true, repeatOnHold: false }
  )

  const { openListShortcutWindows } = useKeyboardShortcut(
    ['Control', 'E'],
    (shortcutKeys) => {
      if (!keyboardNavigationOn) return
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

        <BlocksList
          listIsOpened={listIsOpened}
          setListIsOpened={setListIsOpened}
        />
      </div>
    )
  }
}
