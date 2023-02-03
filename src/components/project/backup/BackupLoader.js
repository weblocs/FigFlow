import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setIsBackupOn } from '../../../features/project'
import {
  setPages,
  setCollections,
  setStyles,
  setSymbols,
  setSwatches,
  setPageFolders,
  setPagesNestedStructure,
  setBlocks,
  setLayouts,
  setStyleGuide,
} from '../../../features/project'
import { firebaseConfig } from '../../../utils/firebase-config'

export default function BackupLoader() {
  const projectName = useSelector(
    (state) => state.project.projectSettingsData.name
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
