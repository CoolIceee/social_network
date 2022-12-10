import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadUsers } from '../../../../store/features/users'

function Input() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])
  const getUsers = useSelector(state => state.users.getUsers)
  const [values, setValues] = useState('')
  const [open, setOpen] = useState(false)

  const handleClickExit = () => {
    setOpen(false)
  }
  document.body.addEventListener('click', handleClickExit)

  const users = getUsers.filter(use => {
    return use.login.toLowerCase().includes(values.toLowerCase())
  })
  return (
    <form onClick={e => e.stopPropagation()} className='search'>
      <div className='styling'>
        <div className='entrails' onClick={() => setOpen(true)}>
          <input
            className='search_input'
            type='text'
            placeholder='Поиск'
            onChange={e => setValues(e.target.value)}
          />
        </div>
        <div className={'user_search_block_' + (open ? 'open' : 'exit')}>
          {users.map(id => {
            return (
              <div>
                <NavLink to={`/${id._id}`} onClick={() => setOpen(false)}>
                  {id.login}
                </NavLink>
              </div>
            )
          })}
        </div>
      </div>
    </form>
  )
}

export default Input
