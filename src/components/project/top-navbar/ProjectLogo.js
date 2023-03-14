import { useDispatch, useSelector } from 'react-redux'
import LogoIcon from '../../../img/aplo.svg'
import ModeChanger from './ModeChanger'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setIsSettingsModalOpen } from '../../../features/project'

export default function ProjectLogo() {
  const projectMode = useSelector((state) => state.project.projectMode)
  const dispatch = useDispatch()

  const [listIsOpened, setListIsOpened] = useState(false)

  useEffect(() => {
    setListIsOpened(false)
  }, [projectMode])

  function handleSettingsClick() {
    dispatch(setIsSettingsModalOpen(true))
    setListIsOpened(false)
  }

  return (
    <div className="">
      <div
        className="project-logo_wrapper px-12"
        onClick={() => setListIsOpened(true)}
      >
        <img src={LogoIcon} style={{ width: '30px' }} />
      </div>
      <div
        className={'unit-chooser_closer' + (listIsOpened ? ' active' : '')}
        onClick={() => setListIsOpened(false)}
      ></div>
      <div className={'logo-settings-panel' + (listIsOpened ? ' active' : '')}>
        <Link to="/">
          <div className="logo-settings-panel-link">Dashboard</div>
        </Link>
        <ModeChanger />
        <div onClick={handleSettingsClick} className="logo-settings-panel-link">
          Settings
        </div>
      </div>
    </div>
  )
}
