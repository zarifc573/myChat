import React from 'react'
import { LuSearch } from 'react-icons/lu'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import grpImg from '../../assets/group.png'
import { FaSquarePlus } from "react-icons/fa6";
const Group = () => {
  return (
      <div>
           <div className=' w-[427px] ml-[43px] h-[451px] relative'>


<div className="relative w-full">
    <input type="text" placeholder='Search' className='py-[18px] pl-[78px] placeholder:pr-[292px] outline-none rounded-[20px] placeholder:text-[#3D3D3D59] font-poppins text-[16px] font-medium w-full shadow-custom2 mt-[10px] ' />
    <LuSearch className='absolute top-[57%] left-[23px] text-[19px] translate-y-[-50%]' />
    <PiDotsThreeVerticalBold className='absolute top-[57%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />
</div>

<div className="w-full mt-[56px] rounder-[10px] relative pt-[13px] pb-[21px] rounded-[20px] shadow-custom2">

    <div className="ml-[23px]">
        <div className="w-full relative flex items-center">
            <h2 className='font-poppins font-semibold text-[20px] text-black'>Groups</h2>
            <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary cursor-pointer select-none' />

            {/* <button className='bg-primary px-[18px] rounded-[5px] cursor-pointer py-[6px] ml-auto mr-[30px] text-white font-poppins text-[16px] font-semibold flex items-center'>Create group <FaSquarePlus className='ml-[10px]'/></button> */}


        </div>


                    <div className="">
                            <div className="flex mt-[17px] items-center">
                         <img src={grpImg} alt="" />
            <div className="ml-[14px]">
                <p className="text-[18px] font-semibold font-poppins">groupname</p>
                <p className="text-[14px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">grouptitle</p>
            </div>
            {/* <div className="bg-primary px-[22px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                <p className='text-white font-poppins text-[20px] font-semibold'>Join</p>
            </div> */}
                        </div>
                        <div className="border-b-[2px] mx-[20px] py-[7px]"></div>
                     </div>
                   
            
           
        </div>

    </div>
   



</div>
    </div>
  )
}

export default Group