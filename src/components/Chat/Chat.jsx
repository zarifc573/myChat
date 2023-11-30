import React from 'react'
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
const Chat = () => {
  return (
    <div className='flex justify-center'>
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
              <img src={swathi} className='shadow-slate-500 w-full h-full' />
              <div className="h-[15px] w-[15px] rounded-[50%] bg-[#00FF75] absolute bottom-0 right-[5px] border-[2px] border-white shadow-drop"></div>
            </div>
            <div className="ml-[33px]">
              <h3 className="text-[24px] font-poppins font-semibold leading-normal">Swathi</h3>
              <p className='text-[14px] font-poppins font-normal leading-normal'>Online</p>
            </div>
          </div>
          <div className="">
            <PiDotsThreeVerticalBold className='text-[21px] text-primary' />
          </div>
        </div>
        <div className="border-b-[1px] border-[#00000040] mt-[24px]"></div>

        {/* chatting portion */}

        <div className="pt-[20px] pb-[50px] overflow-y-scroll h-[700px] px-[15px]">
          <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">Hey there!</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:01pm</p>
          </div>
          <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">How are you doing?</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:01pm</p>
          </div>
          {/* me */}
          <div className="py-[30px] text-end">
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
          </div>
          {/* user */}
          <div className="py-[30px]">
            <div className="bg-[#F1F1F1] relative inline-block py-[18px] px-[56px] rounded-[10px]">
              <p className="font-poppins text-[16px] font-medium text-black">I am doing well. Can we meet up tomorrow?</p>
              <TbTriangleFilled className='absolute bottom-[-2px] left-[-6px] text-[#F1F1F1]' />
            </div>
            <p className="text-[12px] font-medium font-poppins text-[#00000040] leading-normal">Today, 2:13pm</p>
          </div>
          {/* me */}
          <div className="py-[30px] text-end ">
            <div className="inline-block text-end py-[18px] px-[56px] rounded-[10px]">
              
              <ModalImage
                small={image}
                large={image}
                className='h-[400px]  '
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
          </div>
          <div className="border-b-[1px] border-[#00000040] mt-[24px]"></div>

        </div>
        {/* input / send */}
        <div className="relative flex items-center">
          <input type="text" placeholder={`Type a message...`} className="w-[537px] h-[45px] bg-[#F1F1F1] pl-[30px] rounded-[10px] outline-none" />
          <MdOutlineEmojiEmotions className='absolute top-[13px] right-[130px] text-[#707070] text-[20px]' />
          <CiCamera className='absolute top-[13px] right-[100px] text-[#707070] text-[20px]' />
          
          <button className='h-[45px] w-[45px] flex justify-center items-center ml-[20px]  text-center bg-primary rounded-[10px]'><RiSendPlaneFill className='text-white text-[20px] ' /></button>
          
        </div>
      </div>


    </div>
  )
}

export default Chat