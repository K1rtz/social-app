import React, { useEffect, useState } from 'react'

type ConversationType = {
    messages: {
        content: string;
    }[],
    participants: {
        id: string;
        fullName: string;
        username: string;
        profilePic: string;
    }[];
}


const useGetConversations = () => {


    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationType[]>([])
    
    const getConversations = async () =>{
        setLoading(true)
        try{
            const res = await fetch("/api/messages/getConversations");
            const data = await res.json();
            if(data.error){
                throw new Error(data.error + "dataerrrrrror")
            }
            const mappedConversations: ConversationType[] = data.map((conv: any) => ({
                participants: conv.participants,
                messages: conv.messages.map((msg: any) => ({
                  content: msg.content,
                })),
              }));
              console.log("Mapped:", mappedConversations);

            setConversations(mappedConversations);
        } catch (error :any) {
            console.log(error + "xdd");
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getConversations()
        // console.log("Conversations updated:", conversations);

    }, []);

  return {loading, conversations, refetchConversations : getConversations}
}

export default useGetConversations