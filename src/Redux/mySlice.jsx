import { createSlice } from '@reduxjs/toolkit'

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    clientInfo: localStorage.getItem('clientLoginInfo') ? JSON.parse(localStorage.getItem('clientLoginInfo')) : null
  },
  reducers: {
      clientLoginInfo: (state, action) => {
          state.clientInfo = action.payload
      console.log(state.clientInfo)
      console.log(action.payload)
    
    },
  }
})

// Action creators are generated for each case reducer function
export const { clientLoginInfo } = clientSlice.actions

export default clientSlice.reducer