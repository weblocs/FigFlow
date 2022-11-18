import useEventListener from '@use-it/event-listener'
import { useDispatch } from 'react-redux'
import useKeyboardShortcut from 'use-keyboard-shortcut'

import {
  handleArrowNodesNavigation,
  copyHtmlNodes,
  pasteHtmlNodes,
  deleteActiveHtmlNode,
  moveHtmlNode,
  undoProject,
  reUndoProject,
  deleteActiveHtmlNodeShortcut,
  setIsAltPressed,
} from '../features/project'

let keys = []

const RIGHT_ARROW = ['39', 'ArrowRight']
const LEFT_ARROW = ['37', 'ArrowLeft']
const UP_ARROW = ['38', 'ArrowUp']
const DOWN_ARROW = ['40', 'ArrowDown']

export default function loadShortcuts() {
  const dispatch = useDispatch()

  window.addEventListener(
    'keydown',
    (e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault()
      }
      if (['AltLeft'].includes(e.code)) {
        dispatch(setIsAltPressed(true))
      }
    },
    false
  )

  window.addEventListener(
    'keyup',
    (e) => {
      if (['AltLeft'].includes(e.code)) {
        dispatch(setIsAltPressed(false))
      }
    },
    false
  )

  const { undoProjectShortcut } = useKeyboardShortcut(
    ['Meta', 'Z'],
    (shortcutKeys) => {
      if (!window.event.shiftKey) {
        dispatch(undoProject())
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { reUndoProjectShortcut } = useKeyboardShortcut(
    ['Meta', 'Shift', 'Z'],
    (shortcutKeys) => {
      dispatch(reUndoProject())
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { moveNode } = useKeyboardShortcut(
    [']'],
    (shortcutKeys) => {
      dispatch(moveHtmlNode({ moveReverse: false }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { moveNodeReverse } = useKeyboardShortcut(
    ['['],
    (shortcutKeys) => {
      dispatch(moveHtmlNode({ moveReverse: true }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { copyShortcut } = useKeyboardShortcut(
    ['Meta', 'C'],
    (shortcutKeys) => {
      dispatch(copyHtmlNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { copyandDeleteShortcut } = useKeyboardShortcut(
    ['Meta', 'X'],
    (shortcutKeys) => {
      dispatch(copyHtmlNodes())
      dispatch(deleteActiveHtmlNode())
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { pasteShortcut } = useKeyboardShortcut(
    ['Meta', 'V'],
    (shortcutKeys) => {
      dispatch(pasteHtmlNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { deleteShortcut } = useKeyboardShortcut(
    ['Backspace'],
    (shortcutKeys) => {
      dispatch(deleteActiveHtmlNodeShortcut())
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  function handleKeyDown({ key }) {
    if (keys[keys.length - 1] !== key) {
      keys.push(key)
    }

    if (RIGHT_ARROW.includes(String(key))) {
      dispatch(handleArrowNodesNavigation({ key: 'right' }))
    }
    if (LEFT_ARROW.includes(String(key))) {
      dispatch(handleArrowNodesNavigation({ key: 'left' }))
    }
    if (UP_ARROW.includes(String(key))) {
      dispatch(handleArrowNodesNavigation({ key: 'up' }))
    }
    if (DOWN_ARROW.includes(String(key))) {
      dispatch(handleArrowNodesNavigation({ key: 'down' }))
    }
  }

  function handleKeyUp({ key }) {
    keys = []
  }

  useEventListener('keydown', handleKeyDown)
  useEventListener('keyup', handleKeyUp)
}
