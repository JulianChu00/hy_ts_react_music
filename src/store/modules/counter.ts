import { createSlice } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
    message: 'Hello redux'
  },
  reducers: {
    changeMessages(state, actions) {
      state.message = actions.payload
    }
  }
})
export const { changeMessages } = counterSlice.actions
export default counterSlice.reducer
