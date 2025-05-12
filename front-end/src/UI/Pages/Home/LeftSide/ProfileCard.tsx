import React, { useState } from 'react'
import Logout from './Logout'
import { useAuthContext } from '../../../../context/AuthContext'
import PopupProfile from './PopupProfile';
import { useProfilePopup } from '../../../../context/PopupProfileContext';

const ProfileCard = () => {


    const {authUser, isLoading} = useAuthContext();
    const [showProfile, setShowProfile] = useState(false);
    const { openProfile, username} = useProfilePopup();


  return (
    <div className=' flex-[6]'>

    <div className="sticky flex-[6] top-24">
      <div className="bg-[#1d1b2ccd] rounded-2xl p-4 text-white">
        <div className="relative">
          <div className="h-24 bg-[#252536] rounded-2xl overflow-hidden">
            <img className='' src="https://as2.ftcdn.net/jpg/09/20/54/15/1000_F_920541529_dRXMtHDd3iIXbDxRSaV91h685Or3FG9T.webp" alt="" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="h-16 w-16 rounded-full border-4 border-[#1d1b2c] bg-gray-300 overflow-hidden">
              <img
                src={authUser?.profilePic}
                alt="avatar"
                className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>

        <div className="pt-12 text-center">
          <h2 className="text-lg font-bold cursor-pointer"
          onClick={()=>openProfile(authUser?.username ?? '')}
          >{authUser?.fullName}

          </h2>
          <p className="text-gray-400">@{authUser?.username}</p>
          <p className="text-sm text-gray-400 mb-4">{authUser?.profileDescription}</p>

          <div className="flex items-center justify-around py-4 border-t border-b border-gray-600">
            <div className="text-center">
              <p className="font-bold">{authUser?.follows?.length}</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>

            <div className="h-8 border-r border-gray-600"></div>

            <div className="text-center">
              <p className="font-bold">{authUser?.following?.length}</p>
              <p className="text-xs text-gray-400">Following</p>
            </div>
          </div>

          <div className="pt-5">
            <a href="#" className="font-bold text-blue-400 hover:underline"
            onClick={()=>openProfile("mardoe")}
            >My Profile</a>
          </div>

        </div>
        <Logout/>
      </div>
    </div>
      {username && <PopupProfile username={username}/>}
    </div>

    

    

    
    // </div>


  )
}


export default ProfileCard