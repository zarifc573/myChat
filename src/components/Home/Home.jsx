import React from 'react'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
      <div>
          <div className="w-full bg-[#0d084d94] py-[3px]"></div>
          <div className="w-full bg-[#7b00ff73] py-[1px]"></div>
      <div className="w-full bg-primary py-[20px] flex items-center justify-between">
        <div className="w-[50%] ml-[50px] flex items-center">
          <Link to='/'><img src={logo} alt="Logo" className='w-[50px]' /></Link>
          <Link className='text-white ml-[10px] font-semibold font-nunito'>ChatApp</Link>
         </div>
        <div className="flex w-[50%] justify-end">
        <ul className='flex items-center text-white'>
          <li className='font-nunito text-[24px] font-semibold mr-[50px] cursor-pointer hover:underline'><Link className='hover:underline' to='/'>Home</Link></li>
          <li className='font-nunito text-[24px] font-semibold mr-[50px] cursor-pointer hover:underline'><Link to='/login' className='hover:underline'>Login</Link></li>
          <li className='font-nunito text-[24px] font-semibold mr-[50px] cursor-pointer hover:underline'><Link className='hover:underline' to='/registration'>Sign up</Link></li>
        </ul>
       </div>
      </div>
      
    </div>
  )
}

export default Home