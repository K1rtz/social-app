import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import SearchBar from './SearchBar';
import { useProfilePopup } from '../../../context/PopupProfileContext';

const Navbar = () => {

  const {authUser} = useAuthContext();
  const {openProfile, username} = useProfilePopup();


  return (
    <div className="fixed  w-7xl top-0 flex items-center justify-between p-4 rounded-b-4xl bg-[#1d1b2c9d] backdrop-blur-xl ">
    <div className="flex items-center">
        <h1 className="ml-4 mr-[-5px] text-2xl font-bold text-white">Purplexity</h1>
    </div>

    <SearchBar/>

    <div className="flex items-center ml-6 space-x-6">
        <div className="text-white cursor-pointer">
          <i className="bi bi-bell-fill"></i>
        </div>

        <div className="h-10 w-10 rounded-full  border-2 border-white overflow-hidden cursor-pointer"
        onClick={()=>openProfile(authUser?.username ?? '')}
        >
            <img 
                src={authUser?.profilePic} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
            />
        </div>
    </div>
</div>

  )
}

export default Navbar