export default function Tab({ tab, isActiveTab, handleSetIsActiveTab }) {
  return (
    <div
      onClick={() => handleSetIsActiveTab(tab)}
      className={
        'border-panel_grid-item ' + (isActiveTab === tab ? ' is-active' : '')
      }
    >
      <div className={'border-panel_icon is-' + tab}></div>
    </div>
  )
}
