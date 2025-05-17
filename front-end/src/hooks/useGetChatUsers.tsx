import React, { useEffect, useState } from 'react'

type ConversationType = {
    lastMessage: {
        content: string;
        createdAt: string;
    } | null;
    id: string;
    fullName: string;
    username: string;
    profilePic: string;
}



const useGetChatUsers = () => {


    const [loading, setLoading] = useState(false);
    const [ChatUsers, setChatUsers] = useState<ConversationType[]>([])
    
    const getChatUsers = async () =>{
        setLoading(true)
        console.log('XDD')
        try{
            const res = await fetch("/api/messages/getChatUsers");
            const data = await res.json();
            if(data.error){
                throw new Error(data.error + "dataerrrrrror")
            }
            console.log('FULL DATA:',data);
            

            const mappedConversations: ConversationType[] = data.map((conv: any) => ({
                id: conv.id,
                fullName: conv.fullName,
                username: conv.username,
                profilePic: conv.profilePic,
                lastMessage: conv.lastMessage || null,  // Ako nema poslednje poruke, postavi null
            }));

            console.log("Mapped:", mappedConversations);

            setChatUsers(mappedConversations);
        } catch (error :any) {
            console.log(error + "xdd");
        }finally{
            setLoading(false)
        }
    }

    

    useEffect(()=>{
        getChatUsers()
        // console.log("Conversations updated:", conversations);

    }, []);

  return {loading, ChatUsers, refetchChatUsers : getChatUsers}
}

export default useGetChatUsers