import React, { useState } from 'react'
import useGetMessages from '../../hooks/useGetMessages';
import InnerChat from '../InnerChat';
import useGetChatUsers from '../../hooks/useGetChatUsers';



const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
    pic: string;
  } | null>(null);

    const {ChatUsers, refetchChatUsers} = useGetChatUsers()
    const [searchQuery, setSearchQuery] = useState("");
 
    const {} = useGetMessages();

    const filteredConversations = ChatUsers.filter(convo => {
      // const otherUser = convo.participants.find(p => p.username !== authUser?.username);
      const fullNameMatch = convo?.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const usernameMatch = convo?.username.toLowerCase().includes(searchQuery.toLowerCase());
      return fullNameMatch || usernameMatch;
    });


    return (
<div className="fixed bottom-4 right-4 w-90 rounded-xl shadow-xl overflow-hidden transition-all duration-[800ms]">
  <button
    onClick={
    () => {
      setIsOpen(!isOpen)
      if(!isOpen){
        refetchChatUsers();
        console.log(ChatUsers);
      }
    }
    }
    className="w-full px-4 py-3 bg-[#160724] text-white font-semibold"
  >
    Messages
  </button>

  <div className={`transition-all bg-[#290d42] duration-[800ms] ${isOpen ? "max-h-[60vh] opacity-100 h-[40vh]" : "h-0 opacity-0"} overflow-hidden`}>

    {
      isChatting ? 
      (
        <>
        {selectedChat ? (
          <InnerChat
          id={selectedChat.id}
          name={selectedChat.name}
          pic={selectedChat.pic}
          onBack={() => setIsChatting(false)}
          />
        ) : (
          <div>Select chat to start conversation</div>
        )}
        </>
        
      ) :
      (
      <>

      <div className="p-3 border-b   border-[#3e2a5a] bg-[#230a39]">
        <input
        type="text"
        placeholder="Search users..."
        className="w-full  px-3 py-2 text-sm rounded-md bg-[#3e2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>

    <div className="overflow-y-auto max-h-[80%]">
      {filteredConversations.map((con)=>{
        
      
      return (
        
      <div className="flex items-start gap-3 p-3 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
      onClick={()=>{
        if(con?.id != null && con?.fullName != null && con?.profilePic != null){
          setSelectedChat({
            id: con.id,
            name: con.fullName,
            pic: con.profilePic,
          })}
          setIsChatting(true)
        }
        }
      >
      <img
      src={con?.profilePic}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
      <div className='flex flex-row items-center'>
      <div className="text-white font-semibold text-sm">{con?.fullName}</div>
      <div className="text-gray-400 text-xs mb-1 ml-2 ">@{con?.username}</div>
      </div>
      <div className="text-gray-400 text-sm truncate max-w-[200px] ">
      {con.lastMessage?.content ?? 'start conversation...'}
      </div>
      </div>
      </div>
      )
      }
      )}
      </div>

      </> 
      )
    }
  </div>
</div>
    )
}

export default Chat