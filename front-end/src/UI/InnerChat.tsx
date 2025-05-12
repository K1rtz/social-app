import React, { useEffect, useRef, useState } from 'react'
import useGetMessages from '../hooks/useGetMessages'
import { useAuthContext } from '../context/AuthContext';
import useSendMessage from '../hooks/useSendMessage';

type InnerChatProps = {
    id: string;
    pic: string;
    name: string;
    onBack: () => void; // tip funkcije
  };

const InnerChat = ({id, pic, name, onBack }: InnerChatProps) => {
    const {loading, messages,fetchMessages} = useGetMessages();
    const {authUser}  = useAuthContext();

    const {sendMessage} = useSendMessage();
    const [messageContent, setMessageContent] = useState("");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    useEffect(()=>{
        fetchMessages(id)
    },[]);
    
  return (
    <div className="flex flex-col h-full bg-[#1c1a29]">
  {/* Header */}
  <div className="flex items-center justify-between bg-[#2d2343] p-3 text-white">
    <i className=" absolute bi bi-arrow-left cursor-pointer text-xl"
    onClick={onBack}
    ></i>
    <div className="font-semibold text-lg text-center flex-1">{name}</div>
  </div>

  {/* Chat messages (scrollable) */}
  <div className="flex-1 overflow-y-auto p-3 space-y-3 ">
    {messages.map((m, i) => (
      <div key={i}>
        {m.senderId === authUser?.id ? (
          <div className="flex justify-end">
            <div className="flex items-end gap-2 max-w-[70%]">
                <div className='flex-col flex'>

              <div className="bg-purple-600 text-white p-3 rounded-2xl rounded-br-none">
                <div>{m.content}</div>
              </div>
                <div className="text-xs text-gray-300 text-right mt-1">11:12</div>
                </div>
              <img
                src={authUser.profilePic}
                className="w-8 h-8 rounded-full"
                alt="Me"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 max-w-[70%]">
              <img
                src={pic}
                className="w-8 h-8 rounded-full"
                alt={name}
              />
              <div className='flex flex-col'>

              <div className="bg-[#4c3575] text-white p-3 rounded-2xl rounded-bl-none">
                <div>{m.content}</div>
              </div>
                <div className="text-xs text-gray-300 text-left mt-1 ">11:12</div>
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
      <div ref={messagesEndRef} />
  </div>

  {/* Input bar */}
  <div className="p-3 bg-[#2d2343]">
    <div className="flex items-center rounded-xl bg-[#3b2e59] px-3 py-2">
      <textarea
        rows={1}
        className="flex-1 bg-transparent text-white text-sm resize-none focus:outline-none placeholder:text-gray-400"
        placeholder="Type a message..."
        value = {messageContent}
        onChange={(e)=>{setMessageContent(e.target.value)}}
      />
      <button className="ml-3 text-white text-xl">
        <i className="bi bi-arrow-right-circle-fill hover:text-purple-400 cursor-pointer"
        onClick={()=>{
            sendMessage(messageContent, id);
            setMessageContent("");
            setTimeout(()=>{
                fetchMessages(id);
            },100);
        }}
        ></i>
      </button>
    </div>
  </div>
</div>
  )
}

export default InnerChat