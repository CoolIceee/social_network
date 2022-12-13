import React from 'react'
import cookies from '../../../../public/assets/free-icon-flame-7111311.png'
import '../../../../scss/header/_logo.scss'

function Logo() {
  return (
    <div className='logo'>
      <div className='aut_cent'>
        <img className='cookies_img' src={cookies} alt='err' />
      </div>
      <h1 className='logo_styling'>flame</h1>
    </div>
  )
}

export default Logo
