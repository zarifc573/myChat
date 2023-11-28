import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import LeftBar from '../LeftBar/LeftBar'
import GroupList from '../GroupList/GroupList'
import FriendReq from '../FriendRequest/FriendReq'
import Friends from '../Friends/Friends'
import MyGroups from '../MyGroups/MyGroups'
import UserList from '../UserList/Userlist'
import BlockUsers from '../BlockUsers/BlockUsers'
import { clientLoginInfo } from '../../Redux/mySlice'

const User = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector(state => state.clientLoginInfo.clientInfo)
  console.log(data)
  const [verify, setVerify] = useState(null)


  useEffect(() => {
    if (!data) {
      navigate('/login')
      
    }
  }, [])
  
  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user.emailVerified) {
      setVerify(true)
      dispatch(clientLoginInfo(user))
      localStorage.setItem('clientLoginInfo', JSON.stringify(clientLoginInfo(user)))
    }
    else {
      setVerify(false)
   }
   
  });

  if (verify === null) {
  return <div>Loading...</div>
}

  return (
    <div>
      {
        verify
          ?
          <div className='flex justify-center items-center'>
            
            <LeftBar />
            
            <div className="ml-[-20px]">
              <GroupList />
              <FriendReq/>
            </div>
            <div className="ml-[-10px]">
              <Friends/>
              <MyGroups/>
            </div>
            <div className="ml-[-6px]">
              <UserList />
              <BlockUsers/>
            </div>
            
         </div>
          :
          <div className='h-screen pt-[30px] bg-cyan-700 text-center'>
          <p className='font-nunito text-[36px] font-semibold text-white pt-[50px]'>Please verify your email</p>
          <button className='text-center py-[16px] bg-cyan-600 text-white rounded-[8.5px] text-[16px] border-[1px] border-white px-[30px] hover:bg-white hover:text-cyan-700 hover:border-white hover:border-[1px] cursor-pointer duration-200 font-semibold mt-[50px]'><Link to='/login'>Back to login</Link></button>
        </div>
         
      }
    
    </div>
  )
}

export default User