import { useState } from 'react'
import SizeStyleInputProperty from './SizeStyleInputProperty'

export default function SizeStyleInputProperties({
  isOpen,
  handleUnitClick,
  activeUnit,
}) {
  const [properties, setProperties] = useState([
    {
      name: 'px',
    },
    {
      name: '%',
    },
    {
      name: 'em',
    },
    {
      name: 'vh',
    },
    {
      name: '',
      text: '-',
    },
  ])
  return (
    <div className={'style-edit-unit-list' + (isOpen ? ' active' : '')}>
      {properties.map((property) => (
        <SizeStyleInputProperty
          key={property.name}
          unit={property.name}
          text={property.text}
          handleClick={handleUnitClick}
          activeUnit={activeUnit}
        />
      ))}
    </div>
  )
}
