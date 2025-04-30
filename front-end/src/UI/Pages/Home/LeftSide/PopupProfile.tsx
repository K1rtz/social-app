import React, { useState } from 'react'
import PostCard from '../Middle/PostCard'

const PopupProfile = () => {

    const [isCommentSectionOpen, setCommentSection] = useState(true)
    const [editProfile, setEditProfile] = useState(false)


  return (

    <div className="fixed top-[10%] left-[50%] -translate-x-[50%] flex items-center  justify-center z-50">
        <div className="bg-[#140e38] p-4 rounded-xl w-[65vh] min-h-[80vh] border-4 border-[#0e0930]">
        <div className="sticky flex-[6] top-24 flex-col  h-[80vh]">
            <div className={` rounded-t-2xl ${!isCommentSectionOpen ? `h-[92%]` : `h-[40%]` }  p-4 text-white transition-all duration-500 ease-in-out`} 

            >
                    
                <div className="relative">
                    <div className="h-24 bg-[#252536] rounded-2xl overflow-hidden">
                        <img className='' src="https://as2.ftcdn.net/jpg/09/20/54/15/1000_F_920541529_dRXMtHDd3iIXbDxRSaV91h685Or3FG9T.webp" alt="" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="h-16 w-16 rounded-full border-4 border-[#1d1b2c] bg-gray-300 overflow-hidden">
                        <img
                            // src={authUser?.profilePic}
                            alt="avatar"
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>


        <div className="pt-12 text-center">
          <h2 className="text-lg font-bold">Jane Boe</h2>
          <p className="text-gray-400">@janeboe</p>
          <p className="text-sm text-gray-400 mb-4">My bamkin bamkin bamkin bamkin bamkin</p>

        {/* <h2 className="text-2xl font-semibold text-center mb-4">Profile Info</h2> */}
        {/* <div className="mb-2 flex-col items-center justify-center">
          <label htmlFor="fullName" className="block text-sm    ont-medium text-gray-200">Full Name </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder='Jane Boe'
            disabled = {false}
            className="w-[50%]   ml-2 mt-1 border border-gray-300  rounded p-[0.5px] text-center"
          />
        </div> */}
                
        {/* <div className="mb-4 flex-col items-center justify-center">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">Tag </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder='@jaderoe'
            disabled = {false}
            
            className="w-[50%]   ml-2 mt-1 border border-gray-300  rounded p-[0.5px] text-center"
          />
        </div> */}
        
        {/* <div className=" flex-col items-center justify-center">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">Description </label>
          <textarea className='w-[70%] p ml-2 mt-1 border border-gray-300  rounded pl-[1%] pt-[1%] resize-none'
          placeholder='My description'
          rows={2}
          maxLength={50}
          >

          </textarea>
          
        </div> */}

        {/* <div className="mt-4 text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Save Changes
          </button>
        </div> */}

      </div>      
        </div>
        <div className='text-center w-[20%] text-[18px]'>
                User Posts
            </div>
        <div className={`bg-[#140e38] min-w-[20px] scrollbar-thin scrollbar-thumb-gray-700 transition-all duration-500 ease-in-out 
          ${isCommentSectionOpen ? `h-[60%]` : `h-[8%]`}
         scrollbar-track-gray-900  w-[100%] max-w-xl  flex-col flex items-center overflow-y-auto rounded-b-xl p-4 `}>


            <div className="max-w-2xl w-[100%] mx-auto bg-[#2a2638] rounded-2xl mb-4 border border-[#3b3560] p-4">
                        {/* Header */}
                        <div className="flex space-x-4 items-center">
                            <img
                                src=''
                                alt="Profilna slika"
                                className="h-12 w-12 rounded-full object-cover bg-[#231e30] border border-[#4b3c78]"
                            />
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h1 className="font-bold text-white">BREAN</h1>
                                    <span className="text-gray-400 text-sm">@lepabrena</span>
                                    <span className="ml-auto text-gray-400 text-xs">zx</span>
                                </div>
                            </div>
                        </div>
            
                        {/* Content */}
                        <div className="mt-3 p-3 rounded-xl bg-[#1f1d2e] text-gray-200 text-base">
                            content
                        </div>
            
                        {/* Action buttons */}
                        <div className="flex items-center mt-3 gap-6 text-gray-400 text-lg">
                            <button className="hover:text-pink-400 transition" onClick={(e) => { e.preventDefault(); /* like function */ }}>
                                <i className="bi bi-heart-fill"></i>
                            </button>
                            <button className="hover:text-purple-400 transition" onClick={(e) => { e.preventDefault(); }}>
                                <i className="bi bi-chat-dots-fill"></i>
                            </button>
                        </div>
            

                    </div>
                    <div className="max-w-2xl w-[100%] mx-auto bg-[#2a2638] rounded-2xl mb-4 border border-[#3b3560] p-4">
                        {/* Header */}
                        <div className="flex space-x-4 items-center">
                            <img
                                src=''
                                alt="Profilna slika"
                                className="h-12 w-12 rounded-full object-cover bg-[#231e30] border border-[#4b3c78]"
                            />
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h1 className="font-bold text-white">BREAN</h1>
                                    <span className="text-gray-400 text-sm">@lepabrena</span>
                                    <span className="ml-auto text-gray-400 text-xs">zx</span>
                                </div>
                            </div>
                        </div>
            
                        {/* Content */}
                        <div className="mt-3 p-3 rounded-xl bg-[#1f1d2e] text-gray-200 text-base">
                            content
                        </div>
            
                        {/* Action buttons */}
                        <div className="flex items-center mt-3 gap-6 text-gray-400 text-lg">
                            <button className="hover:text-pink-400 transition" onClick={(e) => { e.preventDefault(); /* like function */ }}>
                                <i className="bi bi-heart-fill"></i>
                            </button>
                            <button className="hover:text-purple-400 transition" onClick={(e) => { e.preventDefault(); }}>
                                <i className="bi bi-chat-dots-fill"></i>
                            </button>
                        </div>
            

                    </div>
                    <div className="max-w-2xl w-[100%] mx-auto bg-[#2a2638] rounded-2xl mb-4 border border-[#3b3560] p-4">
                        {/* Header */}
                        <div className="flex space-x-4 items-center">
                            <img
                                src=''
                                alt="Profilna slika"
                                className="h-12 w-12 rounded-full object-cover bg-[#231e30] border border-[#4b3c78]"
                            />
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h1 className="font-bold text-white">BREAN</h1>
                                    <span className="text-gray-400 text-sm">@lepabrena</span>
                                    <span className="ml-auto text-gray-400 text-xs">zx</span>
                                </div>
                            </div>
                        </div>
            
                        {/* Content */}
                        <div className="mt-3 p-3 rounded-xl bg-[#1f1d2e] text-gray-200 text-base">
                            content
                        </div>
            
                        {/* Action buttons */}
                        <div className="flex items-center mt-3 gap-6 text-gray-400 text-lg">
                            <button className="hover:text-pink-400 transition" onClick={(e) => { e.preventDefault(); /* like function */ }}>
                                <i className="bi bi-heart-fill"></i>
                            </button>
                            <button className="hover:text-purple-400 transition" onClick={(e) => { e.preventDefault(); }}>
                                <i className="bi bi-chat-dots-fill"></i>
                            </button>
                        </div>
            

                    </div>
        </div>      
        {/* <div className='bg-blue-800 className="bg-[#122b2ccd] h-200 rounded-2xl p-4 text-white" '> </div> */}

      </div>
        </div>

        
        </div>
  )
}

export default PopupProfile