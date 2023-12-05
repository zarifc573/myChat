import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import raghav from '../../assets/raghav.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'
import { BiSolidCheckboxChecked } from "react-icons/bi";


const UserList = () => {
    const [friendReqList, setFriendReqList] = useState([])
    const [friendList, setFriendList] = useState([])
    const [blockList, setBlockList] = useState([])
    const [searchDataList, setSearchDataList] = useState('')
    const data = useSelector((state) => state.clientLoginInfo.clientInfo)
    const db = getDatabase();
    const [userList, setUserList] = useState([])
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
                if (data.uid != item.key) {
                    arr.push({...item.val(), userId:item.key})
                }
            })
            setUserList(arr)
        });
    }, [])
    
    const handleAddButton = (item) => {
        console.log(item)
        set(push(ref(db, 'friendRequest/')), {
            recievername : item.username,
            recieverid: item.userId,
            recieverimg:item.image,
            sendername : data.displayName,
            senderid: data.uid,
            senderimg:data.photoURL
          });
    }
   

    useEffect(() => {
        const friendRequestRef = ref(db, 'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
                arr.push(item.val().senderid + item.val().recieverid)
            })
            setFriendReqList(arr)
        });
    }, [])
    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
                arr.push(item.val().senderid + item.val().recieverid)
            })
            setFriendList(arr)
        });
    }, [])
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item) => {
                arr.push(item.val().blockedbyid + item.val().blockid)
            })
            setBlockList(arr)
        });
    }, [])

    const handleSearchList = (e) => {
        let arr=[]
        if (e.target.value.length == 0) {
            setSearchDataList([])
        } else {
            userList.filter((item) => {
                if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
                    arr.push(item)
                    setSearchDataList(arr)
                }
            })
        }
       
    }
  
    return (
        <div>
            <div className=' w-[344px] ml-[16px] h-[451px]'>

                <div className="pt-[13px] pb-[34px] px-[10px] rounded-[20px] shadow-custom2">
                    
                    <div className="w-full relative">
                        <h2 className='font-poppins font-semibold text-[20px] text-black'>User Lists</h2>
                        <PiDotsThreeVerticalBold className='absolute top-[50%] right-[17px] text-[21px] translate-y-[-50%] text-primary' />

                    </div>
                    <input onChange={handleSearchList} type="text" className='border-[1px] border-primary border-opacity-[0.4] rounded-lg outline-none w-[300px] mt-[20px] py-[6px] pl-[20px] placeholder:text-primary placeholder:text-opacity-[0.5] ' placeholder='Search' />
                    {
                        // SearchList
                        searchDataList.length > 0 ?
                        searchDataList.map((item) => (
                            <div className="">
                                    <div className="flex mt-[17px] items-center">
                                    <img src={item.image} alt="" className='h-[58px] w-[58px] rounded-full ' />
                                    <div className="ml-[14px]">
                                        <p className="text-[14px] font-semibold font-poppins">{item.username}</p>
                                        <p className="text-[12px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Today, 8:56pm</p>
                                    </div>
                                   
                                 
                                    {
                                        blockList.includes(item.userId + data.uid) ||
                                        blockList.includes(data.uid + item.userId)
                                            ?
                                             <div className="bg-red-500 px-[12px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                                            <button className='text-white font-poppins text-[16px] font-semibold'>Blocked!</button>
                                            </div>
                                            :
                                            friendList.includes(item.userId + data.uid) ||
                                            friendList.includes(data.uid + item.userId)
                                            ?
                                            <div className="bg-primary px-[12px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px] flex items-center">
                                                    <button className='text-white font-poppins text-[16px] font-semibold ml-[5px]'>Friend</button>
                                                    <BiSolidCheckboxChecked className='text-[24px] text-white ml-[5px]'/>
                                            </div>
                                            :
                                           friendReqList.includes(item.userId + data.uid) ||
                                           friendReqList.includes(data.uid + item.userId)
                                               ?
                                               <div className="bg-primary px-[12px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                                               <button className='text-white font-poppins text-[16px] font-semibold'>pending...</button>
                                               </div>
                                               :
                                               <div className="bg-primary px-[14px] rounded-[5px] cursor-pointer py-[7px] ml-auto mr-[50px]">
                                               <button onClick={()=> handleAddButton(item)} className='text-white font-poppins text-[20px] font-semibold'>+</button>
                                           </div>
                                  }



                                   

                                </div>
                    <div className="border-b-[2px] mx-[20px] py-[7px]"></div>
                            </div>
                        ))
                            :
                        // Userlist
                        userList.map((item) => (
                            <div className="">
                                    <div className="flex mt-[17px] items-center">
                                    <img src={item.image} alt="" className='h-[58px] w-[58px] rounded-full ' />
                                    <div className="ml-[14px]">
                                        <p className="text-[14px] font-semibold font-poppins">{item.username}</p>
                                        <p className="text-[12px] font-medium font-poppins text-[#4D4D4DBF] pt-[6px]">Today, 8:56pm</p>
                                    </div>
                                   
                                 
                                    {
                                        blockList.includes(item.userId + data.uid) ||
                                        blockList.includes(data.uid + item.userId)
                                            ?
                                             <div className="bg-red-500 px-[12px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                                            <button className='text-white font-poppins text-[16px] font-semibold'>Blocked!</button>
                                            </div>
                                            :
                                            friendList.includes(item.userId + data.uid) ||
                                            friendList.includes(data.uid + item.userId)
                                            ?
                                            <div className="bg-primary px-[12px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px] flex items-center">
                                                    <button className='text-white font-poppins text-[16px] font-semibold ml-[5px]'>Friend</button>
                                                    <BiSolidCheckboxChecked className='text-[24px] text-white ml-[5px]'/>
                                            </div>
                                            :
                                           friendReqList.includes(item.userId + data.uid) ||
                                           friendReqList.includes(data.uid + item.userId)
                                               ?
                                               <div className="bg-primary px-[12px] rounded-[5px] cursor-pointer py-[5px] ml-auto mr-[30px]">
                                               <button className='text-white font-poppins text-[16px] font-semibold'>pending...</button>
                                               </div>
                                               :
                                               <div className="bg-primary px-[14px] rounded-[5px] cursor-pointer py-[7px] ml-auto mr-[50px]">
                                               <button onClick={()=> handleAddButton(item)} className='text-white font-poppins text-[20px] font-semibold'>+</button>
                                           </div>
                                  }



                                   

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

export default UserList