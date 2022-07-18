import useEventListener from '@use-it/event-listener'
import { useDispatch } from 'react-redux';
import useKeyboardShortcut from 'use-keyboard-shortcut'

import {arrowActiveNodeNavigation, setCopiedNodes, pasteCopiedNodes, deleteActiveNode, movePreRenderedNode, undoProject, reUndoProject} from "../features/pre-rendered-html-nodes"

let keys = [];

const RIGHT_ARROW = ['39', 'ArrowRight'];
const LEFT_ARROW = ['37', 'ArrowLeft'];
const UP_ARROW = ['38', 'ArrowUp'];
const DOWN_ARROW = ['40', 'ArrowDown'];

export default function loadShortcuts() {
    
    const dispatch = useDispatch();

    const { undoProjectShortcut } = useKeyboardShortcut(
      ["Meta", "Z"],
      shortcutKeys => {
        if(!window.event.shiftKey) {
          dispatch(undoProject())
        }
      }, { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    const { reUndoProjectShortcut } = useKeyboardShortcut(
      ["Meta", "Shift", "Z"],
      shortcutKeys => {
        
          dispatch(reUndoProject())
          
      }, { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    const { moveNode } = useKeyboardShortcut(
      ["]"],
      shortcutKeys => {
        dispatch(movePreRenderedNode({moveReverse:false}))
      },
      { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    const { moveNodeReverse } = useKeyboardShortcut(
      ["["],
      shortcutKeys => {
        dispatch(movePreRenderedNode({moveReverse:true}))
      },
      { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );


    const { copyShortcut } = useKeyboardShortcut(
      ["Meta", "C"],
      shortcutKeys => {
        dispatch(setCopiedNodes())
      },
      { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    const { copyandDeleteShortcut } = useKeyboardShortcut(
      ["Meta", "X"],
      shortcutKeys => {
        dispatch(setCopiedNodes())
        dispatch(deleteActiveNode())
      },
      { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    const { pasteShortcut } = useKeyboardShortcut(
      ["Meta", "V"],
      shortcutKeys => {
        dispatch(pasteCopiedNodes())
      },
      { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    const { deleteShortcut } = useKeyboardShortcut(
      ["Backspace"],
      shortcutKeys => {
        dispatch(deleteActiveNode())
        console.log("Delete")
      },
      { 
        overrideSystem: false,
        ignoreInputFields: false, 
        repeatOnHold: false 
      }
    );

    

function handleKeyDown({ key }) {

    if( keys[keys.length-1] !== key) {
        keys.push(key);
    }

    if (RIGHT_ARROW.includes(String(key))) {
      dispatch(arrowActiveNodeNavigation({key: "right"}))
    }
    if (LEFT_ARROW.includes(String(key))) {
      dispatch(arrowActiveNodeNavigation({key: "left"}))
    }
    if (UP_ARROW.includes(String(key))) {
        dispatch(arrowActiveNodeNavigation({key: "up"}))
      }
      if (DOWN_ARROW.includes(String(key))) {
        dispatch(arrowActiveNodeNavigation({key: "down"}))
      }
  }

  function handleKeyUp({ key }) {
    keys = [];
  }

  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);

}