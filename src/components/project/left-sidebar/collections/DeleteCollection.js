import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCollection } from '../../../../features/project'
import ConfirmDeleteModalButton from '../../modals/ConfirmDeleteModalButton'

export default function DeleteCollection({ name }) {
  const dispatch = useDispatch()

  function handleDelete(id) {
    dispatch(deleteCollection({ id: id }))
  }

  return (
    <div className="page-settings-wrapper">
      <div>
        <ConfirmDeleteModalButton
          handleOnClick={() => handleDelete(element.id)}
          deleteItemName={name}
          deleteItemType="collection"
          redButton={true}
          buttonText="Collection"
        />
      </div>
    </div>
  )
}
