import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../../../utils/firebase-config.js'
import { addImage } from '../../../../features/project'

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })

export default function FileUploaderToCollectionField({ handleInputChange }) {
  const dispatch = useDispatch()
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const projectImages = useSelector((state) => state.project.images)

  const storage = getStorage()

  const imageUploading = (file) => {
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
        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)
        await updateDoc(doc(db, 'projects', projectFirebaseId), {
          images: [
            ...projectImages,
            {
              name: fileName,
              id: uuidv4(),
            },
          ],
        })
        dispatch(addImage(fileName))
        handleInputChange(fileName)
      })
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <label className="custom-file-upload">
        <input
          type="file"
          onChange={(event) => imageUploading(event.target.files[0] || null)}
        />
        Upload Image
      </label>
    </div>
  )
}
