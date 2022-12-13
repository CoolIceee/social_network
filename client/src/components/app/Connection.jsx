import React from 'react'
import Header from '../common/header/Header'
import Home from '../common/home/Home'

// eslint-disable-next-line react/prop-types
function Connection({ socket }) {
    return (
      <>
        <Header />
        <Home socket={socket} />
      </>
    )
  }


export default Connection
