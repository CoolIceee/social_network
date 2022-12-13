import Name from './Name/Name'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import defaultIcon from '../../../../public/assets/avatar.png'
import { API_URL } from '../../../../config'
function Profile() {
  const token = useSelector(state => state.authorization.token)
  const [openBar, setOpenBar] = useState(false)
  const MyData = useSelector(state => state.users.MyData)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClickLogOut = async () => {
    localStorage.removeItem('token')
    dispatch({ type: 'authorization/singOut/fulfilled' })
    navigate('/SingIn')
  }

  const handleClickExit = () => {
    setOpenBar(false)
  }

  document.body.addEventListener('click', handleClickExit)

  const avatar = MyData.logoUser ? `${API_URL + MyData.logoUser}` : defaultIcon

  if (!token) {
    return (
      <div className='section_profile'>
        <NavLink to='/SingIn' className='profile'>
          <Name />
          <div className='styling_profile'>
            <div className='profile_svg'>
              <img className='profile_img' src={defaultIcon} alt='err' />
            </div>
          </div>
        </NavLink>
      </div>
    )
  }
  return (
    <div onClick={e => e.stopPropagation()} className='section_profile'>
      <div onClick={() => setOpenBar(!openBar)} className='profile'>
        <Name />
        <div className='styling_profile'>
          <div className='profile_svg'>
            <img className='profile_img' src={avatar} alt='err' />
          </div>
        </div>
      </div>
      <div className={'bottom_bar_' + (openBar ? 'open' : 'exit')}>
        <button onClick={handleClickLogOut}>выход</button>
      </div>
    </div>
  )
}
export default Profile
