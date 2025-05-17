import { useEffect, useState } from "react";;
import toast from "react-hot-toast";

type Message = {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
    conversationId: string;
}


function useGetMessages() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const getMessages = async (input : string) =>{
        setLoading(true);
        try{
            console.log("POKUSAVMAO DA FETCHUJEMO PORUKE?")
            const res = await fetch(`/api/messages/${input}`);
            const data = await res.json();
            console.log(data);
            if(!res.ok) throw new Error(data.error || "An error has occured!");
            setMessages(data);
        }catch( error: any){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    


    return {messages, loading, setMessages, fetchMessages : getMessages}
}

export default useGetMessages