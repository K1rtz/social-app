import React, { useState } from 'react'
import PostCard from '../Middle/PostCard'
import useFetchUserProfile from '../../../../hooks/useFetchUserProfile'
import { useProfilePopup } from '../../../../context/PopupProfileContext'

const PopupProfile = ( {username} : {username : string} ) => {

    const [isCommentSectionOpen, setCommentSection] = useState(true)

    const { user, loading } = useFetchUserProfile(username);

    const {closeProfile} = useProfilePopup()
    
    if (loading) {
        return (
          <div className="fixed inset-0 bg-[#2c273a]/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-[#1f1d2b] w-[90%] max-w-[548px] rounded-2xl shadow-2xl p-6 text-white border border-[#3a334f] animate-pulse space-y-4">
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-full bg-[#322f42]"></div>
                <div className="w-32 h-4 bg-[#322f42] rounded"></div>
                <div className="w-20 h-3 bg-[#322f42] rounded"></div>
                <div className="w-48 h-3 bg-[#322f42] rounded mt-2"></div>
              </div>
      
              <div className="flex justify-around border-t border-b border-[#3c3a4a] py-4">
                <div className="space-y-2 text-center">
                  <div className="w-8 h-4 bg-[#322f42] rounded mx-auto"></div>
                  <div className="w-12 h-3 bg-[#322f42] rounded mx-auto"></div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="w-8 h-4 bg-[#322f42] rounded mx-auto"></div>
                  <div className="w-12 h-3 bg-[#322f42] rounded mx-auto"></div>
                </div>
              </div>
      
              <div className="space-y-4 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-[#201c2e] p-4 rounded-xl space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#322f42] rounded-full"></div>
                      <div className="flex flex-col space-y-1">
                        <div className="w-24 h-3 bg-[#322f42] rounded"></div>
                        <div className="w-16 h-2 bg-[#322f42] rounded"></div>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-[#322f42] rounded mt-2"></div>
                    <div className="w-3/4 h-3 bg-[#322f42] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
  if (!user) {
    {{console.log("Fetching user with username:", username);}}

    return <div>Error: User not found
    </div>
  }


  return (
    loading ? "Loading" : 
    <div className="fixed inset-0 bg-[#2c273a]/70 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={closeProfile}  
    >
      <div className="relative bg-[#1f1d2b] w-[90%] max-w-[588px] rounded-2xl shadow-2xl p-6 text-white border border-[#4c3e6b]"
      onClick={(e) => e.stopPropagation()}
      >
  <button
    onClick={closeProfile}
    className="absolute top-4 right-4 text-[#c084fc] hover:text-[#e9d5ff] transition-colors"
  >
    <i className="bi bi-x-square-fill text-2xl"></i>
  </button>

  <div className="flex flex-col items-center"
  
  >
    <img
      src={user?.profilePic}
      alt="avatar"
      className="w-24 h-24 rounded-full border-4 border-[#5b457d] object-cover shadow-lg"
    />
    <h2 className="mt-4 text-2xl font-bold text-[#f3e8ff]">{user?.fullName}</h2>
    <p className="text-sm text-[#b197f7]">@{user?.username}</p>
    <p className="mt-3 text-sm text-gray-300 text-center max-w-sm">{user?.profileDescription}</p>
  </div>

  <div className="mt-6 flex justify-around border-t border-b border-[#4e4363] py-4">
    <div className="text-center">
      <p className="font-bold text-lg text-[#d9bfff]">{user?._count?.follows ?? 0}</p>
      <p className="text-xs text-gray-400">Followers</p>
    </div>
    <div className="text-center">
      <p className="font-bold text-lg text-[#d9bfff]">{user?._count?.following ?? 0}</p>
      <p className="text-xs text-gray-400">Following</p>
    </div>
  </div>
  
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center text-white">User Posts</h3>
          <div className="max-h-[40vh] overflow-y-auto overflow-visible space-y-4  bg-[#1f1d2b] p-3 border   border-[#3d3752]">
          <div className="overflow-y-auto max-h-[35vh] pr-1 scrollbar-thin scrollbar-thumb-[#514266]/70 scrollbar-track-transparent">

            {user?.publications.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">No posts to show.</p>
            ) : (
              <div className="space-y-4">
                {user.publications.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#1f1c2d] rounded-xl p-4 shadow-md hover:shadow-lg transition border border-[#332c44]"
                  >
                    <div className="flex mb-2">
                      <img
                        src={user.profilePic}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="text-sm font-semibold text-white">{user.fullName}</p>
                          <p className="text-xs text-gray-400 ml-2">@{user.username}</p>
                        </div>
                        <p className="text-gray-300 text-sm break-words mt-1 break-all">{p.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
  
}




  


export default PopupProfile