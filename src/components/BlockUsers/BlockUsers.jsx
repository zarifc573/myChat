import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import raghav from '../../assets/raghav.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'



const BlockUsers = () => {
    const data = useSelector((state) => state.clientLoginInfo.clientInfo)
    const db = getDatabase();
    const [blockLists, setBlockLists] = useState([])
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
                if (item.val().blockedbyid == data.uid) {
                    arr.push({
                        id:item.key,
                        block: item.val().block,
                        blockid:item.val().blockid,
                        
                    })
                
               
              }else if(item.val().blockid ==data.uid){
                    arr.push({
                        id:item.key,
                        blockedby: item.val().blockedby,
                        blockedbyid:item.val().blockedbyid,
                    })
               
              }
            })
            setBlockLists(arr)
          
        });
    }, [])

    const handleUnblock = (item) => {
        console.log(item)
        set(push(ref(db, 'friend/')), {
            sendername: item.block,
            senderid: item.blockid,
            recievername: data.displayName,
            recieverid: data.uid
            
          }).then(() => {
                  remove((ref(db, 'block/' + item.id)))
            })
        
        
    }
  return (
      <div>
            <div className='w-[344px] ml-[19px] mt-[40px] h-[463px]'>
           
            <div className="pt-[13px] pb-[34px] px-[10px] rounded-[20px] shadow-custom2">
            <div className="w-full relative">
              <h2 className='font-poppins font-semibold text-[20px] text-black'>Block Lists</h2>
                      <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />
                      
                  </div>
                  {
                      blockLists.map((item) => (
                        <div className="flex mt-[17px] items-center">
                        <img src={raghav} alt="" />
                        <div className="ml-[14px]">
                                  <p className="text-[14px] font-semibold font-poppins">{item.block}</p>
                                  <p className="text-[14px] font-semibold font-poppins">{item.blockedby}</p>
                                 
                            <p className="text-[12px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Today, 8:56pm</p>
                        </div>
                              
                              {
                               
                                  !item.blockedby &&
                                  <div onClick={()=>{handleUnblock(item)}} className="bg-red-900 px-[12px] rounded-[5px] cursor-pointer py-[6px] ml-auto mr-[30px]">
                                  <p className='text-white font-poppins text-[18px] font-semibold'>Unblock</p>
                                        </div>
                                
                                              }
                                                
                 
                    
                        </div>
                      ))
                  }
                  
         
              </div>
           

    </div>
    </div>
  )
}

export default BlockUsers