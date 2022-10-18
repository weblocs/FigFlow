import OpacityInput from './OpacityInput';
import ProprtyInputLabel from './ProprtyInputLabel';

export default function OpacityInputBox() {
    return (
        <div className="size-style-box">
            <ProprtyInputLabel text="Opacity" property="opacity" />
            <OpacityInput style="opacity" />
        </div>
    )
}