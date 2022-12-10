import React from 'react'
import Header from '../common/header/Header'
import Home from '../common/home/Home'

function Connection({ socket }) {
    return (
      <>
        <Header />
        <Home socket={socket} />
      </>
    )
  }


export default Connection
