import React, { useState, createRef } from "react";
import { useNavigate } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import userImg from '../../assets/user.png'
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";


const ImageUpload = () => {
  const data = useSelector((state) => state.clientLoginInfo.clientInfo)
 console.log(data)
  const auth = getAuth();
  const navigate = useNavigate()
  const storage = getStorage();
    const [image, setImage] = useState();
    const [coverShow, setCoverShow] = useState(false);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
    const cancelBtn = () => {
    navigate('/home')
}
  
        const handleUploadChange = (e) => {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
              files = e.dataTransfer.files;
            } else if (e.target) {
              files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(files[0]);
            setCoverShow(true)
          };
   
    
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
          const storageRef = ref(storage, auth.currentUser.uid);
          const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
          uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
              console.log('File available at', downloadURL);
              updateProfile(auth.currentUser, {
                photoURL: downloadURL
              }).then(() => {
                setImage('')
                setCropData('')
                setTimeout(() => {
                  navigate('/home')
                }, 10)
              })
            });
          });
        }
      };

  return (
      <div>
            
        <div className="bg-cyan-700 w-full h-screen z-[100] absolute top-0 left-0 flex justify-center items-center">
            <div className="w-[600px] p-[50px] bg-cyan-600 rounded-lg mx-auto text-center shadow-md">
                  <h1 className="text-[40px] font-sans font-bold text-white">Upload Your Image</h1>
                
                    {coverShow ? <div className="overflow-hidden rounded-full h-[100px] w-[100px] mx-auto mt-[20px]">
                      <div className="img-preview rounded-full w-[100px] h-[100px]"></div>
                    </div> : null}

                  {
                      image &&
                      <Cropper
                      ref={cropperRef}
                      style={{ height: 400, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                          guides={true}
                          className="mt-[20px]"
                      />
               }
                     
             

                  <input onChange={handleUploadChange} type="file" className='py-[14px] px-[12px] bg-cyan-800 border-[2px] border-cyan-700 rounded-2xl font-sans text-[18px] text-white font-medium file:text-[16px] file:text-white file:bg-cyan-600 file:border-cyan-500 hover:file:bg-cyan-700 hover:file:border-[2px] hover:file:border-solid file:ml-[20px] file:duration-300 file:rounded-full cursor-pointer file:cursor-pointer file:py-[3px] file:px-[15px] file:mr-[40px] hover:bg-cyan-700 mt-[40px] duration-300 ' />
                  <div className="flex mt-[30px] justify-center items-center gap-x-[70px]">
                  <button onClick={getCropData} className="bg-[#06b5d4b1] px-[50px] py-[14px] rounded-lg font-sans text-[16px] font-semibold hover:bg-cyan-500 text-white">Upload</button>
                  <button onClick={cancelBtn} className="bg-cyan-700 px-[50px] py-[14px] rounded-lg font-sans text-[16px] font-semibold hover:bg-cyan-800 text-white">Cancel</button>
                  </div>
              </div>
        </div>
     
    </div>
  )
}

export default ImageUpload