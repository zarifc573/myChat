import { configureStore } from '@reduxjs/toolkit'
import  clientSlice  from './Redux/mySlice'
import chatBoxSlice from './Redux/chatBoxSlice'



export default configureStore({
  reducer: {
    clientLoginInfo: clientSlice,
    operatingChatInfo : chatBoxSlice
  }
})