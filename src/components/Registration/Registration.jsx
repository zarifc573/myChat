import React from 'react'
import regImg from '../../assets/registry.png'

const Registration = () => {
  return (
    <div className='flex'>
      <div className='w-[50%] flex justify-end'>
              <div className='mr-[69px] mt-[140px]'>
              <h1 className='font-nunito font-bold text-[#11175D] text-[35px]'>Get started with easily register</h1>
                  <p className='text-[#808080] font-nunito text-[20px] font-normal mt-[26px]'>Free register <span className='opacity-[0.5]'>and</span> you can enjoy it</p>
                  
                  <div className="mt-[62px] relative">
                  <input type="text" className='w-[368px] py-[20px] pl-[52px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px]'/>
              <p className='bg-white px-[16px] absolute top-[-10px] left-[36px]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Email Address
            </span></p>
              </div>
                  <div className="mt-[54px] relative">
                  <input type="text" className='w-[368px] py-[20px] pl-[52px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px]'/>
              <p className='bg-white px-[16px] absolute top-[-10px] left-[36px]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Ful name
            </span></p>
              </div>
                  <div className="mt-[54px] relative">
                  <input type="password" className='w-[368px] py-[20px] pl-[52px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px]'/>
              <p className='bg-white px-[16px] absolute top-[-10px] left-[36px]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Password
            </span></p>
                  </div>
                  <div className=" mt-[52px]  w-[368px]">
                  <div className='text-center py-[20px] bg-primary text-white rounded-[86px] border-[1px] border-primary hover:border-[1px] hover:border-primary hover:bg-white hover:text-primary cursor-pointer duration-500'><a href="" className='font-semibold text-[20px] font-nunito'>Sign up</a></div>
                  
                      <p className='text-center mt-[35px] text-[#03014C] font-sans text-[13px] font-normal'>Already  have an account ? <span className='text-[#EA6C00] text-[13px] font-sans font-bold cursor-pointer'>Sign In</span></p>
                      </div>
              </div>
      </div>
          <div className='w-[50%]'>
              <img className='w-full h-screen object-cover' src={regImg} alt="" />
      </div>
    </div>
  )
}

export default Registration
