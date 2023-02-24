import { useEffect, useRef, useState } from 'react'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseConfig } from '../../utils/firebase-config'
import { initializeApp } from 'firebase/app'
import {
  setIsSettingsModalOpen,
  setKeyboardNavigationOn,
  setProjectNameAndSlug,
} from '../../features/project'
import ProjectSettingsDelete from './ProjectSettingsDelete'
import FaviconUploader from './FaviconUploader'
import SelectPageNavigation from './SelectPageNavigation'
import FontsSettings from './fonts/FontsSettings'
import SettingsTab from './SettingsTab'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'

export default function ProjectSettings() {
  const projectNameAndSlug = useSelector(
    (state) => state.project.projectNameAndSlug
  )
  const isOfflineModeOn = useSelector(
    (state) => state.project.offlineMode === true
  )
  const isSettingsModalOpen = useSelector(
    (state) => state.project.isSettingsModalOpen
  )
  const projectFirebaseId = useSelector(
    (state) => state.project.projectFirebaseId
  )
  const tab = useSelector((state) => state.project.activeSettingsTab)
  const dispatch = useDispatch()

  const inputNameRef = useRef()
  const inputSubdomainRef = useRef()
  const inputLangRef = useRef()

  const [isSubdomainValid, setIsSubdomainValidate] = useState(true)
  const [validationMessage, setValidationMessage] = useState(true)

  async function handleSubmit() {
    event.preventDefault()
    if (isSubdomainValid) {
      const app = initializeApp(firebaseConfig)
      const db = getFirestore(app)
      const projectRef = doc(db, 'projects', projectFirebaseId)
      await updateDoc(projectRef, {
        projectName: inputNameRef.current.value,
        projectId: inputSubdomainRef.current.value,
        projectLang: inputLangRef.current.value,
      })
      window.location.href = `/design/${inputSubdomainRef.current.value}`
    }
  }

  async function subdomainValidation() {
    let regex = new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$')
    const regexTest = regex.test(inputSubdomainRef.current.value)
    if (!regexTest) {
      setIsSubdomainValidate(false)
      setValidationMessage(
        'Subdomains need to be alphanumeric (A-Z, 0-9) with dashes between words.'
      )
    } else {
      const app = initializeApp(firebaseConfig)
      const db = getFirestore(app)
      let sameNameProjects = await getDocs(
        query(
          collection(db, 'projects'),
          where('projectId', '==', inputSubdomainRef.current.value)
        )
      )
      const availabilityTest =
        sameNameProjects.size === 0 ||
        inputSubdomainRef.current.value === projectNameAndSlug.slug
      if (!availabilityTest) {
        setIsSubdomainValidate(false)
        setValidationMessage('This sub-domain is currently taken.')
      } else {
        setIsSubdomainValidate(true)
        setValidationMessage('')
      }
    }
  }

  useEffect(() => {
    inputNameRef.current.value = projectNameAndSlug.name
    inputSubdomainRef.current.value = projectNameAndSlug.slug
  }, [projectNameAndSlug])

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  return (
    <div
      className={
        'fixed top-0 left-0 w-screen h-screen z-50 justify-center items-center ' +
        (isSettingsModalOpen ? 'flex' : 'none')
      }
    >
      <div
        onClick={() => dispatch(setIsSettingsModalOpen(false))}
        className="bg-black opacity-50 absolute w-full h-full"
      ></div>
      <div className="bg-white relative inline-block w-full h-full max-w-screen--120 max-h-screen--120 p-32 rounded-md overflow-y-scroll">
        <div className="flex justify-between mb-16">
          <div className="flex items-center">
            <h3>Settings</h3>
          </div>
          <div className="flex items-center gap-8">
            <ProjectSettingsDelete />
            <Button
              text="Close"
              onClick={() => dispatch(setIsSettingsModalOpen(false))}
            />
          </div>
        </div>
        <div className="flex gap-8 mb-8">
          <SettingsTab tab="general" />
          <SettingsTab tab="fonts" />
        </div>

        <form
          onSubmit={handleSubmit}
          className={'max-w-300 ' + (tab !== 'general' ? 'none' : '')}
        >
          <Label text="Name" />
          <Input
            useRef={inputNameRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Label text="Subdomain" />
          <Input
            useRef={inputSubdomainRef}
            onInput={subdomainValidation}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div>{validationMessage}</div>
          <label className="project-settings_label">Lang</label>
          <input
            className="project-settings_input"
            ref={inputLangRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button type="action" text="Save" submit={true} />
          {isOfflineModeOn ? null : <FaviconUploader />}
        </form>

        {tab === 'fonts' ? <FontsSettings /> : null}
      </div>
    </div>
  )
}
