import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setIsBackupOn } from '../../../features/project'

export default function BackupLoader() {
  const projectName = useSelector(
    (state) => state.project.projectNameAndSlug.name
  )
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    dispatch(setIsBackupOn(searchParams.get('backup')))
    if (projectName !== undefined) {
      if (searchParams.get('backup') !== null) {
        document.title = 'Backup | ' + projectName
      } else {
        document.title = projectName
      }
    }
  }, [projectName, searchParams])

  return <div></div>
}
