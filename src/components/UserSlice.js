import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    name: 'Harsh Jain',
    email: 'harsh8425@gmail.com',
    phone: 8251087474,
    id: 3,
  },
  {
    name: 'asdasfab',
    email: 'uiii@qwer.com',
    phone: 8888888888,
    id: 5,
  },
]
const userSlice = createSlice({
  name: 'users',
  initialState,
})

export default userSlice.reducer
