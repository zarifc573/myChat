import { createSlice } from '@reduxjs/toolkit'

export const chatBoxSlice = createSlice({
  name: 'operatingChat',
  initialState: {
    operator : localStorage.getItem('operatingChatInfo') ? JSON.parse(localStorage.getItem('operatingChatInfo'))
      :
      null
  },
  reducers: {
    operatingChatInfo: (state, action) => {
          state.operator = action.payload
    
    },
  }
})

// Action creators are generated for each case reducer function
export const { operatingChatInfo } = chatBoxSlice.actions

export default chatBoxSlice.reducer