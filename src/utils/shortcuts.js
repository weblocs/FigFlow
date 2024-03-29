import useEventListener from '@use-it/event-listener'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import { createKeybindingsHandler } from 'tinykeys'

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
  setIsShiftPressed,
  setIsKeyAPressed,
  addSpanToText,
  wrapActiveHtmlNode,
  unwrapActiveHtmlNode,
  pasteTextToActiveHtmlNode,
  togglePasteTextMode,
  editHtmlNode,
} from '../features/project'

let keys = []

const RIGHT_ARROW = ['39', 'ArrowRight']
const LEFT_ARROW = ['37', 'ArrowLeft']
const UP_ARROW = ['38', 'ArrowUp']
const DOWN_ARROW = ['40', 'ArrowDown']

export default function loadShortcuts() {
  const dispatch = useDispatch()

  let handler = createKeybindingsHandler({
    '$mod+KeyS': (event) => {
      event.preventDefault()
    },
    '$mod+KeyP': (event) => {
      event.preventDefault()
    },
    '$mod+KeyO': (event) => {
      event.preventDefault()
    },
    '$mod+KeyL': (event) => {
      event.preventDefault()
    },
    '$mod+KeyF': (event) => {
      event.preventDefault()
    },
    '$mod+KeyD': (event) => {
      event.preventDefault()
    },
    '$mod+KeyE': (event) => {
      event.preventDefault()
    },
    '$mod+Shift+KeyD': (event) => {
      event.preventDefault()
    },
    // '$mod+KeyA': (event) => {
    //   event.preventDefault()
    // },
    '$mod+Shift+KeyA': (event) => {
      event.preventDefault()
    },
    '$mod+KeyG': (event) => {
      event.preventDefault()
    },
    '$mod+Shift+KeyG': (event) => {
      event.preventDefault()
    },
  })

  window.addEventListener('keydown', handler)

  window.addEventListener(
    'keydown',
    (e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault()
      }
      if (['AltLeft'].includes(e.code)) {
        dispatch(setIsAltPressed(true))
      }
      if (['ShiftLeft'].includes(e.code)) {
        dispatch(setIsShiftPressed(true))
      }
      if (['KeyA'].includes(e.code)) {
        dispatch(setIsKeyAPressed(true))
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
      if (['ShiftLeft'].includes(e.code)) {
        dispatch(setIsShiftPressed(false))
      }
      if (['KeyA'].includes(e.code)) {
        dispatch(setIsKeyAPressed(false))
      }
    },
    false
  )

  // const { typeP } = useKeyboardShortcut(
  //   ['P'],
  //   (shortcutKeys) => {
  //     dispatch(addSpanToText({ selectedText: 'got' }))
  //   },
  //   {
  //     overrideSystem: false,
  //     ignoreInputFields: true,
  //     repeatOnHold: false,
  //   }
  // )

  const { convertToDivShortcut } = useKeyboardShortcut(
    ['Meta', 'L'],
    (shortcutKeys) => {
      dispatch(editHtmlNode({ field: 'type', value: 'l' }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )
  const { convertToLinkShortcut } = useKeyboardShortcut(
    ['Meta', 'K'],
    (shortcutKeys) => {
      dispatch(editHtmlNode({ field: 'type', value: 'div' }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
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
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { undoProjectShortcutWindows } = useKeyboardShortcut(
    ['Control', 'Z'],
    (shortcutKeys) => {
      if (!window.event.shiftKey) {
        dispatch(undoProject())
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
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
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { reUndoProjectShortcutWindows } = useKeyboardShortcut(
    ['Control', 'Shift', 'Z'],
    (shortcutKeys) => {
      dispatch(reUndoProject())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
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
      ignoreInputFields: true,
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
      ignoreInputFields: true,
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
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { copyShortcutWindows } = useKeyboardShortcut(
    ['Control', 'C'],
    (shortcutKeys) => {
      dispatch(copyHtmlNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
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
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { copyandDeleteShortcutWindows } = useKeyboardShortcut(
    ['Control', 'X'],
    (shortcutKeys) => {
      dispatch(copyHtmlNodes())
      dispatch(deleteActiveHtmlNode())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  document.addEventListener('paste', (e) => {
    e.clipboardData.items[0].getAsString((s) => {
      dispatch(pasteTextToActiveHtmlNode(s))
    })
  })

  const { pasteShortcut } = useKeyboardShortcut(
    ['Meta', 'V'],
    (shortcutKeys) => {
      dispatch(pasteHtmlNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { pasteShortcutWindows } = useKeyboardShortcut(
    ['Control', 'V'],
    (shortcutKeys) => {
      dispatch(pasteHtmlNodes())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { textModeOnShortcut } = useKeyboardShortcut(
    ['T'],
    (shortcutKeys) => {
      if (
        !window.event.shiftKey &&
        !window.event.metaKey &&
        !window.event.ctrlKey
      ) {
        dispatch(togglePasteTextMode(true))
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { wrapShortcut } = useKeyboardShortcut(
    ['Meta', 'D'],
    (shortcutKeys) => {
      if (!window.event.shiftKey) {
        dispatch(wrapActiveHtmlNode())
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { unwrapShortcut } = useKeyboardShortcut(
    ['Meta', 'S'],
    (shortcutKeys) => {
      dispatch(unwrapActiveHtmlNode())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { wrapShortcutG } = useKeyboardShortcut(
    ['Meta', 'G'],
    (shortcutKeys) => {
      if (!window.event.shiftKey) {
        dispatch(wrapActiveHtmlNode())
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { unwrapShortcutG } = useKeyboardShortcut(
    ['Meta', 'Shift', 'G'],
    (shortcutKeys) => {
      dispatch(unwrapActiveHtmlNode())
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
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
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { rightShortcut } = useKeyboardShortcut(
    ['ArrowRight'],
    (shortcutKeys) => {
      dispatch(handleArrowNodesNavigation({ key: 'right' }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { leftShortcut } = useKeyboardShortcut(
    ['ArrowLeft'],
    (shortcutKeys) => {
      dispatch(handleArrowNodesNavigation({ key: 'left' }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { upShortcut } = useKeyboardShortcut(
    ['ArrowUp'],
    (shortcutKeys) => {
      dispatch(handleArrowNodesNavigation({ key: 'up' }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  const { downShortcut } = useKeyboardShortcut(
    ['ArrowDown'],
    (shortcutKeys) => {
      dispatch(handleArrowNodesNavigation({ key: 'down' }))
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  function handleKeyDown({ key }) {
    if (keys[keys.length - 1] !== key) {
      keys.push(key)
    }

    // if (RIGHT_ARROW.includes(String(key))) {
    //   dispatch(handleArrowNodesNavigation({ key: 'right' }))
    // }
    // if (LEFT_ARROW.includes(String(key))) {
    //   dispatch(handleArrowNodesNavigation({ key: 'left' }))
    // }
    // if (UP_ARROW.includes(String(key))) {
    //   dispatch(handleArrowNodesNavigation({ key: 'up' }))
    // }
    // if (DOWN_ARROW.includes(String(key))) {
    //   dispatch(handleArrowNodesNavigation({ key: 'down' }))
    // }
  }

  function handleKeyUp({ key }) {
    keys = []
  }

  useEventListener('keydown', handleKeyDown)
  useEventListener('keyup', handleKeyUp)
}
