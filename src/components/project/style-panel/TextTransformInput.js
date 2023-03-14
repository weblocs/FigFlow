import ProprtyInputLabel from './ProprtyInputLabel'
import TextTransformButton from './TextTransformButton'

export default function TextTransformInput() {
  return (
    <div className="display-horizontal-grid">
      <ProprtyInputLabel text="Text" property="text-transform" />
      <div className="display-buttons-box">
        <TextTransformButton letter="U" value="uppercase" />
        <TextTransformButton letter="C" value="capitalize" />
        <TextTransformButton letter="L" value="lowercase" />
        <TextTransformButton letter="N" value="none" />
      </div>
    </div>
  )
}
