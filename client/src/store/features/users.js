const initialState = {
  isLoading: false,
  dataUserInfo: [],
  getUsers: [],
  infoUser: [],
  MyData: [],
  MyFriendAdd: [],
  friends: [],
  inFriends: false,
  error: null,
  loadingOneUser: false,
  userAvatarImg: '',
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case '/users/getUserDataFriends/fulfilled':
      return {
        ...state,
        dataUserInfo: action.payload,
      }
    case '/users/getDataFriends/fulfilled':
      return {
        ...state,
        friends: action.payload,
      }
    case '/users/MyDataLoad/pending':
      return {
        ...state,
        MyData: [],
        isLoading: true
      }
    case '/users/MyDataLoad/fulfilled':
      return {
        ...state,
        MyData: action.payload,
        isLoading: false
      }
    case '/users/MyFriendData/fulfilled':
      return {
        ...state,
        MyFriendAdd: action.payload,
      }
    case 'users/load/fulfilled':
      return {
        ...state,
        getUsers: action.payload,
      }
    case '/users/loadAvatar/fulfilled':
      return {
        ...state,
        userAvatarImg: action.payload,
      }
    case '/users/oneUser/pending':
      return {
        ...state,
        loadingOneUser: true,
        infoUser: [],
      }

    case '/users/oneUser/fulfilled':
      return {
        ...state,
        loadingOneUser: false,
        infoUser: action.payload,
      }
    case '/users/creatingApplication/pending':
      return {
        ...state,
        inFriends: false,
      }
    case '/users/creatingApplication/fulfilled':
      return {
        ...state,
        inFriends: true,
      }
    case '/users/loadUserInfo/pending':
      return {
        ...state,
        infoUser: [],
      }
    case '/users/loadUserInfo/fulfilled':
      return {
        ...state,
        infoUser: action.payload,
      }

    default:
      return state
  }
}
export const getUserDataFriends = id => {
  return async dispatch => {
    const response = await fetch(`/api/requests/user/info/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    console.log(json)
    dispatch({ type: '/users/getUserDataFriends/fulfilled', payload: json })
  }
}
export const addFriends = id => {
  return async dispatch => {
    await fetch(`/api/requests/sending/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
export const acceptAsFriend = id => {
  return async dispatch => {
    await fetch(`/api/requests/add/friends/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
export const getDataFriends = () => {
  return async dispatch => {
    const response = await fetch(`/api/requests/get/friends`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    dispatch({ type: '/users/getDataFriends/fulfilled', payload: json })
  }
}
export const deleteFriends = id => {
  return async dispatch => {
    await fetch(`/api/requests//delete/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}

export const MyFriendData = () => {
  return async dispatch => {
    dispatch({ type: '/users/MyFriendData/pending' })
    const response = await fetch('/api/requests/data/acquisition', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    dispatch({ type: '/users/MyFriendData/fulfilled', payload: json })
  }
}

export const MyDataLoad = () => {
  return async dispatch => {
    dispatch({ type: '/users/MyDataLoad/pending' })
    const response = await fetch('/api/users/my/data', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })

    const json = await response.json()
    console.log(json)
    dispatch({ type: '/users/MyDataLoad/fulfilled', payload: json })
  }
}

export const loadUsers = () => {
  return async dispatch => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'users/load/fulfilled', payload: data })
      })
  }
}

export const createAvatar = file => {
  return async dispatch => {
    const formData = new FormData()
    formData.append('image', file)
    await fetch('/api/upload/avatar', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData,
    })
  }
}

export const loadUserInfo = () => {
  return async dispatch => {
    dispatch({ type: '/users/loadUserInfo/pending' })
    const response = await fetch('/api/upload/avatar', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()

    dispatch({ type: '/users/loadUserInfo/fulfilled', payload: json })
  }
}

export const oneUser = id => {
  return async dispatch => {
    dispatch({ type: '/users/oneUser/pending' })
    const response = await fetch(`/api/data/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    dispatch({ type: '/users/oneUser/fulfilled', payload: json })
  }
}

export const creatingApplication = id => {
  return async dispatch => {
    dispatch({ type: '/users/creatingApplication/pending' })
    const response = await fetch(`/api/requests/sending/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    dispatch({
      type: '/users/creatingApplication/fulfilled',
      payload: json,
    })
  }
}
