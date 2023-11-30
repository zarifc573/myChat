import React, { useState } from 'react'
import {AiFillMessage} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {BiSolidCloudUpload} from 'react-icons/bi'
import {SlSettings} from 'react-icons/sl'
import { VscSignOut } from 'react-icons/vsc'
import {SlHome} from 'react-icons/sl'
import userImg from '../../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux'



const LeftBar = ({active}) => {
  const data = useSelector(state => state.clientLoginInfo.clientInfo)
  console.log(data);
  const dispatch = useDispatch()
  const auth = getAuth();
    const navigate = useNavigate()
    const backToLogin = () => {
        signOut(auth).then(() => {
          
          setTimeout(() => {
            navigate('/login')
           dispatch(clientLoginInfo(null))
         
            },1000)
            
        }).catch((error) => {
        });
  }
  
  
  const handleUploadImg = () => {
    navigate('/uploadIMG')
  }
  const handleHome = () => {
    navigate('/home')
  }
  const handleChat = () => {
    navigate('/chat')
  }


   
  return (
      <div className=''>
           <div className=' bg-white relative'>  
        <div className="flex ">
          <div className="bg-primary w-[186px] pb-[47px] rounded-lg ">
            <div className="relative group h-[100px] w-[100px] mx-auto">
              <img src={data.photoURL} alt="" className='mx-auto mt-[38px] h-[100px] w-[100px] rounded-full' />
              <h2 className="mx-auto text-center capitalize mt-[8px] font-nunito font-semibold text-[24px] text-white ">{data.displayName}</h2>
              <div onClick={handleUploadImg} className="group-hover:opacity-100 opacity-0 duration-300 gr bg-[#00000069] w-full h-full rounded-[50%] absolute top-0 left-0 flex justify-center items-center cursor-pointer">
                <BiSolidCloudUpload className='text-white text-[25px]'/>
            </div>
            </div>
            <div onClick={handleHome} className={`relative after:absolute after:content-[''] after:w-full after:h-full after:top-0 after:left-[25px] after:z-[-1] z-[1] overflow-hidden py-[23px] after:rounded-[20px] mt-[78px] ${active == 'home' && 'after:bg-white before:absolute before:w-[8px] before:h-full before:bg-primary before:content-[""] before:rounded-s-[25px] before:top-0 before:right-0 before:shadow-custom'} select-none`}>
                <SlHome className={`mx-auto text-[44px] ${active=='home' ? 'text-primary' : 'text-white'} cursor-pointer`} />
                
              </div>
              
            <div onClick={handleChat} className={`relative after:absolute after:content-[''] after:w-full after:h-full after:top-0 after:left-[25px] after:z-[-1] z-[1] overflow-hidden py-[23px] after:rounded-[20px] ${active == 'chat' && 'after:bg-white before:absolute before:w-[8px] before:h-full before:bg-primary before:content-[""] before:rounded-s-[25px] before:top-0 before:right-0 before:shadow-custom'} select-none  mt-[57px]`} >
              <AiFillMessage className={`mx-auto text-[46px] ${active=='home' ? 'text-[#BAD1FF]' : 'text-primary'}  cursor-pointer`} />
              </div>
              <IoMdNotificationsOutline className='mx-auto text-[50px] text-[#FFFFFFB2] mt-[82px] cursor-pointer'/>
                <SlSettings className='mx-auto text-[44px] text-[#FFFFFFB2] mt-[82px] cursor-pointer' />
                
              <VscSignOut onClick={backToLogin} className='mx-auto text-[44px] text-white mt-[180px] cursor-pointer'/>


              </div>
        </div>
      </div>
      
   
    </div>
  )
}

export default LeftBar