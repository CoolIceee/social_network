import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  oneUser,
  MyFriendData,
  addFriends,
  deleteFriends,
  acceptAsFriend,
  getDataFriends,
  getUserDataFriends,
} from '../../../../store/features/users'
import defaultIcon from '../../../../public/assets/defaultImg/avatar.png'
import jwtDecode from 'jwt-decode'

function FriendsPage({ id }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authorization.token)
  const myId = jwtDecode(token)
  const loadingOneUser = useSelector(state => state.users.loadingOneUser)
  const datePageUsers = useSelector(state => state.users.infoUser)
  const MyFriendAdd = useSelector(state => state.users.MyFriendAdd)
  const friends = useSelector(state => state.users.friends)
  const dataUserInfo = useSelector(state => state.users.dataUserInfo)

  const consentApplication = () => {
    setFriendAdd({
      ...friendAdd,
      addFriends: <button className='addFriends'>У вас в друзьях</button>,
    })
    dispatch(acceptAsFriend(id))
  }

  const handelClickCancellationFriends = () => {
    setFriendAdd({
      ...friendAdd,
      delete: (
        <button onClick={handelClickAddFriends} className='addFriends'>
          Добавить в друзья
        </button>
      ),
    })
    dispatch(deleteFriends(id))
  }

  const handelClickAddFriends = () => {
    setFriendAdd({
      ...friendAdd,
      add: (
        <button onClick={handelClickCancellationFriends} className='addFriends'>
          Отменить заявку
        </button>
      ),
    })
    dispatch(addFriends(id))
  }
  const [friendAdd, setFriendAdd] = useState({
    add: (
      <button onClick={handelClickAddFriends} className='addFriends'>
        Добавить в друзья
      </button>
    ),
    delete: (
      <button onClick={handelClickCancellationFriends} className='addFriends'>
        Отменить заявку
      </button>
    ),
    addFriends: (
      <button onClick={consentApplication} className='addFriends'>
        Принять заявку
      </button>
    ),
    friends: <button className='addFriends'>У вас в друзьях</button>,
  })

  useEffect(() => {
    dispatch(getDataFriends())
    dispatch(oneUser(id))
    dispatch(MyFriendData())
    dispatch(getUserDataFriends(id))
  }, [dispatch, id])
  try {
    const data = MyFriendAdd.map(user => {
      return user.user
    })
    const userData = friends.map(user => {
      return user.friends.filter(item => {
        return item._id === id
      })
    })

    const friend = datePageUsers.myPossibleFriends.filter(user => {
      return user === myId.id
    })
    const request = data.filter(user => {
      return user === id
    })
    return loadingOneUser === true ? (
      'loading...'
    ) : (
      <div className='user_page_container'>
        <div>
          <div className='user_profile_block'>
            <img
              className='user_profile_image'
              src={require(`../../../../public/assets/userImg/${datePageUsers.logoUser}`)}
              alt='err'
            />
          </div>
          <div className='info_page'>
            {userData[0][0]._id === id
              ? friendAdd.friends
              : friend[0] === myId.id
              ? friendAdd.delete
              : request[0] === id
              ? friendAdd.addFriends
              : friendAdd.add}
            <button className='addMessage'>Написать сообщение</button>
          </div>
        </div>

        <div className='section_info_user'>
          <div className='user_profile_header'>
            <div className='user_name_block'>{datePageUsers.login}</div>
            <div className='digitField'>
              <div className='friend_number_friends'>
                {dataUserInfo.array.friends.length}
                <div>
                  {dataUserInfo.array.friends.length === 1
                    ? 'друг'
                    : dataUserInfo.array.friends.length === 2 || 3 || 4
                    ? 'друга'
                    : 'друзей'}
                </div>
              </div>
              <div className='friend_number_subscribers'>
                {dataUserInfo.user.myPossibleFriends.length}
                <div>
                  {dataUserInfo.user.myPossibleFriends.length === 1
                    ? 'подписчик'
                    : dataUserInfo.user.myPossibleFriends.length === 2 || 3 || 4
                    ? 'подписчика'
                    : 'подписчика'}
                </div>
              </div>

              <div className='friend_number_subscriptions'>
                {dataUserInfo.user.possibleFriends.length}
                <div>подписки</div>
              </div>
              <div className='friend_number_photo'>
                0 <br />
                фото
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch {
    return (
      <div className='user_page_container'>
        <div className='user_profile_block'>
          <img className='user_profile_image' src={defaultIcon} alt='err' />
        </div>
        <div className='section_info_user'>
          <div className='user_profile_header'>
            <div className='user_name_block'>
              {datePageUsers.login}
              <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FriendsPage
