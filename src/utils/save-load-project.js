import axios from 'axios'
import Constants from './const.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
} from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { firebaseConfig } from './firebase-config.js'
import { v4 as uuidv4 } from 'uuid'
import {
  setCollections,
  setBlocks,
  setSymbols,
  setStyles,
  setPages,
  setProjectFirebaseId,
  setSwatches,
  setLayouts,
  setPageFolders,
  setPagesNestedStructure,
  setProjectNameAndSlug,
  setFavicon,
  setStyleGuide,
  setScripts,
  setLibraries,
  setImages,
  loadProject,
  setFonts,
} from '../features/project'

export default function saveProject(items, preRenderedStyles) {
  axios
    .put(
      Constants.BASE_API + 'update',
      { items: [...items], preRenderedStyles: [...preRenderedStyles] },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      return 'Saved'
    })
}

export function loadProjectPreRenderedNodesAndStyles(projectId) {
  const project_id = 'test'
  const dispatch = useDispatch()
  useEffect(() => {
    axios
      .get(Constants.BASE_API + 'items?project_id=' + projectId)
      .then((res) => {
        // sending data from MongoDB
        // dispatch(setHtmlNodes([...res.data[0].items]));
        // dispatch(setStyles([...res.data[0].preRenderedStyles]));
      })
  }, [])
}

export async function loadProjectFromBackup(backupId) {
  const dispatch = useDispatch()
  // const app = initializeApp(firebaseConfig)
  // const db = getFirestore(app)
  // let backupData = await getDoc(doc(db, 'backups', backupId))
  // backupData = backupData.data().data

  const supabase = createClient(
    'https://tvibleithndshiwcxpyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWJsZWl0aG5kc2hpd2N4cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MDcxMjAsImV4cCI6MTk5NDM4MzEyMH0.UGM0_FrjGdB8twoyXQk2aKKJg3mP924BDzCKcFNTDvU'
  )
  const { data, error } = await supabase
    .from('backups')
    .select()
    .eq('id', backupId)
  let backupData = data[0].data

  dispatch(setPages(backupData.pages))
  dispatch(setCollections(backupData.collections))
  dispatch(setStyles(backupData.preRenderedStyles))
  dispatch(setSymbols(backupData.symbols))
  dispatch(setBlocks(backupData.blocks))
  dispatch(setSwatches(backupData.swatches))
  dispatch(setFonts(backupData.fonts))
  dispatch(setLayouts(backupData.sections))
  dispatch(setPageFolders(backupData.projectPageFolders))
  dispatch(setPagesNestedStructure(backupData.projectPageFolderStructure))
  // dispatch(setProjectNameAndSlug(backupData.projectNameAndSlug))
  // dispatch(setFavicon(backupData.favicon))
  dispatch(setStyleGuide(backupData.styleGuide))
}

export async function loadProjectFromFirebasePreRenderedNodesAndStyles(
  projectSlug
) {
  const supabase = createClient(
    'https://tvibleithndshiwcxpyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWJsZWl0aG5kc2hpd2N4cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MDcxMjAsImV4cCI6MTk5NDM4MzEyMH0.UGM0_FrjGdB8twoyXQk2aKKJg3mP924BDzCKcFNTDvU'
  )

  const dispatch = useDispatch()
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const offlineMode = useSelector((state) => state.project.offlineMode)
  const offlineProjectName = useSelector(
    (state) => state.project.offlineProjectName
  )

  let params = useParams()

  if (!offlineMode) {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('projectId', params.projectSlug)

    dispatch(setProjectFirebaseId(data[0].id))
    dispatch(loadProject(data[0]))

    // console.log(data[0])
    // dispatch(setProjectFirebaseId(data.id))

    // const userProjects = await getDocs(
    //   query(
    //     collection(db, 'projects'),
    //     where('projectId', '==', params.projectSlug)
    //   )
    // )

    // userProjects.forEach((doc) => {
    //   dispatch(setProjectFirebaseId(doc.id))
    // })

    // if (projectFirebaseId !== '') {
    //   const projectData = await getDoc(doc(db, 'projects', projectFirebaseId))
    //   const { data, error } = await supabase
    //     .from('projects')
    //     .select()
    //     .eq('id', projectFirebaseId)
    //   // console.log(data)

    //   // console.log('firebase')
    //   // console.log(loadProject(projectData.data()))
    //   dispatch(loadProject(data[0]))
    // }
  }

  // else {
  //   let projectPagesStorage = localStorage.getItem(offlineProjectName + 'pages')
  //   if (JSON.stringify(projectPagesStorage) !== 'null') {
  //     dispatch(setPages(JSON.parse(projectPagesStorage)))
  //     dispatch(
  //       setPagesNestedStructure(
  //         JSON.parse(
  //           localStorage.getItem(
  //             offlineProjectName + 'projectPageFolderStructure'
  //           )
  //         )
  //       )
  //     )
  //   }

  // else {
  //   let firstPageInProjectId = uuidv4()
  //   dispatch(
  //     setPages([
  //       { name: 'Home', id: firstPageInProjectId, preRenderedHTMLNodes: [] },
  //     ])
  //   )
  //   dispatch(
  //     setPagesNestedStructure([{ name: 'Home', id: firstPageInProjectId }])
  //   )
  // }

  // if (
  //   JSON.stringify(
  //     localStorage.getItem(offlineProjectName + 'collections')
  //   ) !== 'null'
  // ) {
  //   function getParsedItem(item) {
  //     if (localStorage.getItem(offlineProjectName + item) !== null) {
  //       return JSON.parse(
  //         localStorage.getItem(offlineProjectName + item) || []
  //       )
  //     }
  //   }

  //   dispatch(setCollections(getParsedItem('collections')))
  //   dispatch(setStyles(getParsedItem('preRenderedStyles')))
  //   dispatch(setSymbols(getParsedItem('symbols')))
  //   dispatch(setSwatches(getParsedItem('swatches')))
  //   dispatch(setPageFolders(getParsedItem('projectPageFolders')))
  //   dispatch(setBlocks(getParsedItem('blocks')))
  //   // dispatch(setImages(getParsedItem('images')))
  //   dispatch(setLayouts(getParsedItem('sections')))
  //   dispatch(setStyleGuide(getParsedItem('styleGuide')))
  //   // dispatch(setFavicon(getParsedItem('favicon')))
  // }
  // }
}
