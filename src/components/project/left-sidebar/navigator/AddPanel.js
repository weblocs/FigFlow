import { useState } from 'react'
import AddNodeButton from './AddNodeButton'
import DropdownIcon from '../../../../img/dropdown.svg'

export default function AddPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{ position: 'sticky', top: '0', zIndex: '1' }}>
      <div className="side-panel-title">
        Add
        <img
          onClick={() => setIsOpen(!isOpen)}
          src={DropdownIcon}
          className="w-12 px-2 py-2 pointer"
        />
      </div>
      {isOpen && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <AddNodeButton type="div" text="Div" />
          <AddNodeButton type="h" text="Heading" />
          <AddNodeButton type="p" text="Paragraph" />
          <AddNodeButton type="img" text="Image" />
          <AddNodeButton type="a" text="Text Link" />
          <AddNodeButton type="l" text="Link" />
          <AddNodeButton type="col" text="Collection" />
          <AddNodeButton type="sec" text="Section" />
          <AddNodeButton type="body" text="Body" />
          <AddNodeButton type="form" text="Form" />
          <AddNodeButton type="i" text="Input" />
          <AddNodeButton type="area" text="Text Area" />
          <AddNodeButton type="label" text="Label" />
          <AddNodeButton type="c" text="Checkbox" />
          <AddNodeButton type="r" text="Radio" />
          <AddNodeButton type="sub" text="Submit" />
          <AddNodeButton type="nav_tr" text="Nav Trigger" />
          <AddNodeButton type="nav_l" text="Nav List" />
          <AddNodeButton type="rich_text" text="Rich Text" />
          <AddNodeButton type="embed" text="Embed" />
        </div>
      )}
    </div>
  )
}
