import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import MyProfileIcon from '../../../public/assets/icons8-пользователь-мужчина-в-кружке-48 (2).png'
import newsIcon from '../../../public/assets/icons8-лента-новостей-48.png'
import friendsIcon from '../../../public/assets/icons8-группа-пользователей,-мужчины-48.png'
import messageIcon from '../../../public/assets/icons8-чат-48.png'
import { MyDataLoad } from '../../../store/features/users'

function NavBar() {
  const token = useSelector(state => state.authorization.token)
  const name = jwtDecode(token)
  const dispatch = useDispatch()
  const handleClickDataProfile = () => {
      dispatch(MyDataLoad())
  }
  return (
    <div className='navbar'>
      <div className='container_navbar'>
        <ol className='navigation_bar'>
          <div className='section_level'>
            <li className='levels'>
              <NavLink
                onClick={handleClickDataProfile}
                className='levels_links'
                to={`${name.login}`}
              >
                <div className='friends_icon'>
                  <img className='friends_img' src={MyProfileIcon} alt='err' />
                </div>
                <div className='text_name_nav'>Мой профиль</div>
              </NavLink>
            </li>
          </div>
          <div className='section_level'>
            <li className='levels'>
              <NavLink className='levels_links' to='/'>
                <div className='friends_icon'>
                  <img className='friends_img' src={newsIcon} alt='err' />
                </div>
                <div className='text_name_nav'>Новости</div>
              </NavLink>
            </li>
          </div>
          <div className='section_level'>
            <li className='levels'>
              <NavLink className='levels_links' to={'messages'}>
                <div className='friends_icon'>
                  <img className='friends_img' src={messageIcon} alt='err' />
                </div>
                <div className='text_name_nav'>Сообщения</div>
              </NavLink>
            </li>
          </div>
          <div className='section_level'>
            <li className='levels'>
              <NavLink className='levels_links' to='friends'>
                <div className='friends_icon'>
                  <img className='friends_img' src={friendsIcon} alt='err' />
                </div>
                <div className='text_name_nav'>Друзья</div>
              </NavLink>
            </li>
          </div>
        </ol>
      </div>
    </div>
  )
}

export default NavBar
