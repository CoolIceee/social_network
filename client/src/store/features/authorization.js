import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  siningUp: false,
  siningIn: false,
  errorIn: null,
  errorUp: null,
  message: null,
  token: localStorage.getItem('token'),
}

export const userCreate = createAsyncThunk(
  'create/auth',
  async ({ email, login, password }, thunkAPI) => {
    try {
      const res = await axios.post('/api/users/register', {
        email,
        login,
        password,
      })
      localStorage.setItem('token', res.data.token)
      return thunkAPI.fulfillWithValue(res.data)
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)
export const userLogin = createAsyncThunk(
  'login/auth',
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await axios.post('/api/users/login', {
        login,
        password,
      })
      console.log(res)
      localStorage.setItem('token', res.data.token)
      return thunkAPI.fulfillWithValue(res.data)
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
      console.log(error)
    }
  }
)

const authorization = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.siningIn = true
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.errorIn = action.payload
        state.siningIn = false
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.siningIn = false
        state.token = action.payload.token
      })

      .addCase(userCreate.pending, (state, action) => {
        state.siningUp = true
      })
      .addCase(userCreate.rejected, (state, action) => {
        state.errorUp = action.payload
        state.siningUp = false
      })
      .addCase(userCreate.fulfilled, (state, action) => {
        state.siningUp = false
        state.token = action.payload.token
      })
      .addCase('authorization/singOut/fulfilled', (state, action) => {
        state.token = null
      })
  },
})

export default authorization.reducer
