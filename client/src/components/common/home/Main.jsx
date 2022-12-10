import React from 'react'
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <div className='main_container'>
      <Outlet />
    </div>
  )
}

export default Main
