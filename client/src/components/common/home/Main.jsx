import React from 'react'
import { Outlet } from 'react-router-dom'

function Main() {
  console.log('любовь')
  return (
    <div className='main_container'>
      <Outlet />
      
    </div>
  )
}

export default Main
