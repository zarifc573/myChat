import React from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import grpImg from '../../assets/group.png'
const Friend = () => {
  return (
      <div>
           <div className=' w-[427px] ml-[43px] h-[451px] relative'>


<div className="w-full mt-[56px] rounder-[10px] relative pt-[13px] pb-[21px] rounded-[20px] shadow-custom2">

    <div className="ml-[23px]">
        <div className="w-full relative flex items-center">
            <h2 className='font-poppins font-semibold text-[20px] text-black'>Friends</h2>
            <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary cursor-pointer select-none' />

            {/* <button className='bg-primary px-[18px] rounded-[5px] cursor-pointer py-[6px] ml-auto mr-[30px] text-white font-poppins text-[16px] font-semibold flex items-center'>Create group <FaSquarePlus className='ml-[10px]'/></button> */}



        </div>


        
           
                    
                    <div className="cursor-pointer">
                            <div className="flex mt-[17px] items-center">
                         <img src={grpImg} alt="" />
            <div className="ml-[14px]">
                <p className="text-[18px] font-semibold font-poppins">Raghav</p>
                <p className="text-[14px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Dinner?</p>
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

export default Friend