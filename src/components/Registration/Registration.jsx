
import React, { useState } from 'react'
import regImg from '../../assets/registry.png'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, set, ref } from "firebase/database";

const Registration = () => {
  const navigate =useNavigate()
  const db = getDatabase();
  const auth = getAuth();
  const [email, setEmail] = useState('')
  const [errorEmail,setErrEmail]=useState('')
  const [fullName, setFullName] = useState('')
  const [errorFullName,setErrFullName]=useState('')
  const [password, setPassword] = useState('')
  const [errorPassword,setErrPassword]=useState('')
  const [showPassword,setShowPassword]=useState('')
  // const [registerSuccess,setRegisterSuccess]=useState('')

  const handleEmail = (e) => {
    
    setEmail(e.target.value)
    setErrEmail('')
  }
  const handleFullName = (e) => {
    
    setFullName(e.target.value)
    setErrFullName('')
  }
  const handlePassword = (e) => {
    
    setPassword(e.target.value)
    setErrPassword('')
  }

  
 const signUpBtn = () => {
   if (!email) {
     setErrEmail('The email address must include @') 
   } else {
     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
       setErrEmail('You have entered an invalid email address!')
     }
     
 }
   if (!fullName) {
   setErrFullName('Enter your name please')
 }
   if (!password) {
   setErrPassword('Enter your password')
   }
   if (email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL: "./src/assets/user.png"
        }).then(() => {
          sendEmailVerification(auth.currentUser)
      .then(() => {
        toast('Complete registration, now verify your account')
   console.log(user)
        setEmail('')
        setFullName('')
        setPassword('')
        setTimeout(() => {
          navigate('/login')
        },3000 );
      });
        }).then(() => {
          set(ref(db, 'users/' + user.user.uid), {
            username: user.user.displayName,
            email: user.user.email,
          });
        
    })
   
      })
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode.includes('auth/email-already-in-use')) {
      setErrEmail('The Email Address you entered does not appear to be valid.')
    }
    // ..
  });
  }
}

  return (
    <div className='flex'>
      <div className='w-[50%] flex justify-end'>
              <div className='mr-[69px] mt-[140px]'>
              <h1 className='font-nunito font-bold text-[#11175D] text-[35px]'>Get started with easily register</h1>
                  <p className='text-[#808080] font-nunito text-[20px] font-normal mt-[26px]'>Free register <span className='opacity-[0.5]'>and</span> you can enjoy it</p>
          {/* {registerSuccess &&
            <p className='text-white bg-green-600 py-4 text-center rounded-[4px] font-nunito text-[20px] font-normal mt-[26px] ease-linear'>{registerSuccess}</p>
          } */}
          <ToastContainer
              position="top-right"
              // autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
          <ToastContainer />

                  <div className="mt-[62px] relative">
            <input type="email" value={email} onChange={handleEmail} className='w-[368px] py-[20px] pl-[52px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px]' />
            {
              errorEmail &&
              <p className='leading-[20px] mt-[10px] font-nunito font-semibold text-red-500'>{errorEmail}
              </p>
              
            }
              <p className='bg-white px-[16px] absolute top-[-10px] left-[36px]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Email Address
            </span></p>
            
              </div>
                  <div className="mt-[54px] relative">
            <input type="text" value={fullName} onChange={handleFullName
            } className='w-[368px] py-[20px] pl-[52px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px]' />

            {
              errorFullName &&
              <p className='leading-[20px] mt-[10px] font-nunito font-semibold text-red-500'>{errorFullName}
              </p>
              
            }

              <p className='bg-white px-[16px] absolute top-[-10px] left-[36px]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Full name
            </span></p>
              </div>
                  <div className="mt-[54px] relative w-[368px]">
                  <input type={showPassword? 'text':'password'} value={password} onChange={handlePassword
            } className='w-[368px] py-[20px] pl-[52px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px]' />
            
            {
              errorPassword &&
              <p className='leading-[20px] mt-[10px] font-nunito font-semibold text-red-500'>{errorPassword}
              </p>
              
            }

              <p className='bg-white px-[16px] absolute top-[-10px] left-[36px]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Password
            </span></p>
            {showPassword ? <AiOutlineEye onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-[30px] right-[30px] opacity-[0.6] cursor-pointer select-none'></AiOutlineEye>: <AiOutlineEyeInvisible onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-[30px] right-[30px] opacity-[0.6] cursor-pointer select-none'></AiOutlineEyeInvisible>}
            
                  </div>
                  <div className=" mt-[52px]  w-[368px]">
                  <div onClick={signUpBtn} className='text-center py-[20px] bg-primary text-white rounded-[86px] border-[1px] border-primary hover:border-[1px] hover:border-primary hover:bg-white hover:text-primary cursor-pointer duration-500'>
                    <p className='font-semibold text-[20px] font-nunito select-none'>Sign up</p>
                  </div>
                  
                      <p className='text-center mt-[35px] text-[#03014C] font-sans text-[13px] font-normal'>Already  have an account ? <span className='text-[#EA6C00] text-[13px] font-sans font-bold cursor-pointer'><Link to='/login'>Sign In</Link></span></p>
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
