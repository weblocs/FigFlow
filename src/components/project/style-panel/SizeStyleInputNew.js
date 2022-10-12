import { useDispatch, useSelector } from 'react-redux'

export default function SizeStyleInputNew({style, text, placeholder}) {
    const styleValue = useSelector((state) => state.project.activeNodeComputedStyles?.[style.replace("-","_")])
    const dispatch = useDispatch()

    return (
        <div>
            {styleValue}
        </div>
    )
}