import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAvatar } from '../../../../store/features/users'
import {useNavigate} from "react-router-dom"
function PhotoUpdate(props) {
    const [file, setFile] = useState()
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const createPhotoHandler = () => {
      dispatch(createAvatar(file))
      navigate("/Hasan")
  }
  return (
    <div>
      <input type={'file'} onChange={e => setFile(e.target.files[0])} />
      <button onClick={createPhotoHandler}>отправить фото</button>
    </div>
  )
}

export default PhotoUpdate
