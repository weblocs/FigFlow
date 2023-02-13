import addIcon from '../../../../img/plus.svg'

export default function AddButton({ fx }) {
  return (
    <div className="settings-list-add-button" onClick={fx}>
      <img className="settings-list-add-icon" src={addIcon} />
    </div>
  )
}
