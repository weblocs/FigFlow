import { useState } from 'react'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseConfig } from '../../utils/firebase-config'
import { initializeApp } from 'firebase/app'
import Button from '../ui/Button'

export default function ProjectSettingsDelete() {
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  async function deleteProject() {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const projectRef = doc(db, 'projects', projectFirebaseId)
    await updateDoc(projectRef, {
      isDeleted: true,
    })
    window.location.href = '/'
  }

  return (
    <div>
      <Button
        type="danger"
        onClick={() => setIsModalOpen(true)}
        text="Delete Project"
      />
      <div
        className={
          'project-settings_delete-modal' + (isModalOpen ? ' active' : '')
        }
      >
        <div
          className="project-settings_delete-modal_close-area"
          onClick={() => setIsModalOpen(false)}
        ></div>
        <div className="project-settings_delete-modal_content-area">
          Do you confirm deleting the project?
          <div className="project-settings_delete-modal_buttons-list">
            <div
              onClick={deleteProject}
              className="project-settings_delete-modal_button"
            >
              Delete
            </div>
            <div
              className="project-settings_delete-modal_button not-cofirming"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
