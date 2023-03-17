import { initializeApp } from 'firebase/app'
import { createClient } from '@supabase/supabase-js'

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseConfig } from '../../../../utils/firebase-config'
import AddButton from '../_atoms/AddButton'
import { v4 as uuidv4 } from 'uuid'
import BackupListItem from './BackupListItem'
import SidePanel from '../../../ui/SidePanel'

export default function ProjectBackupsPanel() {
  const supabase = createClient(
    'https://tvibleithndshiwcxpyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWJsZWl0aG5kc2hpd2N4cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MDcxMjAsImV4cCI6MTk5NDM4MzEyMH0.UGM0_FrjGdB8twoyXQk2aKKJg3mP924BDzCKcFNTDvU'
  )

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

  async function makeBackup() {
    const backupId = uuidv4()

    try {
      const { data, error } = await supabase.from('backups').insert({
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
          fonts: state.fonts,
          scripts: state.scripts,
          libraries: state.libraries,
        },
      })
    } catch (error) {
      console.log(error)
    }

    // await setDoc(doc(db, 'backups', backupId), {
    //   project: projectFirebaseId,
    //   id: backupId,
    //   dateFull: new Date(),
    //   date: new Date().toDateString(),
    //   time: new Date().toLocaleTimeString(),
    //   name: new Date().toLocaleTimeString(),
    //   data: {
    //     pages: state.projectPages,
    //     projectPageFolders: state.projectPageFolders,
    //     projectPageFolderStructure: state.projectPageFolderStructure,
    //     collections: state.collections,
    //     preRenderedStyles: state.preRenderedStyles,
    //     symbols: state.projectSymbols,
    //     swatches: state.projectSwatches,
    //     sections: state.projectLayouts,
    //     blocks: state.blocks,
    //     styleGuide: state.styleGuide,
    //   },
    // })

    getBackups()
  }

  async function getBackups() {
    // const { backups, error } = await supabase.from('backups').select()
    const { data, error } = await supabase.from('backups').select()
    setBackupsData(data.sort((a, b) => b.dateFull - a.dateFull))

    // let backups = await getDocs(
    //   query(
    //     collection(db, 'backups'),
    //     where('project', '==', projectFirebaseId)
    //   )
    // )
    // let backupSnapshot = []
    // backups.forEach((doc) => {
    //   backupSnapshot.push(doc.data())
    // })
    // setBackupsData(backupSnapshot.sort((a, b) => b.dateFull - a.dateFull))
  }

  useEffect(() => {
    if (isActiveTab) {
      getBackups()
    }
  }, [isActiveTab])

  return (
    <SidePanel isActive={isActiveTab}>
      <div className="side-panel-title">
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
    </SidePanel>
  )
}
