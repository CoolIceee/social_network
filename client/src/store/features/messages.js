const initialState = {
  dataChats: [],
  messages: [],
  OneChatId: [],
  loadingOneChat: false,
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case 'getChats/message/pending':
      return {
        ...state,
        dataChats: [],
      }
    case 'getChats/message/fulfilled':
      return {
        ...state,
        dataChats: action.payload,
      }

    case 'oneChat/message/pending':
      return {
        ...state,
        OneChatId: [],
        messages: []
      }
    case 'oneChat/message/fulfilled':
      return {
        ...state,
        OneChatId: action.payload.OneChat,
        messages: action.payload.mess,
      }
    case 'get/message/chat':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    default:
      return state
  }
}

export const getChats = () => {
  return async dispatch => {
    dispatch({ type: 'getChats/message/pending' })
    const response = await fetch(`/api/message/get`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()

    dispatch({ type: 'getChats/message/fulfilled', payload: json })
  }
}

export const oneChat = ChatIdUrl => {
  return async dispatch => {
    dispatch({ type: 'oneChat/message/pending' })
    const response = await fetch(`/api/message/get/one/${ChatIdUrl}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()

    dispatch({ type: 'oneChat/message/fulfilled', payload: json })
  }
}

export const createMessage = (message, roomId, id) => {
  return async dispatch => {
    dispatch({ type: 'createMessage/message/pending' })
    await fetch(`/api/message/create/${roomId}/${id}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
