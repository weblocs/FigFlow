import { useDispatch } from 'react-redux'

export function handleFocus() {
  const dispatch = useDispatch()
  dispatch(setKeyboardNavigationOn(false))
}

export function handleBlur() {
  const dispatch = useDispatch()
  dispatch(setKeyboardNavigationOn(true))
}
