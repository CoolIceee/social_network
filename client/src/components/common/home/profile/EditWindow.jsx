import React from 'react'
import { NavLink } from 'react-router-dom'
import basket from '../../../../public/assets/icons8-очистить-корзину-48.png'
import gallery from '../../../../public/assets/icons8-стопка-фотографий-48.png'
import pen from '../../../../public/assets/icons8-шариковая-ручка-48 (1).png'
import jwtDecode from 'jwt-decode'

import './edit.scss'
import { useSelector } from 'react-redux'


function EditWindow({ myAvatar }) {

  const token = useSelector(state => state.authorization.token)

  const name = jwtDecode(token)

  console.log(myAvatar)
  return (
    <div className='edit_window_container'>
      <ul className='menu_buttons'>
        <NavLink to={'/update/' + name.login}>
          <li>
            <img className='icon_button' src={pen} alt='err' />
            Обновить фотографию
          </li>
        </NavLink>
        <NavLink to={myAvatar}>
          <li>
            <img className='icon_button' src={gallery} alt='err' />
            Открыть фотографию
          </li>
        </NavLink>

        <li>
          <img className='icon_button' src={basket} alt='err' />
          Удалить фотографию
        </li>
      </ul>
    </div>
  )
}

export default EditWindow
