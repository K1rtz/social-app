import { useState } from "react"
import toast from "react-hot-toast"


const useSendMessage = () =>{
    const [loading, setLoading] = useState(false)

    const sendMessage = async (message: string, id: string) => {

        setLoading(true);
        try{

            const res = await fetch(`/api/messages/send/${id}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: message}),
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);
            
        }catch(error:any){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {sendMessage, loading};
}

export default useSendMessage