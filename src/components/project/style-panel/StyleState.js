import { useDispatch, useSelector } from 'react-redux'
import StyleStateButton from './StyleStateButton'

export default function StyleState() {
    return (
        <div className='style-state_wrapper'>
            <div className='text'>State: </div>
            <StyleStateButton state="default" />
            <StyleStateButton state="hover" />
            
        </div>
    )
}