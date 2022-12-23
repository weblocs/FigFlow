import { useDispatch, useSelector } from 'react-redux'
import { setNodeProperty } from '../../../../../features/project'

export default function CmsCurrentLink() {
  const cmsLinkConnect = useSelector(
    (state) => state.project.activeNodeObject?.cmsLinkConnect
  )

  const isNodeInCollection = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = 0; i < parentPath.length; i++) {
      if (parentPath[i]?.type === 'col') {
        return true
      }
    }
    return false
  })

  function onInputChange(e) {
    dispatch(
      setNodeProperty({
        property: 'cmsLinkConnect',
        value: e.target.checked,
      })
    )
  }

  const dispatch = useDispatch()

  if (isNodeInCollection) {
    return (
      <label className="cms-current-link-wrap">
        <input
          type="checkbox"
          checked={cmsLinkConnect}
          onChange={onInputChange}
        />
        <div>Current CMS Page </div>
      </label>
    )
  } else {
    return null
  }
}
