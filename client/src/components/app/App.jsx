import React from 'react'
import '../../scss/app.scss'
import Connection from './Connection'
import { Routes, Route, Navigate } from 'react-router-dom'
import SingIn from './auth/SingIn'
import SingUp from './auth/SingUp'
import socketClient from 'socket.io-client'
import { useSelector } from 'react-redux'

function App() {
  const socket = socketClient('http://localhost:7777')

  const token = useSelector(state => state.authorization.token)

  if (token) {
    return (
      <div className='app_container'>
        <Routes>
          <Route path='/*' element={<Connection socket={socket} />} />
        </Routes>
      </div>
    )
  }
  return (
    <div className='app_container'>
      <Routes>
        <Route path='/' element={<Navigate to='/SingIn' />} />
        <Route path='SingIn/*' element={<SingIn />} />
        <Route path='SingUp/*' element={<SingUp />} />
      </Routes>
    </div>
  )
}

export default App
