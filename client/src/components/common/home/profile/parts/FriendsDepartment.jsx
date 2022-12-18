import React from 'react'
import { useSelector } from 'react-redux'
import './friends.scss'
import { API_URL } from '../../../../../config'
import avatarLogo from '../../../../../public/assets/avatar.png'

function FriendsDepartment(props) {
  const myDataLoad = useSelector(state => state.users.MyData)
  console.log('====================================');
  console.log(myDataLoad);
  console.log('====================================');
  return <div className=''>
    
    {myDataLoad.map(item => {
      return (
        <div>
          <div>Друзья {item.friends.length}</div>
          <div className='friends_container'>
            {item.friends.map(users => {
              return (
                <div className='friend_block'>
                  <div className='display_data'>
                    <div>
                      <img
                        className='friend_profile_image'
                        src={
                          users.logoUser
                            ? `${API_URL + users.logoUser}`
                            : avatarLogo
                        }
                        alt='err'
                      />
                    </div>
                    <div className=''>{users.login}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
  })}</div>
}

export default FriendsDepartment
