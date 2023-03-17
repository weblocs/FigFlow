import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../../../utils/firebase-config.js'
import { addImage, editHtmlNode } from '../../../../features/project'
import ImageItem from './ImageItem'
import axios from 'axios'
import SidePanel from '../../../ui/SidePanel.js'

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })

export default function ProjectImagesPanel() {
  const dispatch = useDispatch()
  const isActiveTab = useSelector(
    (state) => state.project.activeTab === 'Images'
  )
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const activeNodeId = useSelector((state) => state.project.activeNodeId)
  const projectImages = useSelector((state) => state.project.images)

  const storage = getStorage()

  const supabase = createClient(
    'https://tvibleithndshiwcxpyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWJsZWl0aG5kc2hpd2N4cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MDcxMjAsImV4cCI6MTk5NDM4MzEyMH0.UGM0_FrjGdB8twoyXQk2aKKJg3mP924BDzCKcFNTDvU'
  )

  const imageUploadingFirebase = (file) => {
    const fileName = projectFirebaseId + '-' + file.name.replaceAll('.', '-')
    if (!file) {
      return
    }
    fileToDataUri(file)
      .then((dataUri) => {
        const tempStorageRef = ref(storage, fileName)
        uploadBytes(tempStorageRef, file).then((snapshot) => {})
      })
      .then(async () => {
        const { data, error } = await supabase
          .from('projects')
          .update({
            images: [
              ...projectImages,
              {
                name: fileName,
                id: uuidv4(),
              },
            ],
          })
          .eq('id', projectFirebaseId)

        // const app = initializeApp(firebaseConfig)
        // const db = getFirestore(app)
        // await updateDoc(doc(db, 'projects', projectFirebaseId), {
        //   images: [
        //     ...projectImages,
        //     {
        //       name: fileName,
        //       id: uuidv4(),
        //     },
        //   ],
        // })
      })
      .then(async () => {
        dispatch(addImage(fileName))
        dispatch(
          editHtmlNode({
            id: activeNodeId,
            field: 'src',
            value: fileName,
          })
        )
      })
  }

  function imageUploading(fileToUpload) {
    let formData = new FormData()
    formData.append('fileToUpload', fileToUpload)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    }

    fetch(
      'http://phpstack-913418-3170396.cloudwaysapps.com/uploads/index.php',
      requestOptions
    ).then((res) => {
      console.log(res)
    })
  }

  return (
    <SidePanel isActive={isActiveTab}>
      <div className="side-panel-title">Images</div>

      <div style={{ overflow: 'hidden' }}>
        <label className="custom-file-upload panel-button">
          <input
            type="file"
            name="fileToUpload"
            id="fileToUpload"
            onChange={(event) =>
              imageUploadingFirebase(event.target.files[0] || null)
            }
          />
          Upload Photo
        </label>
      </div>
      <div className="libraryImageGrid">
        {projectImages.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
      </div>
    </SidePanel>
  )
}
