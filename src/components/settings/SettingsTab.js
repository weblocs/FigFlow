import { useDispatch, useSelector } from 'react-redux'
import { setActiveSettingsTab } from '../../features/project'
import Tab from '../ui/Tab'

export default function SettingsTab({ tab }) {
  const activeSettingsTab = useSelector(
    (state) => state.project.activeSettingsTab
  )
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(setActiveSettingsTab(tab))
  }
  return (
    <Tab
      isActive={tab === activeSettingsTab}
      onClick={handleClick}
      text={tab}
    />
  )
}
