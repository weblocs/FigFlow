import { useDispatch, useSelector } from "react-redux"

export default function BaseComponent() {
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const dispatch = useDispatch()

    return (
        <div>

        </div>
    )
}