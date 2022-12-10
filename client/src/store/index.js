import { configureStore } from '@reduxjs/toolkit'
import authorization from './features/authorization'
import posts from './features/posts'
import users from './features/users'
import messages from './features/messages'

export const store = configureStore({
  reducer: {
    authorization,
    posts,
    users,
    messages,
  },
})
