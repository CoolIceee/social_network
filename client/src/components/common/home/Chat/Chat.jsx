import React from 'react'
import '../../../../scss/home/chat/chat.scss'
import jwtDecode from 'jwt-decode'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Chat({ socket }) {
  socket.removeAllListeners('load:message')
  const token = useSelector(state => state.authorization.token)
  const dataChats = useSelector(state => state.messages.dataChats)

  const id = jwtDecode(token)
  
    const chatData = dataChats.map(users => {
      return users
    })
    return (
      <div className='chat_container'>
        <div className='search_user_block'>Чаты</div>
        <div className='scroll_chats'>
          {chatData.map(chatId => {
            const lastTime = chatId.message.slice(-1).map(lastChatMessage => {
              return <div className='time_msg'>{lastChatMessage.dataTime}</div>
            })
            const user = chatId.usersId.filter(usersFilter => {
              return usersFilter._id !== id.id
            })
            const lastMessage = chatId.message
              .slice(-1)
              .map(lastChatMessage => {
                const lastExit = lastChatMessage.message.slice(-70)
                console.log(lastExit)
                return (
                  <div className='chat_last_message'>
                    {lastChatMessage.message.length > 55
                      ? lastExit + '...'
                      : lastChatMessage.message}
                  </div>
                )
              })
            return user.map(userDate => {
              return (
                <>
                  <div className='chat_ds'>
                    <NavLink
                      to={`/chat/${chatId._id}`}
                      className='chat_messages'
                    >
                      <>
                        <div className='chat_logo_user'>
                          {/* <img
                          className='avatar_user'
                          src={require(`../../../../public/assets/userImg/${userDate.logoUser}`)}
                          alt='err'
                        /> */}
                        </div>
                        <div className='chat_info_user'>
                          <div className='user_info_top'>
                            <div className='chat_user_name'>
                              {userDate.login}
                            </div>
                            {lastTime}
                          </div>

                          {lastMessage}
                        </div>
                      </>
                    </NavLink>
                  </div>
                </>
              )
            })
          })}
        </div>
      </div>
    )
  } 


export default Chat
