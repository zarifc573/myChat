import { configureStore } from '@reduxjs/toolkit'
import  clientSlice  from './Redux/mySlice'



export default configureStore({
  reducer: {
    clientLoginInfo: clientSlice
  }
})