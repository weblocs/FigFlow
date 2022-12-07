import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ElementFunctionItem({ id }) {
  const activeFunction = useSelector((state) =>
    state.project?.functions?.find((func) => func.id === id)
  )

  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  return (
    <div>
      <div className="element-function-item" onClick={() => setIsOpen(!isOpen)}>
        {activeFunction.name}
      </div>

      {isOpen && (
        <div>
          {activeFunction.actions.map((action) => {
            return (
              <div key={action.id}>
                {action.action} {action.target}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
