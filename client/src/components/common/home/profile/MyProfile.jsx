import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyDataLoad } from '../../../../store/features/users'
import '../../../../scss/home/interface/my_profile.scss'
import avatarLogo from '../../../../public/assets/avatar.png'
import { API_URL } from '../../../../config'
import cover from '../../../../public/assets/Q7fJnM254V8.jpg'
import photo from '../../../../public/assets/icons8-стопка-фотографий-64.png'
import muz from '../../../../public/assets/icons8-airpods-48.png'
import clips from '../../../../public/assets/icons8-воспроизвести-видео-на-ноутбуке-64.png'
import { NavLink } from 'react-router-dom'
import EditWindow from './EditWindow'
function MyProfile() {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  useEffect(() => {
    dispatch(MyDataLoad)
  }, [dispatch])
  const myDataLoad = useSelector(state => state.users.MyData)
  const isLoading = useSelector(state => state.users.isLoading)
  return isLoading
    ? 'loading'
    : myDataLoad.map(item => {
        return (
          <div className='profile_container'>
            <div className='header_container'>
              <div className='cover_block'>
                <img className='user_cover_image' src={cover} alt='err' />
              </div>
              <div className='info_block'>
                <div className='helper_div'>
                  <div
                    onMouseOver={() => setModal(true)}
                    onMouseOut={() => setModal(false)}
                    className='user_avatar'
                  >
                    <img
                      className='user_profile_image'
                      src={
                        item.logoUser
                          ? `${API_URL + item.logoUser}`
                          : avatarLogo
                      }
                      alt='err'
                    />
                    {modal ? (
                      <EditWindow myAvatar={item.logoUser} />
                    ) : (
                      console.log('a')
                    )}
                  </div>
                </div>
                <div className='user_name_status'>
                  <div className='user_name'>{item.login}</div>
                  <div className='user_status'>не дотянуться до тебя</div>
                </div>
                <div className='block_button'>
                  <button className='button_one'>Редактировать профиль</button>
                  <button className='button_two'>
                    Eще <span className='trait'></span>
                  </button>
                </div>
              </div>
            </div>
            <div className='section_block'>
              <div className='left_block'>
                <div className='photo_gallery'>
                  <div className='category_block'>
                    <ul className='category_gallery'>
                      <li>
                        <div className='profile_icon'>
                          <img className='profile_img' src={photo} alt='err' />
                          <span className='spanText'>Фото</span>
                        </div>
                      </li>
                      <li>
                        <div className='profile_icon'>
                          <img className='profile_img' src={muz} alt='err' />
                          <span className='spanText'>Музыка</span>
                        </div>
                      </li>
                      <li>
                        <div className='profile_icon'>
                          <img className='profile_img' src={clips} alt='err' />
                          <span className='spanText'>Клипы</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='photo'>
                    {[...item.photo]
                      .reverse()
                      .slice(0, 8)
                      .map(photo => {
                        return (
                          <>
                            <NavLink to={photo}>
                              <div key={item} className='photo_container'>
                                <img
                                  className='photo_user'
                                  src={
                                    photo ? `${API_URL + photo}` : avatarLogo
                                  }
                                  alt='err'
                                />
                              </div>
                            </NavLink>
                          </>
                        )
                      })}
                  </div>
                  <div></div>
                </div>
              </div>
              <div className='right_block'></div>
            </div>
          </div>
          // <div className='section_my_profile'>
          //   <div className='user_profile_block'>
          //
          //   </div>
          //   <div className='section_info_user'>
          //     <div className='user_profile_header'>
          //       <div className='user_name_block'>{item.login}</div>
          //       <div className='digitField'>
          //         <div className='friend_number_friends'>
          //           {item.friends.length}
          //           <div>
          //             {item.friends.length === 0
          //               ? 'друзей'
          //               : item.friends.length === 1
          //               ? 'друг'
          //               : item.friends.length === 2 || 3 || 4
          //               ? 'друга'
          //               : 'друзей'}
          //           </div>
          //         </div>
          //         <div className='friend_number_subscribers'>
          //           {item.myPossibleFriends.length}
          //           <div>
          //             {item.myPossibleFriends.length === 0
          //               ? 'подписчиков'
          //               : item.myPossibleFriends.length === 1
          //               ? 'подписчик'
          //               : item.myPossibleFriends.length === 2 || 3 || 4
          //               ? 'подписчика'
          //               : 'подписчиков'}
          //           </div>
          //         </div>
          //         <div className='friend_number_subscriptions'>
          //           {item.possibleFriends.length}
          //           <div>подписки</div>
          //         </div>
          //         <div className='friend_number_photo'>
          //           0 <br />
          //           фото
          //         </div>
          //       </div>
          //     </div>
          //     <div className='my_profile_section'>
          //       <div>Мои фотографии</div>
          //       <div></div>
          //     </div>
          //     <div className='post_form'>что у вас нового ?</div>
          //     <div className='post_wall'>все записи</div>
          //   </div>
          // </div>
        )
      })
}

export default MyProfile
