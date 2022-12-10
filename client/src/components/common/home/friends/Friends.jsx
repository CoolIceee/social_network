import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from '../../../../store/features/users'
import { NavLink } from 'react-router-dom'

function Friends() {
  const friends = useSelector(state => state.users.friends)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  return (
    <div>
      {friends.map(users => {
        return users.friends.map(item => {
          return (
            <>
              <NavLink to={`/${item._id}`}>
                {item.login}
                <br />
              </NavLink>
            </>
          )
        })
      })}
    </div>
  )
}

export default Friends
