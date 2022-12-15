import React, { useState } from 'react'
import './Modal.css'
import { API_URL } from '../../../config'
import avatarLogo from '../../../public/assets/avatar.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import right from '../../../public/assets/icons8-шеврон-вправо-50.png'
import left from '../../../public/assets/icons8-шеврон-влево-50.png'

const Modal = ({ photographyPath, pho }) => {
  const navigate = useNavigate()
  const myDataLoad = useSelector(state => state.users.MyData)
  const [counter, setCounter] = useState(pho)
  const element = myDataLoad[0].photo
  const data = myDataLoad.map(item => {
    return item.photo.filter((element, index) => {
      return index === counter
    })
  })
  const handleClick = () => {
    if (counter === 0) {
      return setCounter(element.length - 1)
    }
    setCounter(counter - 1)
  }
  const handleClickMinus = () => {
    if (counter === element.length - 1) {
      return setCounter(0)
    }
    setCounter(counter + 1)
  }
  console.log('@@', photographyPath, 'aa', data)
  return myDataLoad.map(item => {
    return (
      <div onClick={() => navigate(-1)} className='modal'>
        <div className='display_block' onClick={e => e.stopPropagation()}>
          <button onClick={handleClickMinus}>
            <img className='button_img' src={left} alt='err' />
          </button>
          <div className='container_galere'>
            <img
              className='photo_user'
              src={photographyPath ? `${API_URL + data[0]}` : avatarLogo}
              alt='err'
            />
          </div>
          <button onClick={handleClick}>
            <img className='button_img' src={right} alt='err' />
          </button>
        </div>
      </div>
    )
  })
}

export default Modal
