import React from 'react'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

function Name() {
  const token = useSelector(state => state.authorization.token)

  if (!token) {
    return (
      <div className='name'>
        <div className='styling_name'>
          <div className='profile_name'>Войти</div>
        </div>
      </div>
    )
  } else {
    const name = jwtDecode(token)
    return (
      <div className='name'>
        <div className='styling_name'>
          <div className='profile_name'>{name.login}</div>
        </div>
      </div>
    )
  }
}

export default Name
