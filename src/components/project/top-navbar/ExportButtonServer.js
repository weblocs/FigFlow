import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export default function ExportButtonServer() {
  const projectData = useSelector((state) => state.project.projectSettingsData)
  const projectPages = useSelector((state) => state.project.projectPages)
  const collections = useSelector((state) => state.project.collections)
  const projectPageFolderStructure = useSelector(
    (state) => state.project.projectPageFolderStructure
  )
  const dispatch = useDispatch()

  function handlePhpOnClick() {
    console.log(projectPageFolderStructure)
    console.log(projectData.slug)
    axios
      .post('http://phpstack-913418-3170396.cloudwaysapps.com/projects/', {
        slugData: projectData.slug,
        projectPages: projectPages,
        collections: collections,
        projectPageFolderStructure: projectPageFolderStructure,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  return (
    <button className="saveButton light" onClick={handlePhpOnClick}>
      Save
    </button>
  )
}
