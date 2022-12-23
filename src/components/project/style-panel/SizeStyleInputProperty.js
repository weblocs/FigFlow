export default function SizeStyleInputProperty({
  unit,
  text,
  handleClick,
  activeUnit,
}) {
  return (
    <div
      className={
        'style-edit-unit-item' + (activeUnit === unit ? ' active' : '')
      }
      onClick={() => handleClick(unit)}
    >
      {text || unit}
    </div>
  )
}
