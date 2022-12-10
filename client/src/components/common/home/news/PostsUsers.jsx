import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, postText } from '../../../../store/features/posts.js'
import { MyDataLoad } from '../../../../store/features/users'
import Picker from 'emoji-picker-react'
import smileIcon from '../../../../public/assets/defaultImg/icons8-показать-язык-96 (1).png'
import defaultImg from '../../../../public/assets/defaultImg/avatar.png'
import '../../../../scss/home/news.scss'
import jwtDecode from 'jwt-decode'
function PostsUsers() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authorization.token)
  const name = jwtDecode(token)
  const UserPosts = useSelector(state => state.posts.UserPosts)
  const myDataLoad = useSelector(state => state.users.MyData)
  const [openBar, setOpenBar] = useState(false)
  const [text, setText] = useState('')
  console.log(myDataLoad)

  console.log(UserPosts)
  useEffect(() => {
    dispatch(getPosts())
    dispatch(MyDataLoad)
  }, [dispatch])

  const handleClickAdd = e => {
    if (text.length < 5) {
      dispatch(postText(text))
      dispatch({ type: 'add/text', payload: { name: name.login, text } })
      e.preventDefault()
      setText('')
    } else {
      console.log('нет')
      e.preventDefault()
    }
  }

  const onEmojiClick = (event, emojiObject) => {
    setText(prevInput => prevInput + emojiObject.emoji)
    return console.log(emojiObject)
  }
  document.querySelectorAll('.textarea').forEach(element => {
    element.style.height = '1px'
    element.style.height = `${element.scrollHeight}px`
  })
  const handleClickExit = () => {
    setOpenBar(false)
  }

  document.body.addEventListener('click', handleClickExit)

  return (
    <div>
      <div className='post_form'>
        {/* <img
          className='from_user_logo'
          src={require(`../../../../public/assets/userImg/${myDataLoad.data.logoUser}`)}
          alt='err'
        /> */}
        <form className='form'>
          <textarea
            value={text}
            maxLength={1000}
            placeholder='что у вас нового?'
            onChange={e => setText(e.target.value)}
            className='textarea'
          ></textarea>
          <div className='org'>{1000 - text.length}</div>
          <div onClick={e => e.stopPropagation()}>
            <div className='smile' onClick={() => setOpenBar(!openBar)}>
              <img className='img_smile' src={smileIcon} alt='err' />
            </div>
          </div>
          <button className='button_form_add' onClick={handleClickAdd}>
            опубликовать
          </button>
        </form>
      </div>

      <div
        onClick={e => e.stopPropagation()}
        className={'emoji_block_' + (openBar ? 'open' : 'exit')}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </div>
      <div className='user_post'>
        {UserPosts.map(posts => {
          return (
            <div className='user_post_block'>
              <div>{posts.name}</div>
              <p className='user_text_post'>{posts.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostsUsers
