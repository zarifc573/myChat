import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import raghav from '../../assets/raghav.png'
import swathi from '../../assets/swathi.png'
import kiran from '../../assets/kiran.png'
import tejesh from '../../assets/tejesh.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'


const Friends = () => {
  const data = useSelector((state) => state.clientLoginInfo.clientInfo)
    const db = getDatabase();
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
  
  const handleBlock = (item) => {
    console.log(item)
  
    if (data.uid == item.senderid) {
      set(push(ref(db, 'block/')), {
        block: item.recievername,
        blockid: item.recieverid,
        blockimg:item.recieverimg,
        blockedby: item.sendername,
        blockedbyid: item.senderid,
        blockedbyimg: item.senderimg
      }).then(() => {
        remove(ref(db, 'friend/' + item.key))
      })
    } else {
      set(push(ref(db, 'block/')), {
        block: item.sendername,
        blockid: item.senderid,
        blockimg: item.senderimg,
        blockedby: item.recievername,
        blockedbyid: item.recieverid,
        blockedbyimg: item.recieverimg,
      }).then(() => {
        remove(ref(db, 'friend/' + item.key))
      })
    }
  
  }

  return (
      
            <div className=' w-[344px] ml-[22px] h-[451px]'>
           
            <div className="pt-[13px] pb-[34px] px-[10px] rounded-[20px] shadow-custom2">
            <div className="w-full relative">
              <h2 className='font-poppins font-semibold text-[20px] text-black'>Friends</h2>
                      <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />
                      
          </div>
        <div>
          {
            friendLists.map((item) => (
              <div className="">
                 <div className="flex mt-[17px] items-center">
              <img src={   item.recieverid == data.uid
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
                  } alt="" className='h-[56px] w-[56px] rounded-full' />
              <div className="ml-[14px]">
                  <p className="text-[14px] font-semibold font-poppins">
                    {
                      item.recieverid == data.uid
                        ?
                        item.sendername
                        :
                        item.recievername
                    }
                  </p>
                  <p className="text-[12px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Dinner?</p>
              </div>
        
                {/* <p className="text-[#00000080] text-[10px] font-medium font-poppins ml-auto mr-[20px]">Today, 8:56pm</p> */}
                <div onClick={()=>{handleBlock(item)}} className="bg-red-500 px-[22px] rounded-[5px] cursor-pointer py-[7px] ml-auto mr-[30px]">
                            <p className='text-white font-poppins text-[20px] font-semibold'>Block</p>
                        </div>
          
                </div>
                <div className="border-b-[2px] mx-[20px] py-[7px]"></div>
             </div>
            ))
          }
         
          
              
          </div>
          
          

    </div>
    </div>
  )
}

export default Friends