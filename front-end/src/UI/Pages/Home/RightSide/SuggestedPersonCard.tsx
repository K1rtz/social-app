import React, { useState } from 'react'
import useFollowUser from '../../../../hooks/FollowHooks/useFollowUser';
import { useProfilePopup } from '../../../../context/PopupProfileContext';

const SuggestedPersonCard = ({suggestedUser} : {suggestedUser : SuggestedUserType}) => {
    
    const {loading, followUser} = useFollowUser();

    const [followValue, setFollowValue] = useState(true);
    const {openProfile, username} = useProfilePopup();


    const handleFollow = async (e: React.FormEvent) =>{
      e.preventDefault();
      var res = await followUser({content: suggestedUser.username})
      if(!res){
        return false
      }
      setFollowValue(false)
    }

    return (
      <div className="flex items-center justify-between bg-[#27253b] hover:bg-[#332f4a] transition-colors p-4 rounded-2xl cursor-pointer mb-2"
      onClick={()=>openProfile(suggestedUser.username)}
      >
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full border-2 border-[#37105c] overflow-hidden">
            <img
              src={suggestedUser.profilePic}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-3">
            <h1 className="text-white font-semibold text-sm leading-5">{suggestedUser.fullName}</h1>
            <h2 className="text-gray-400 text-xs">@{suggestedUser.username}</h2>
          </div>
        </div>
        <form onSubmit={handleFollow}>
        <button className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
        type = "submit"
        >
          {followValue ? "Follow" : "Unfollow"}
        </button>
          </form>
      </div>
    );
  }
  

export default SuggestedPersonCard