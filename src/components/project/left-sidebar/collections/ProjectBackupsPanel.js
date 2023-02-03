import axios from 'axios'
import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseConfig } from '../../../../utils/firebase-config'
import AddButton from '../_atoms/AddButton'
import { v4 as uuidv4 } from 'uuid'
import BackupListItem from './BackupListItem'

export default function ProjectBackupsPanel() {
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const dispatch = useDispatch()
  const isActiveTab = useSelector(
    (state) => state.project.activeTab === 'Backups'
  )
  const state = useSelector((state) => state.project)

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const [backupsData, setBackupsData] = useState([])
  const [backupDataId, setBackupDataId] = useState('')

  async function makeBackup() {
    const backupId = uuidv4()
    await setDoc(doc(db, 'backups', backupId), {
      project: projectFirebaseId,
      id: backupId,
      dateFull: new Date(),
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      name: new Date().toLocaleTimeString(),
      data: {
        pages: state.projectPages,
        projectPageFolders: state.projectPageFolders,
        projectPageFolderStructure: state.projectPageFolderStructure,
        collections: state.collections,
        preRenderedStyles: state.preRenderedStyles,
        symbols: state.projectSymbols,
        swatches: state.projectSwatches,
        sections: state.projectLayouts,
        blocks: state.blocks,
        styleGuide: state.styleGuide,
      },
    })

    getBackups()
  }

  async function getBackups() {
    let backups = await getDocs(
      query(
        collection(db, 'backups'),
        where('project', '==', projectFirebaseId)
      )
    )
    let backupSnapshot = []
    backups.forEach((doc) => {
      backupSnapshot.push(doc.data())
    })

    setBackupsData(backupSnapshot.sort((a, b) => b.dateFull - a.dateFull))

    // console.log(backupsData)

    // backups.forEach((doc) => {
    //   setBackupDataId(doc.id)
    //   setBackupsData(doc.data().backups)
    // })
  }

  useEffect(() => {
    if (isActiveTab) {
      getBackups()
    }
  }, [isActiveTab])

  if (isActiveTab) {
    return (
      <div className="collectionsPanel active">
        <div className="projectTabTitleBox">
          Backups
          <div className="projectTabTitleButtonsBox">
            <AddButton fx={makeBackup} />
          </div>
        </div>

        <div className="pagesList">
          {backupsData
            // .sort((a, b) => a.date - b.date)
            .map((backup) => (
              <BackupListItem key={backup.id} backup={backup} />
            ))}
        </div>
      </div>
    )
  }
}
