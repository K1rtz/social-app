import React, { useState } from 'react'



const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleButton = () => {
    setIsOpen(!isOpen);
    };


    const chats = [
    { id: 3, name: "Jelena Ilić", lastMessage: "Pošalji mi to kasnije." },
    { id: 1, name: "Ana Petrović", lastMessage: "Hej, kako si?" },
    { id: 1, name: "Ana Petrović", lastMessage: "Hej, kako si?" },
    { id: 1, name: "Ana Petrović", lastMessage: "Hej, kako si?" },
    { id: 1, name: "Ana Petrović", lastMessage: "Hej, kako si?" },

    ];
  
  
    return (
    <div className="fixed bottom-4 right-4 w-80 rounded-xl shadow-xl overflow-hidden transition-all duration-[800ms]">
  {/* Messages dugme */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="w-full px-4 py-3 bg-[#160724] text-white font-semibold"
  >
    Messages
  </button>

  {/* Chat lista – animirano širenje */}
  <div
    className={`transition-all bg-[#290d42] duration-[800ms] ${
      isOpen ? "max-h-[50vh] opacity-100 h-[30vh]" : "h-0 opacity-0"
    } overflow-y-auto`}
  >
    {chats.map((chat) => (
      <div key={chat.id} className="p-4 border-b hover:bg-[rgb(51,23,76)] cursor-pointer">
        <p className="font-medium">{chat.name}</p>
        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
      </div>
    ))}
  </div>
</div>  )
}

export default Chat