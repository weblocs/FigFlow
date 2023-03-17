import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../utils/firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createClient } from '@supabase/supabase-js'

import {
  getFirestore,
  getDocs,
  setDoc,
  doc,
  where,
  query,
  collection,
} from 'firebase/firestore'
import { func } from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import CreateNewProject from '../components/dashboard/CreateNewProject'

export default function Dashboard() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)

  const [uid, setUid] = useState('')
  const [isDashboardSet, setIsDashboardSet] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [projects, setProjects] = useState([])
  const [testVar, setTestVar] = useState('')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid)
      setUserEmail(user.email)
      setIsLoggedIn(true)
    } else {
      window.location.href = '/login'
    }
  })

  const supabase = createClient(
    'https://tvibleithndshiwcxpyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWJsZWl0aG5kc2hpd2N4cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MDcxMjAsImV4cCI6MTk5NDM4MzEyMH0.UGM0_FrjGdB8twoyXQk2aKKJg3mP924BDzCKcFNTDvU'
  )

  async function readProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('projectName, projectId, isTemplate')
      .eq('userid', uid)
    if (data && data.length > 0) {
      setProjects(data)
    }

    // const querySnapshot = await getDocs(
    //   query(
    //     collection(db, 'projects'),
    //     where('userid', '==', uid),
    //     where('isDeleted', '==', false)
    //   )
    // )
    // let tempProjects = []
    // querySnapshot.forEach((doc) => {
    //   tempProjects = [...tempProjects, doc.data()]
    // })
    // setProjects(tempProjects)
  }

  useEffect(() => {
    readProjects()
  }, [uid])

  return (
    <div className="user-panel">
      <div className="dashboard-section">
        <div className="container">
          <div className="new-project-header">
            <div className="dashboard-email-box">
              <div className="dashboard-log-out">Account:</div>
              <Link to="/login" className="user-link">
                <div className="dashboard-email">{userEmail}</div>
              </Link>
            </div>
            <CreateNewProject userid={uid} />
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <Link
                className="project-item"
                to={`/design/${project.projectId}`}
                key={project.projectId}
              >
                <div className="project-title">{project.projectName}</div>
                {project?.isTemplate && (
                  <div className="dashboard_is-template">Template</div>
                )}
              </Link>
            ))}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
