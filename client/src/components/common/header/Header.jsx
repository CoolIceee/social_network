import React from 'react'
import '../../../scss/header/header.scss'
import Logo from './logo/Logo'
import Input from './input/Input'
import Notification from './notification/Notification'
import Profile from './userAvatar/Profile'

function Header() {
  return (
    <>
      <header className='header'>
        <ul className='navigation'>
          <li className='under_navigation'>
            <Logo />
          </li>
          <li className='under_navigation'>
            <Input />
          </li>
          <li className='control_panel'>
            <Notification />
          </li>
          <li className='control_profile'>
            <Profile />
          </li>
        </ul>
      </header>
      
    </>
  )
}

export default Header
