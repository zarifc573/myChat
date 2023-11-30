import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import raghav from '../../assets/raghav.png'
import swathi from '../../assets/swathi.png'
import kiran from '../../assets/kiran.png'
import tejesh from '../../assets/tejesh.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'
import { GoCheck } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

const FriendReq = () => {
    const data = useSelector((state) => state.clientLoginInfo.clientInfo)
    const db = getDatabase();
    const [friendReqList, setFriendReqList] = useState([])
    useEffect(() => {
        const friendRequestRef = ref(db, 'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
                if (item.val().recieverid == data.uid) {
                    arr.push({...item.val(), id:item.key})
                }
            })
            setFriendReqList(arr)
        });
    }, [])

    const handleFriendAdd = (item) => {
        set(push(ref(db, 'friend/')), {
            ...item
        }).then(() => {
              remove((ref(db, 'friendRequest/' + item.id)))
          })
    }
    const handleFriendRemove = (item) => {
       console.log(item)
    }

    return (
        
        <div className='w-[427px] h-[463px] ml-[43px] mt-[56px]'>
            <div className="ml-[23px]">
            <div className="w-full relative">
              <h2 className='font-poppins font-semibold text-[20px] text-black'>Friend Request</h2>
                      <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />
                      
                </div>
                {
                    friendReqList.length == 0 ?
                        <div className="mt-[30px]">
                            <h2 className='font-poppins font-semibold text-[20px] text-red-500'>No data found!</h2>
                        </div>
                        :
                    friendReqList.map((item) => (
                        <div className="">
                               <div className="flex mt-[17px] items-center justify-between">
                            <div className="flex items-center">
                            <img src={raghav} alt="" />
                        <div className="ml-[14px]">
                            <p className="text-[16px] font-semibold font-poppins">{item.sendername}</p>
                            <p className="text-[14px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Dinner?</p>
                        </div>
                      </div>
                  
                            <div className="flex items-center">
                            <div onClick={()=>{handleFriendAdd(item)}} className="bg-primary px-[22px] rounded-[5px] cursor-pointer py-[7px] ml-auto mr-[30px]">
                            <p className='text-white font-poppins text-[20px] font-semibold'><GoCheck /></p>
                                </div>
                                <div onClick={()=>{handleFriendRemove(item)}} className="bg-red-500 px-[22px] rounded-[5px] cursor-pointer py-[7px] ml-auto mr-[30px]">
                            <p className='text-white font-poppins text-[20px] font-semibold'><IoCloseOutline /></p>
                        </div>
                </div>
                    
                            </div>
                            <div className="border-b-[2px] mx-[20px] py-[7px]"></div>
                     </div>
                    ))
                }
               
          
              
        
              </div>
            </div>
  )
}

export default FriendReq