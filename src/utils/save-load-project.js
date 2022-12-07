import axios from 'axios'
import Constants from './const.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
  setProjectSettingsData,
  setFavicon,
  setStyleGuide,
} from '../features/project'
import { setProjectImages } from '../features/project-images'

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

export async function loadProjectFromFirebasePreRenderedNodesAndStyles(
  projectSlug
) {
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

    const userProjects = await getDocs(
      query(
        collection(db, 'projects'),
        where('projectId', '==', params.projectSlug)
      )
    )

    userProjects.forEach((doc) => {
      dispatch(setProjectFirebaseId(doc.id))
    })

    if (projectFirebaseId !== '') {
      const projectData = await getDoc(doc(db, 'projects', projectFirebaseId))
      dispatch(setPages([...projectData.data().pages]))
      dispatch(setCollections([...projectData.data().collections]))
      dispatch(setStyles([...projectData.data().preRenderedStyles]))
      dispatch(setSymbols([...projectData.data()?.symbols]))
      dispatch(setSwatches([...projectData.data()?.swatches]))
      dispatch(setPageFolders([...projectData.data()?.projectPageFolders]))
      dispatch(
        setPagesNestedStructure([
          ...projectData.data()?.projectPageFolderStructure,
        ])
      )
      dispatch(setBlocks([...projectData.data()?.blocks]))
      dispatch(setProjectImages([...projectData.data()?.images]))
      dispatch(setLayouts([...projectData.data()?.sections]))
      dispatch(setStyleGuide([...projectData.data()?.styleGuide]))
      dispatch(
        setProjectSettingsData({
          name: projectData.data()?.projectName,
          slug: projectData.data()?.projectId,
        })
      )
      dispatch(setFavicon(projectData.data()?.favicon))
    }
  } else {
    let projectPagesStorage = localStorage.getItem(offlineProjectName + 'pages')
    if (JSON.stringify(projectPagesStorage) !== 'null') {
      dispatch(setPages(JSON.parse(projectPagesStorage)))
      dispatch(
        setPagesNestedStructure(
          JSON.parse(
            localStorage.getItem(
              offlineProjectName + 'projectPageFolderStructure'
            )
          )
        )
      )
    } else {
      let firstPageInProjectId = uuidv4()
      dispatch(
        setPages([
          { name: 'Home', id: firstPageInProjectId, preRenderedHTMLNodes: [] },
        ])
      )
      dispatch(
        setPagesNestedStructure([{ name: 'Home', id: firstPageInProjectId }])
      )
    }
    if (
      JSON.stringify(
        localStorage.getItem(offlineProjectName + 'collections')
      ) !== 'null'
    ) {
      function getParsedItem(item) {
        if (localStorage.getItem(offlineProjectName + item) !== null) {
          return JSON.parse(
            localStorage.getItem(offlineProjectName + item) || []
          )
        }
      }

      dispatch(setCollections(getParsedItem('collections')))
      dispatch(setStyles(getParsedItem('preRenderedStyles')))
      dispatch(setSymbols(getParsedItem('symbols')))
      dispatch(setSwatches(getParsedItem('swatches')))
      dispatch(setPageFolders(getParsedItem('projectPageFolders')))
      dispatch(setBlocks(getParsedItem('blocks')))
      // dispatch(setProjectImages(getParsedItem('images')))
      dispatch(setLayouts(getParsedItem('sections')))
      dispatch(setStyleGuide(getParsedItem('styleGuide')))
      // dispatch(setFavicon(getParsedItem('favicon')))
    }
  }
}
