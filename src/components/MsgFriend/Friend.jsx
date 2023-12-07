import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import grpImg from '../../assets/group.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { operatingChatInfo } from '../../Redux/chatBoxSlice';

const Friend = () => {
    
  const data = useSelector((state) => state.clientLoginInfo.clientInfo)
    const info = useSelector((state) => state.operatingChatInfo.operator)
    console.log(info);
    const db = getDatabase();
    const dispatch =useDispatch()
    const [friendLists, setFriendLists] = useState([])
    useEffect(() => {
      const friendRef = ref(db, 'friend/');
      onValue(friendRef, (snapshot) => {
          let arr=[]
          snapshot.forEach((item) => {
            if (data.uid == item.val().recieverid || data.uid == item.val().senderid) {
              arr.push({...item.val(), key:item.key});
              }
          })
          setFriendLists(arr)
      });
    }, [])
    const handleFriendInfo = (item) => {
        console.log(item);
        if (data.uid == item.senderid) {
            dispatch(operatingChatInfo({
                status: 'one',
                id: item.recieverid,
                name: item.recievername,
                img:item.reciverimg
            }))
        } else {
            dispatch(operatingChatInfo({
                status: 'one',
                id: item.senderid,
                name: item.sendername,
                img:item.senderimg
            }))
        }
    }
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


                      {
                          friendLists.map((item) => (
                              <div className="">
                                   <div onClick={()=>handleFriendInfo(item)} className="cursor-pointer select-none hover:bg-primary hover:w-full hover:h-full hover:rounded-lg hover:px-[20px] hover:py-[6px] hover:mt-[15px] mt-[25px] hover:text-white duration-200 ">
                            <div className="flex  items-center ">
                         <img src= {
                                        item.recieverid == data.uid
                                            ?
                                            item.senderimg
                                            :
                                                  item.recieverimg
                                                  ||
                                                 
                                                    item.senderid == data.uid
                                                        ?
                                                        item.recieverimg 
                                                        :
                                                        item.senderimg
                                                    
                                        }alt="" className='h-[51px] w-[51px] rounded-full'/>
            <div className="ml-[14px]">
                                        <p className="text-[18px] font-semibold font-poppins">
                                        {
                                        item.recieverid == data.uid
                                            ?
                                            item.sendername
                                            :
                                            item.recievername
                                        }
                                              
                                        </p>
                <p className="text-[14px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Dinner?</p>
            </div>
            {/* <div className="bg-primary px-[22px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                <p className='text-white font-poppins text-[20px] font-semibold'>Join</p>
            </div> */}
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

export default Friend