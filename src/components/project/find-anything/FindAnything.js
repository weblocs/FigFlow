import { useDispatch, useSelector } from 'react-redux'

export default function FindAnything() {
    const preRenderedHTMLNodes = useSelector((state) => state.project.preRenderedHTMLNodes)
    const dispatch = useDispatch()

    return (
        <div className='find-anything_wrap'>
            <div>Find anything</div>
        </div>
    )
}