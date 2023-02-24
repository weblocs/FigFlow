import { useDispatch, useSelector } from 'react-redux'
import { addFont } from '../../../features/project'
import Button from '../../ui/Button'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../../utils/firebase-config'

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })

export default function UploadFont({ fontId }) {
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const dispatch = useDispatch()

  const storage = getStorage()

  const fontUpload = (file) => {
    if (!file) {
      return
    }
    const fileName = projectFirebaseId + '-' + file.name.replaceAll('.', '-')
    console.log(file)
    fileToDataUri(file)
      .then((dataUri) => {
        const tempStorageRef = ref(storage, fileName)
        uploadBytes(tempStorageRef, file).then((snapshot) => {})
      })
      .then(async () => {
        dispatch(
          addFont({
            url: fileName,
            name: file.name,
            fontId: fontId,
            weight: '500',
          })
        )
      })
  }

  return (
    // <div>
    //   <Button onClick={handleClick} text="Add font" size="sm" type="white" />
    // </div>
    <div style={{ overflow: 'hidden' }}>
      <label className="custom-file-upload">
        <input
          type="file"
          onChange={(event) => fontUpload(event.target.files[0] || null)}
        />
        Upload Font
      </label>
    </div>
  )
}
