import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import raghav from '../../assets/raghav.png'
import swathi from '../../assets/swathi.png'
import kiran from '../../assets/kiran.png'
import tejesh from '../../assets/tejesh.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'


const MyGroups = () => {
  const data = useSelector((state) => state.clientLoginInfo.clientInfo)
  const db = getDatabase();
  const [ownGroup, setOwnGroup] = useState([])
  useEffect(() => {
      const userRef = ref(db, 'mygrouplist/');
      onValue(userRef, (snapshot) => {
          let arr=[]
          snapshot.forEach((item) => {
            if (data.uid == item.val().hostid) {
              arr.push(item.val())
              }
          })
          setOwnGroup(arr)
      });
  }, [])
  return (
      <div>
            <div className=' w-[344px] ml-[22px] mt-[40px] h-[463px]'>
           
            <div className="pt-[13px] pb-[32px] px-[10px] rounded-[20px] shadow-custom2">
            <div className="w-full relative">
              <h2 className='font-poppins font-semibold text-[20px] text-black'>My Groups</h2>
                      <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />
                      
          </div>
           
         
          {
            ownGroup.map((item) => (
              <div className="">
                <div className="flex mt-[17px] items-center">
              <img src={raghav} alt="" />
              <div className="ml-[14px]">
                  <p className="text-[14px] font-semibold font-poppins">{item.groupname}</p>
                  <p className="text-[12px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">{item.grouptitle}</p>
              </div>
        
        <p className="text-[#00000080] text-[10px] font-medium font-poppins ml-auto mr-[20px]">Today, 8:56pm</p>
          
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

export default MyGroups