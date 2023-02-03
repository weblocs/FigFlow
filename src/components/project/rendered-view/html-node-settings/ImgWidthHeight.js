import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../../features/project'

export default function ImgWidthHeight() {
  const imgWidth = useSelector(
    (state) => state.project.activeNodeObject?.imgWidth || ''
  )
  const imgHeight = useSelector(
    (state) => state.project.activeNodeObject?.imgHeight || ''
  )
  const dispatch = useDispatch()

  const widthInputRef = useRef()
  const heightInputRef = useRef()

  function widthChange() {
    dispatch(
      editHtmlNode({ field: 'imgWidth', value: widthInputRef.current.value })
    )
  }

  function heightChange() {
    dispatch(
      editHtmlNode({ field: 'imgHeight', value: heightInputRef.current.value })
    )
  }

  useEffect(() => {
    widthInputRef.current.value = imgWidth
    heightInputRef.current.value = imgHeight
  }, [imgWidth, imgHeight])

  return (
    <div>
      <div>
        Width <input onChange={widthChange} ref={widthInputRef} />
      </div>
      <div>
        Height <input onChange={heightChange} ref={heightInputRef} />
      </div>
    </div>
  )
}
