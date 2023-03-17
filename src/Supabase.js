import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

export default function Supabase() {
  const supabase = createClient(
    'https://tvibleithndshiwcxpyh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWJsZWl0aG5kc2hpd2N4cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MDcxMjAsImV4cCI6MTk5NDM4MzEyMH0.UGM0_FrjGdB8twoyXQk2aKKJg3mP924BDzCKcFNTDvU'
  )

  async function getProjects() {
    // const data = await supabase.from('projects').select('*')
    // console.log(data)
    // const { data, error } = await supabase
    //   .from('projects')
    //   .insert([{ id: uuidv4(), name: 'Hiiii' }])
  }

  useEffect(() => {
    getProjects()
  }, [])

  return <div></div>
}
