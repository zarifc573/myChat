
import React, { useState } from 'react'
import login from '../../assets/login.png'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clientLoginInfo } from '../../Redux/mySlice';


const Login = () => {
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errorEmail,setErrEmail]=useState('')
  const [password, setPassword] = useState('')
  const [errorPassword,setErrPassword]=useState('')
  const [showPassword,setShowPassword]=useState('')
  const [incorrect,setIncorrect]=useState('')
  const [forgotPassword,setForgotPassword]=useState('')

  const handleEmail = (e) => {
    
    setEmail(e.target.value)
    setErrEmail('')
    setIncorrect('')
  }
 
  const handlePassword = (e) => {
    
    setPassword(e.target.value)
    setErrPassword('')
    setIncorrect('')
  }

  
 const signUpBtn = () => {
   if (!email) {
     setErrEmail('The email address must include @') 
   } else {
     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
       setErrEmail()
       setErrEmail('You have entered an invalid email address!')
     }
 }
   
   if (!password) {
       setErrPassword('Enter your password')
       
   } 

   if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(clientLoginInfo(user.user))
        localStorage.setItem('clientLoginInfo', JSON.stringify(clientLoginInfo(user.user)))
      toast('Login successfully done!')
      
        setTimeout(() => {
          navigate('/home')
          setEmail('')
        setPassword('')
        }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode.includes('auth/invalid-login-credentials')) {
        setIncorrect('Incorrect email or password')
        setForgotPassword('Forgot password')
      }
      
    });
   }
  }
  const googleClick = () => {
    signInWithPopup(auth, provider)
      .then(() => {
    console.log('done')
    setTimeout(() => {
      navigate('/home')
    }, 1500);
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
  }

  const clickForgot = () => {
    navigate('/forgotPassword')
  }

  return (
    <div className='flex'>
      <ToastContainer
              position="top-right"
              autoClose={5000}
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

      <div className='w-[50%] flex justify-end'>
              <div className='mr-[69px] mt-[140px]'>
              <h1 className='font-sans font-bold text-[#11175D] text-[35px]'>Login to your account!</h1>
                  
                  <div className="flex items-center justify-center py-[22px] border-[1px] border-[#03014C]-[0.3] w-[220px] rounded-[8.34px] cursor-pointer mt-[30px]"  onClick={googleClick}>
                      <FcGoogle className='w-[20px] h-[20px]'/>
                      <p className='ml-[10px]'>Login with Google</p>
          </div>
          

          {
            incorrect &&
            <p className="leading-[20px] mt-[20px] text-center bg-[#ffdce0] py-[10px] border-red-200 border-[1px] text-[18px] font-nunito font-semibold text-red-400">{incorrect}</p>
          }
          

                  <div className="mt-[62px] relative">
            <input placeholder='Youraddres@email.com' type="email" onChange={handleEmail} className='w-[368px] py-[20px] pr-[65px] border-b-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] placeholder:text-[#03014C] placeholder:font-semibold placeholder:text-opacity-[0.4] placeholder:text-[20px]' />
            {
              errorEmail &&
              <p className='leading-[20px] font-nunito font-semibold text-red-500'>{errorEmail}
              </p>
              
            }

            

              <p className='bg-white absolute top-[-10px] left-[0]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Email Address
            </span></p>
            
              </div>
              
                  <div className="mt-[54px] relative w-[368px]">
                  <input placeholder='Enter your password' type={showPassword? 'text':'password'} onChange={handlePassword
            } className='w-[368px] py-[20px] pr-[65px] border-b-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] placeholder:text-[#03014C] placeholder:font-semibold placeholder:text-[20px] placeholder:text-opacity-[0.4]'  />
            
            {
              errorPassword &&
              <p className='leading-[20px] font-nunito font-semibold text-red-500'>{errorPassword}
              </p>
              
            }

              <p className='bg-white absolute top-[-10px] left-[0]'><span className='text-[#11175D] font-nunito text-[14px] font-semibold tracking-[1px] opacity-[0.7]'>Password
            </span></p>
            {showPassword ? <AiFillEye onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-[17px] text-[#B3B3C9] select-none right-[30px] text-[26px]'/>: <AiFillEyeInvisible onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-[17px] text-[#B3B3C9] select-none right-[30px] text-[26px]'/>}
            <p onClick={clickForgot} className='text-left mt-[35px] text-red-400 font-sans text-[16px] font-normal cursor-pointer'>{forgotPassword}</p>
                  </div>
                  <div className="select-none mt-[52px]  w-[368px] pb-[50px]">
                  <div onClick={signUpBtn} className='text-center py-[20px] bg-primary text-white rounded-[8.5px] border-[1px] border-primary hover:border-[1px] hover:border-primary hover:bg-white hover:text-primary cursor-pointer duration-500'><p className='font-semibold text-[20px] font-nunito select-none'>Login to Continue</p></div>
                  
                  
                      <p className='text-left mt-[35px] text-[#03014C] font-sans text-[13px] font-normal'>Don’t have an account ? <span className='text-[#EA6C00] text-[13px] font-sans font-bold cursor-pointer'><Link to='/registration'>Sign up</Link></span></p>
                      </div>
              </div>
      </div>
          <div className='w-[50%]'>
              <img className='w-full h-screen object-cover' src={login} alt="" />
      </div>

     
    </div>
  )
}

export default Login
