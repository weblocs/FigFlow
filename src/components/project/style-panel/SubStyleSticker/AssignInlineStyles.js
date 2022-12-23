import { useDispatch, useSelector } from 'react-redux'
import { assignAllInlineStylesToClass } from '../../../../features/project'

export default function AssignInlineStyles({ id, child, handleOpen }) {
  const stylesInActiveNode = useSelector(
    (state) => state.project.stylesInActiveNode
  )

  const dispatch = useDispatch()

  function handleAssignClick() {
    dispatch(
      assignAllInlineStylesToClass({
        styleId: stylesInActiveNode?.[0].id,
        optionId: child.id,
        optionVersionId: id,
      })
    )
    handleOpen(false)
  }

  return <button onClick={handleAssignClick}>Assign inline styles</button>
}
