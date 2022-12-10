import React, { useEffect } from 'react'
import '../../../scss/home/home.scss'
import Navigation from '../navbar/Navigation'
import Main from './Main'
import News from './news/News'
import { Routes, Route } from 'react-router-dom'
import MyProfile from './profile/MyProfile'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Friends from './friends/Friends'
import UsersPage from './friends/UsersPage'
import Chat from './Chat/Chat'
import Message from './Chat/Message'
import { getChats, oneChat } from '../../../store/features/messages'
import ModalUser from '../../common/Modal/ModalUser'

import {
  loadUserInfo,
  MyDataLoad,
  getDataFriends,
} from '../../../store/features/users'

function Home({ socket }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authorization.token)
  const getUsers = useSelector(state => state.users.getUsers)
  const myDataLoad = useSelector(state => state.users.MyData)
  const name = jwtDecode(token)
  const dataChats = useSelector(state => state.messages.dataChats)

  useEffect(() => {
    dispatch(getDataFriends())
    dispatch(getChats())
    dispatch(loadUserInfo())
    dispatch(MyDataLoad())
  }, [dispatch])

  if (dataChats.error === 'неверный токен') {
    localStorage.removeItem('token')
  }
  const chatData = dataChats.map(users => {
    return users
  })

  return (
    <section className='section'>
      <Navigation />
      <Routes>
        {dataChats.length !== 0 ? (
          chatData.map(chatId => {
            dispatch(oneChat(chatId._id))

            return (
              <>
                <Route
                  path='messages'
                  element={<Chat socket={socket}  />}
                />
                <Route
                  path={`chat/${chatId._id}`}
                  element={<Message socket={socket} oneChatId={chatId._id} />}
                />
              </>
            )
          })
        ) : (
          <>
            <Route path='messages' element={<Chat socket={socket} />} />
          </>
        )}
        <Route path='/*' element={<Main />}>
          <Route index element={<News />} />
          <Route path={`${name.login}`} element={<MyProfile />} />
          {myDataLoad.map(item => {
            return item.photo.map((photo, index) => {
              return (
                <Route
                  path={`${name.login + '/' + photo}`}
                  element={
                    <ModalUser on photographyPath={photo} pho={index} />
                  }
                />
              )
            })
          })}
          <Route path='friends' element={<Friends />} />
          {getUsers.map(users => {
            return (
              <>
                <Route
                  path={`${users._id}`}
                  element={<UsersPage id={users._id} />}
                />
              </>
            )
          })}
        </Route>
      </Routes>
    </section>
  )
}

export default Home
