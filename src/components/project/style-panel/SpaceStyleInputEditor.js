import { useDispatch, useSelector } from 'react-redux'

export default function SpaceStyleInputEditor() {
    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const dispatch = useDispatch()

    return (
        <div>
            
        </div>
    )
}