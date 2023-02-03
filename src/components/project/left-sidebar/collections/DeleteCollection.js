import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCollection } from '../../../../features/project'
import ConfirmDeleteModalButton from '../../modals/ConfirmDeleteModalButton'

export default function DeleteCollection({ name, id }) {
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(deleteCollection({ id: id }))
  }

  return (
    <div className="page-settings-wrapper">
      <div>
        <ConfirmDeleteModalButton
          handleOnClick={handleDelete}
          deleteItemName={name}
          deleteItemType="collection"
          redButton={true}
          buttonText="Collection"
        />
      </div>
    </div>
  )
}
