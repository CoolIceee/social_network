import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAvatar } from '../../../../store/features/users'
import "./edit.css"
// import Modal from '../../Modal/Modal'
function EditWindow({ a, b }) {
  const [file, setFile] = useState()
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()
  const createPhotoHandler = () => {
    dispatch(createAvatar(file))
  setModalActive(true)
  }
  return (
    <div className='edit_window_container'>
      <ul className='menu_buttons'>
        <li>Обновить фотографию</li>
        <li>
          <input type={'file'} onChange={e => setFile(e.target.files[0])} />
          <button onClick={createPhotoHandler}>отправить фото</button>
        </li>
        <li>Удалить фотографию</li>
      </ul>
      {/* <Modal active={modalActive} setActive={setModalActive} /> */}
    </div>
  )
}

export default EditWindow
