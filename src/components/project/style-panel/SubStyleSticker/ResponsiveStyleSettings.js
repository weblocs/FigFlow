import { useDispatch } from 'react-redux'
import { editStyleOption } from '../../../../features/project'

export default function ResponsiveStyleSettings({
  index,
  isOnlyForMobile,
  isOnlyForTablet,
}) {
  const dispatch = useDispatch()

  function handleCheckboxClick(e) {
    dispatch(
      editStyleOption({
        property: 'isOnlyForMobile',
        value: isOnlyForMobile ? false : true,
        index: index,
      })
    )
  }

  function handleCheckboxTabletClick(e) {
    dispatch(
      editStyleOption({
        property: 'isOnlyForTablet',
        value: isOnlyForTablet ? false : true,
        index: index,
      })
    )
  }

  return (
    <>
      <label className="style-option-checkbox-box">
        <input
          type="checkbox"
          checked={isOnlyForTablet ? true : false}
          onChange={handleCheckboxTabletClick}
        />{' '}
        Only for tablet
      </label>

      <label className="style-option-checkbox-box">
        <input
          type="checkbox"
          checked={isOnlyForMobile ? true : false}
          onChange={handleCheckboxClick}
        />{' '}
        Only for mobile
      </label>
    </>
  )
}
