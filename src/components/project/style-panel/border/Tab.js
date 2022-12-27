import { useSelector } from 'react-redux'

export default function Tab({ tab, isActiveTab, handleSetIsActiveTab }) {
  const isSet = useSelector((state) => {
    let borderColorProperty = 'border-' + tab + '-width'
    if (tab === 'center') {
      borderColorProperty = 'border-width'
    }
    return (
      state.project.objectHierarchyStyles?.findLast(
        ({ style }) => style === borderColorProperty
      )?.value !== undefined
    )
  })

  return (
    <div
      onClick={() => handleSetIsActiveTab(tab)}
      className={
        'border-panel_grid-item ' +
        (isActiveTab === tab ? ' is-active' : '') +
        (isSet ? ' is-set' : '')
      }
    >
      <div className={'border-panel_icon is-' + tab}></div>
    </div>
  )
}
