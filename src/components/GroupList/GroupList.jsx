import React, { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import grpImg from '../../assets/group.png'
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'

const GroupList = () => {
    const [category, setCategory] = useState(false)
    const [groupPage, setGroupPage] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [groupErrName, setGroupErrName] = useState('')
    const [groupTitle, setGroupTitle] = useState('')
    const [groupErrTitle, setGroupErrTitle] = useState('')
    const [groupEmpty, setGroupEmpty] = useState('')
    const [allGroupList, setAllGroupList] = useState([])
    const data = useSelector((state) => state.clientLoginInfo.clientInfo)
    const db = getDatabase();
    useEffect(() => {
        const userRef = ref(db, 'mygrouplist/');
        onValue(userRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
              if (data.uid != item.val().hostid) {
                arr.push(item.val())
                }
            })
            setAllGroupList(arr)
        });
    }, [])
    const handleThreeDot = () => {
        setCategory(!category)

    }
    const handleCreateGroup = () => {
        setGroupPage(true)
        setCategory(false)
    }
    
    const handleCancelBtn = () => {
        setGroupPage(false)
        setGroupErrName('')
        setGroupErrTitle('')
        setGroupName('')
        setGroupTitle('')
        setGroupEmpty('')
    }
    const handleGroupName = (e) => {
        setGroupName(e.target.value)
        setGroupErrName('')
        setGroupEmpty('')
    }
    const handleGroupTitle = (e) => {
        setGroupTitle(e.target.value)
        setGroupErrTitle('')
        setGroupEmpty('')
    }
    const handleCreateBtn = () => {
        
     
        // if (!groupName && !groupTitle) {
          
          
        // }
           
            
       
        if (groupName && groupTitle) {
            set(push(ref(db, 'mygrouplist/')), {
                groupname: groupName,
                grouptitle: groupTitle,
                hostname: data.displayName,
                hostid: data.uid
            })
            setGroupErrName('')
            setGroupErrTitle('')
            setGroupName('')
            setGroupTitle('')
            setGroupEmpty('')
            setTimeout(() => {
                setGroupPage(false)
            }, 1000)
        } else {
            
            if (!groupName) {
                setGroupErrName('Please give a name to the group')
                setGroupEmpty('')
            } 
            if (!groupTitle) {
                setGroupErrTitle('Fill the box with a title')
                setGroupEmpty('')
            }
            if (!groupName && !groupTitle) {
                setGroupEmpty('Please fill the boxes below with a name')
            setGroupErrName('')
            setGroupErrTitle('')
            }
        }
    }

    const handleSideClick = () => {
        setCategory(false)
    }
    return (
        <div className='relative'>
            {
                groupPage &&

                <div className='bg-black bg-opacity-[0.5] backdrop-blur-[5px] w-full h-full fixed top-0 left-0 z-50 flex justify-center '>
                    <div className="bg-white w-[600px] h-[600px] rounded-lg shadow-black drop-shadow-lg mt-[100px] ">
                        <div className="text-center py-[80px]">
                            <h2 className="text-primary font-poppins text-[24px] font-semibold">New Group</h2>
                            {
                                groupErrName &&
                                <p className="leading-[20px] mt-[30px] text-center bg-[#ffdce0] py-[10px] border-red-200 border-[1px] text-[18px] font-nunito font-semibold text-red-400 w-[410px] mx-auto mb-[-30px]">{groupErrName}</p>
                            }
                            {
                                groupErrTitle &&
                                <p className="leading-[20px] mt-[30px] text-center bg-[#ffdce0] py-[10px] border-red-200 border-[1px] text-[18px] font-nunito font-semibold text-red-400 w-[410px] mx-auto mb-[-30px]">{groupErrTitle}</p>
                            }
                            {
                                groupEmpty &&
                                <p className="leading-[20px] mt-[30px] text-center bg-[#ffdce0] py-[10px] border-red-200 border-[1px] text-[18px] font-nunito font-semibold text-red-400 w-[410px] mx-auto mb-[-30px]">{groupEmpty}</p>
                            }
                            <input value={groupName} onChange={handleGroupName} placeholder='Your group name' className='w-[400px] py-[17px] pl-[30px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px] mt-[60px]' />
                            <input value={groupTitle} onChange={handleGroupTitle} placeholder='Your group title' className='w-[400px] py-[17px] pl-[30px] pr-[65px] border-[2px] outline-0 text-[#11175D] border-[#11175D] border-opacity-[0.3] rounded-[8.6px] mt-[20px]' />
                        </div>
                        <div className="flex justify-center mt-[-20px] items-center gap-x-[30px]">
                            <button className='text-white bg-primary px-[40px] rounded-[5px] cursor-pointer py-[12px] font-poppins text-[18px] font-semibold hover:bg-indigo-800 hover:text-[24px] duration-300 ' onClick={handleCreateBtn}>Create</button>
                            <button className='text-white bg-red-500 px-[40px] rounded-[5px] cursor-pointer py-[12px] font-poppins tex18[20px] font-semibold hover:bg-red-600 hover:text-[24px] duration-300 ' onClick={handleCancelBtn}>Cancel</button>
                        </div>



                    </div>
                </div>

            }

            {/* Menu-item */}
            {
                category &&
                <div className="absolute top-[150px] left-[460px] z-30 w-[200px] border-[1px] border-opacity-[0.2] bg-white border-black flex flex-col items-center justify-center rounded-md ">
                    <button onClick={handleCreateGroup} className="font-poppins flex items-center font-semibold text-[20px] text-black text-opacity-[0.7] hover:bg-primary hover:w-full justify-center hover:text-white duration-300 w-full  my-[10px]">Create group <FaSquarePlus className='ml-[10px]' /></button>
                    <button className="font-poppins flex items-center font-semibold text-[20px] text-black text-opacity-[0.7] hover:bg-primary hover:w-full justify-center hover:text-white duration-300 w-full  my-[10px]">Item1</button>
                    <button className="font-poppins flex items-center font-semibold text-[20px] text-black text-opacity-[0.7] hover:bg-primary hover:w-full justify-center hover:text-white duration-300 w-full  my-[10px]">Item1</button>
                    <button className="font-poppins flex items-center font-semibold text-[20px] text-black text-opacity-[0.7] hover:bg-primary hover:w-full justify-center hover:text-white duration-300 w-full  my-[10px]">Item1</button>
                </div>
            }
            <div className=' w-[427px] ml-[43px] h-[451px] relative'>


                <div className="relative w-full">
                    <input type="text" placeholder='Search' className='py-[18px] pl-[78px] placeholder:pr-[292px] outline-none rounded-[20px] placeholder:text-[#3D3D3D59] font-poppins text-[16px] font-medium w-full shadow-custom2 mt-[10px] ' />
                    <LuSearch className='absolute top-[57%] left-[23px] text-[19px] translate-y-[-50%]' />
                    <PiDotsThreeVerticalBold className='absolute top-[57%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />
                </div>

                <div className="w-full mt-[56px] rounder-[10px] relative pt-[13px] pb-[21px] rounded-[20px] shadow-custom2">

                    <div className="ml-[23px]">
                        <div className="w-full relative flex items-center">
                            <h2 className='font-poppins font-semibold text-[20px] text-black'>Groups List</h2>
                            <PiDotsThreeVerticalBold onClick={handleThreeDot} className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary cursor-pointer select-none' />

                            {/* <button className='bg-primary px-[18px] rounded-[5px] cursor-pointer py-[6px] ml-auto mr-[30px] text-white font-poppins text-[16px] font-semibold flex items-center'>Create group <FaSquarePlus className='ml-[10px]'/></button> */}



                        </div>


                        
                            {
                                allGroupList.map((item) => (
                                    
                                    <div className="">
                                            <div className="flex mt-[17px] items-center">
                                         <img src={grpImg} alt="" />
                            <div className="ml-[14px]">
                                <p className="text-[18px] font-semibold font-poppins">{item.groupname}</p>
                                <p className="text-[14px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">{item.grouptitle}</p>
                            </div>
                            <div className="bg-primary px-[22px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                                <p className='text-white font-poppins text-[20px] font-semibold'>Join</p>
                            </div>
                                        </div>
                                        <div className="border-b-[2px] mx-[20px] py-[7px]"></div>
                                     </div>
                                   
                                ))
                            }
                           
                        </div>

                    </div>
                   



                </div>

            </div>
       
    )
}

export default GroupList