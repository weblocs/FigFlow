import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Label from '../../ui/Label'
import AddFontFamilyForm from './AddFontFamilyForm'
import UploadFont from './UploadFont'
import FontItem from './FontItem'
import FontNameInput from './FontNameInput'
import DeleteFontFamilyButton from './DeleteFontFamilyButton'

export default function FontsSettings() {
  const fonts = useSelector((state) => state.project.fonts)
  const dispatch = useDispatch()

  function deleteFontFamily(id) {
    dispatch(deleteFontFamily({ id }))
  }

  return (
    <div>
      <div className="mb-12">
        {fonts.map((font) => {
          return (
            <div key={font.id} className="border-b mb-12">
              <div className="flex justify-between items-center mb-8">
                <FontNameInput font={font} />

                <div className="flex gap-4">
                  <DeleteFontFamilyButton id={font.id} />

                  <UploadFont fontId={font.id} />
                </div>
              </div>
              {font.weights.map((weight) => {
                return (
                  <FontItem fontId={font.id} weight={weight} key={weight.id} />
                )
              })}
            </div>
          )
        })}
      </div>

      <AddFontFamilyForm />

      {/* <label className="custom-file-upload">
        <input
          type="file"
          onChange={(event) =>
            uploadFont(event.target.files[0] || null, 'favicon')
          }
        />
        Choose Font
      </label> */}
    </div>
  )
}
