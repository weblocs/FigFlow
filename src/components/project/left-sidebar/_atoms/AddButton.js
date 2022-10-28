
import addIcon from "../../../../img/plus.svg"

export default function AddButton({fx}) {
    return (
        <button 
        className="settings-list-add-button"
        onClick={fx}>
            <img className="settings-list-add-icon" src={addIcon} />
        </button>
    )
}