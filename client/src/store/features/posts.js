const initialState = {
  UserPosts: [],
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case 'get/getPost/fulfilled':
      return {
        ...state,
        UserPosts: action.payload,
      }
    case 'add/text':
      return {
        ...state,
        UserPosts: [action.payload, ...state.UserPosts],
      }
    default:
      return state
  }
}
export const getPosts = () => {
  return dispatch => {
    dispatch({ type: 'get/getPost/pending' })
    fetch('http://localhost:7777/api/posts')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'get/getPost/fulfilled', payload: data })
      })
  }
}
export const postText = text => {
  return async dispatch => {
    dispatch({ type: 'post/postText/pending' })
    await fetch('http://localhost:7777/api/posts/add', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
