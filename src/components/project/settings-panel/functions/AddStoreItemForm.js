import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataToHtmlNode } from '../../../../features/project'

export default function AddStoreItemForm() {
  const elementData = useSelector(
    (state) => state.project.activeNodeObject?.data
  )
  const dispatch = useDispatch()

  const [isFormOpen, setIsFormOpen] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(
      addDataToHtmlNode({
        name: e.target.name.value,
        initValue: e.target.initValue.value,
        type: e.target.type.value,
      })
    )
  }

  return (
    <>
      {elementData?.map((data) => (
        <div key={data.id}>
          {data.name}: {data.initValue}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <div onClick={() => setIsFormOpen(!isFormOpen)}>Add</div>

        {isFormOpen && (
          <>
            <input name="name" type="text" placeholder="Name" />
            <input name="initValue" type="text" placeholder="Initial value" />
            <select name="type">
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="array">Array</option>
              <option value="object">Object</option>
            </select>
            <button>Add</button>
          </>
        )}
      </form>
    </>
  )
}
