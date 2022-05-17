import useEventListener from '@use-it/event-listener'
import { useDispatch } from 'react-redux';

import {arrowActiveNodeNavigation} from "../features/pre-rendered-html-nodes"

let keys = [];

const RIGHT_ARROW = ['39', 'ArrowRight'];
const LEFT_ARROW = ['37', 'ArrowLeft'];
const UP_ARROW = ['38', 'ArrowUp'];
const DOWN_ARROW = ['40', 'ArrowDown'];

export default function loadShortcuts() {

    const dispatch = useDispatch()

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

      if(keys.includes('Meta') && keys.includes('c')) {
      
      }

      if(keys.includes('Meta') && keys.includes('s')) {
        
    }
  }

  function handleKeyUp({ key }) {
    keys = [];
  }

  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);

}