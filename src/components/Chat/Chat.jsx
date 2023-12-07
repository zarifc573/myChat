import React, { useEffect, useState } from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import swathi from '../../assets/swathi.png'
import image from '../../assets/registry.png'
import Group from '../MsgGroup/Group'
import Friend from '../MsgFriend/Friend'
import { TbTriangleFilled } from "react-icons/tb";
import ModalImage from "react-modal-image";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import moment from 'moment'
const Chat = () => {
  const info = useSelector((state) => state.operatingChatInfo.operator)
  const data = useSelector((state) => state.clientLoginInfo.clientInfo)
  const db = getDatabase();
  const [message, setMessage]= useState('')
  const [messageList, setMessageList]= useState([])
  const saveMessageToLocalStorage = (message) => {
    // Retrieve existing messages from local storage
    const existingMessages = localStorage.getItem('messages')
       ? JSON.parse(localStorage.getItem('messages'))
       : [];
   
    // Add the new message to the existing messages array
    const updatedMessages = [...existingMessages, message];
   
    // Save the updated messages array back to local storage
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
   };
  const handleMsg = (e) => {
    setMessage(e.target.value)
  }
  const handleMsgSend = () => {
    if (message.length > 0) {
        // Save the message to local storage
    saveMessageToLocalStorage(message);
      if (info.status == 'one') {
        set(push(ref(db, 'message/')), {
          message: message,
          senderid: data.uid,
          sendername: data.displayName,
          recieverid: info.id,
          recievername: info.name,
          date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`
        });
      } else {
        
      }
      setMessage('')
}
  }
  useEffect(() => {
    const messageRef = ref(db, 'message/');
    onValue(messageRef, (snapshot) => {
        let arr=[]
      snapshot.forEach((item) => {
        if (
          (item.val().senderid == data.uid && item.val().recieverid == info.id)
          ||
          (item.val().recieverid==data.uid && item.val().senderid==info.id)
        ) {
          
          arr.push({...item.val(), id:item.key})
        }
        })
      setMessageList(arr)
     
    });
}, [])
  
  return (
    <div className="w-[1440px] mx-auto shadow-custom2 px-[20px] py-[10px]">
       <div className='flex'>
      <div className="">
        <LeftBar active='chat' />
      </div>
      <div className="">
        <Group />
        <Friend />
      </div>
      <div className="w-[690px] py-[24px] px-[40px] rounded-[20px] shadow-custom2 ml-[27px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-[75px] w-[75px] rounded-[50%] relative">
              <img src={info.img}  className='shadow-slate-500 w-full h-full' />
              <div className="h-[15px] w-[15px] rounded-[50%] bg-[#00FF75] absolute bottom-0 right-[5px] border-[2px] border-white shadow-drop"></div>
            </div>
            <div className="ml-[33px]">
                <h3 className="text-[24px] font-poppins font-semibold leading-normal">{info.name}</h3>
              <p className='text-[14px] font-poppins font-normal leading-normal'>Online</p>
            </div>
          </div>
          <div className="">
            <PiDotsThreeVerticalBold className='text-[21px] text-primary' />
          </div>
        </div>
        <div className="border-b-[1px] border-[#00000040] mt-[24px]"></div>

        {/* chatting portion */}

          <div className={`pt-[20px] pb-[20px] overflow-y-scroll h-[700px] px-[15px]`}>
          {/* <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">Hey there!</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:01pm</p>
          </div> */}
          {/* <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">How are you doing?</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:01pm</p>
          </div> */}
          {/* me */}
          {/* <div className="py-[30px] text-end">
            <div className="bg-primary relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-white">How are you doing?</p>
              <TbTriangleFilled className='absolute bottom-[-2px] right-[-6px] text-primary' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:12pm</p>
          </div>
          <div className="py-[30px] text-end">
            <div className="bg-primary relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-white">I am good  and how about you?</p>
              <TbTriangleFilled className='absolute bottom-[-2px] right-[-6px] text-primary' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:12pm</p>
          </div> */}
          {/* user */}
          {/* <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">I am doing well. Can we meet up tomorrow?</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:13pm</p>
          </div> */}
          {/* me....image */ }
          {/* <div className="py-[30px] text-end ">
            <div className="inline-block py-[18px] rounded-[10px]">
              
              <ModalImage
                small={image}
                large={image}
                className=' w-[300px]  '
              />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:14pm</p>
          </div>
          <div className="py-[30px] text-end">
            <div className="bg-primary relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-white">Sure!</p>
              <TbTriangleFilled className='absolute bottom-[-2px] right-[-6px] text-primary' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:14pm</p>
          </div> */}
            {
              messageList.map((item) => (
                item.senderid == data.uid ?
                     <div className="py-[30px] text-end">
                <div className="bg-primary relative inline-block leading-[20px] py-[18px] px-[56px] rounded-[10px]">
                  <p className="font-poppins text-[16px] font-medium text-white">{item.message}</p>
                  <TbTriangleFilled className='absolute bottom-[-2px] right-[-6px] text-primary' />
                </div>
                    <p className="text-[12px] mt-[10px] font-medium font-poppins text-[#00000040] leading-normal">
                      {
                       moment(item.date, "YYYYMMDD hh:mm:ss").fromNow()
                    }
                </p>
                  </div>
               
                  :
                  <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">{item.message}</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
                    <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">
                    {
                       moment(item.date, "YYYYMMDD hh:mm:ss a").fromNow()
                    }
            </p>
          </div>
                // user
                
              ))
           }
               
            
         
            <div className="border-b-[1px] border-[#00000040] mt-[24px]"></div>
            {/* input & send */}
         
        </div>
        <div className="relative flex items-center mt-[30px]">
          <input value={message} onChange={handleMsg} type="text" placeholder={`Type a message...`} className="w-[537px] h-[45px] bg-[#F1F1F1] pl-[30px] rounded-[10px] outline-none" />
              <div className="flex justify-end items-center absolute gap-x-[10px] right-[80px]  ">
              <MdOutlineEmojiEmotions className=' text-[#707070] text-[24px] cursor-pointer' />
          <CiCamera className=' text-[#707070] text-[26px] cursor-pointer' />
          </div>
          
          <button onClick={handleMsgSend} className='h-[43px] w-[49px] flex justify-center items-center ml-[20px]  text-center bg-primary rounded-[10px]'><RiSendPlaneFill className='text-white text-[20px] ' /></button>
          
        </div>
       
      </div>


    </div>
   </div>
  )
}

export default Chat