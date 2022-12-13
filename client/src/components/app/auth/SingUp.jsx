import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../scss/app/auth.scss'
import { userCreate } from '../../../store/features/authorization'
import Logo from '../../common/header/logo/Logo'
import { useNavigate } from 'react-router-dom'

function SingIn() {
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  const siningUp = useSelector(state => state.authorization.siningUp)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handleLogin = e => {
    setLogin(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  const handleClickAuth = async () => {
    await dispatch(userCreate({ email, login, password }))
    navigate('/')
  }

  return (
    <div className='section_auth'>
      <div className='errors'></div>
      <div className='auth_container'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='auth_pol'>
          <div className='in_section'>
            <div className='text_login'>Регистрация</div>
            <form className='connect_form'>
              <input
                type='email'
                className='inp_in_log'
                value={email}
                onChange={handleEmail}
                placeholder='Email'
              />
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
                  disabled={siningUp}
                  className='butt_in'
                  onClick={handleClickAuth}
                >
                  {siningUp === true ? (
                    <div className='simple-spinner'></div>
                  ) : (
                    'Зарегетсрироваться'
                  )}
                </button>
              </div>
              <div onClick={goBack} className='back_block'>
                <button
                  onClick={e => e.preventDefault()}
                  className='back_style'
                >
                  назад
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingIn
