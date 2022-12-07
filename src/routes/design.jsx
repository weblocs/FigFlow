import { doc } from 'firebase/firestore'
import DevMode from '../DevMode'

export default function Design() {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  return (
    <div>
      <DevMode />
    </div>
  )
}
