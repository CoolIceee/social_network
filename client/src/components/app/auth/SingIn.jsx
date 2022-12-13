import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../scss/app/auth.scss'
import { userLogin } from '../../../store/features/authorization'
import Logo from '../../common/header/logo/Logo'
import { useNavigate, NavLink } from 'react-router-dom'

function SingIn() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  const siningIn = useSelector(state => state.authorization.siningIn)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = e => {
    setLogin(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  const handleClick = async () => {
    await dispatch(userLogin({ login, password }))
    navigate('/')
  }
  return (
    <div className='section_auth'>
      <div className='auth_container'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='auth_pol'>
          <div className='in_section'>
            <div className='text_login'>Авторизация</div>
            <form className='connect_form'>
              <input
                type='text'
                className='inp_in_log'
                value={login}
                onChange={handleLogin}
                placeholder='Имя пользователя'
              />
              <input
                type={checkbox ? 'text' : 'password'}
                className='inp_in_pas'
                value={password}
                onChange={handlePassword}
                placeholder='Пароль'
              />
              <div className='checkboxPassword_block'>
                Показать пароль
                <input
                  onClick={() => setCheckbox(!checkbox)}
                  className='checkbox_password'
                  type='checkbox'
                />
              </div>
              <div className='butt_in'>
                <button
                  disabled={siningIn}
                  className='butt_in'
                  onClick={handleClick}
                >
                  {siningIn === true ? (
                    <div className='simple-spinner'></div>
                  ) : (
                    'Войти'
                  )}
                </button>
              </div>
            </form>
            <div className='path_register'>
              <button className='back_style'>
                <NavLink to='/SingUp'>Зарегистрироваться?</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingIn
