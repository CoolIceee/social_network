import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { createMessage, oneChat } from '../../../../store/features/messages.js'
import Picker from 'emoji-picker-react'
import smileIcon from '../../../../public/assets/defaultImg/icons8-показать-язык-96 (1).png'
import addIcon from '../../../../public/assets/defaultImg/icons8-отправлено-96.png'
import { useNavigate } from 'react-router-dom'

function Message({ socket, oneChatId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [openBar, setOpenBar] = useState(false)
  const OneChatId = useSelector(state => state.messages.OneChatId)
  const messages = useSelector(state => state.messages.messages)
  const token = useSelector(state => state.authorization.token)
  const id = jwtDecode(token)
  const userId = id.id

  const messagesRef = document.getElementsByClassName('chat_section')
  console.log(messages)
  useEffect(() => {
    socket.on('load:message', data => {
      console.log(data)
      dispatch({ type: 'get/message/chat', payload: data })
    })
  }, [])

  useEffect(() => {
    socket.on('chat:message:um', data => {
      return console.log(data)
    })
  }, [])

  useEffect(() => {
    socket.emit('join', { oneChatId, userId })
  }, [])

  useEffect(() => {
    dispatch(oneChat(oneChatId))
  }, [])

  useEffect(() => {
    messagesRef[0].scrollTo(0, 999999999999999)
  }, [messagesRef, messages])

  const onEmojiClick = (event, emojiObject) => {
    setMessage(prevInput => prevInput + emojiObject.emoji)
    return console.log(emojiObject)
  }

  const handleClickExit = () => {
    setOpenBar(false)
  }
  document.body.addEventListener('click', handleClickExit)

  const goBack = () => navigate(-1)

  try {
    const Message = messages.map(messages => {
      return messages.userMessageId1 === id.id ? (
        <div id='ah' className='chat_my_block'>
          <div className='my_text_container'>
            <div className='text_container'>
              <div className='my_message_time'>{messages.dataTime}</div>
              <div className='message_my_name'>{messages.userName}</div>
            </div>
            <div className='my_message'>
              <p className='textEnd'>{messages.message}</p>
            </div>
          </div>
          {/* <img
            className='my_avatar'
            src={require(`../../../../public/assets/userImg/${messages.logoUsers}`)}
            alt='err'
          /> */}
        </div>
      ) : (
        <div className='chat_user_block'>
          {/* <img
            className='user_avatar'
            src={require(`../../../../public/assets/userImg/${messages.logoUsers}`)}
            alt='err'
          /> */}
          <div className='user_text_container'>
            <div className='text_container'>
              <div className='message_user_name'>{messages.userName}</div>
              <div className='message_time'>{messages.dataTime}</div>
            </div>
            <div className={'message_text'}>{messages.message}</div>
          </div>
        </div>
      )
    })
console.log(OneChatId)
    const userData = OneChatId.usersId.filter(users => {
      console.log(users)
      return users._id !== id.id
    })
    const userTwoId = userData[0]._id
    const handleClick = () => {
      socket.emit('create:message', { message, oneChatId, userId, userTwoId })
      userData.map(userId => {
        const id = userId._id
        return dispatch(createMessage(message, oneChatId, id))
      })
      setMessage('')
    }
    document.querySelectorAll('.textarea').forEach(element => {
      element.style.height = '20px'
      element.style.height = `${element.scrollHeight}px`
    })
    return (
      <div className='message_user_container'>
        <>
          {userData.map(data => {
            const st = '<'
            return (
              <>
                <div className='chat_header'>
                  <div className='user_block'>
                    <div onClick={goBack} className='back_block'>
                      <div className='text_back'>{st}</div>
                      <div className='back_style'>назад</div>
                    </div>
                    <div className='name_user'>{data.login}</div>

                    <div className='logo_user'>
                      {/* <img
                        className='img_logo_user'
                        src={require(`../../../../public/assets/userImg/${data.logoUser}`)}
                        alt='err'
                      /> */}
                    </div>
                  </div>
                </div>
                <div className='chat_section'>{Message}</div>
                <div onClick={e => e.stopPropagation()}>
                  <div className={'emoji_block_' + (openBar ? 'open' : 'exit')}>
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                  <div className='chat_footer'>
                    <div className='block_input_stack'>
                      <textarea
                        id='textareaId'
                        placeholder='Напишите сообщение...'
                        className='textarea'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                      ></textarea>
                      <div
                        className='smile'
                        onClick={() => setOpenBar(!openBar)}
                      >
                        <img className='img_smile' src={smileIcon} alt='err' />
                      </div>
                    </div>

                    <div className='add' onClick={handleClick}>
                      <img className='img_add' src={addIcon} alt='err' />
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </>
      </div>
    )
  } catch {
    return (
      <div className='message_user_container'>
        <div className='chat_header'>
          <div className='user_block'>
            <div className='name_user'></div>
            <div className='logo_user'></div>
          </div>
        </div>
        <div className='chat_section'>
          <div className='chat_user_block'></div>
        </div>
        <div className='chat_footer'>
          <div className='block_input_stack'>
            <textarea
              rows='5'
              placeholder='Напишите сообщение...'
              className='textarea'
            ></textarea>
            <div className='smile'>
              <img className='img_smile' src={smileIcon} alt='err' />
            </div>
          </div>

          <div className='add'>
            <img className='img_add' src={addIcon} alt='err' />
          </div>
        </div>
      </div>
    )
  }
}

export default Message
