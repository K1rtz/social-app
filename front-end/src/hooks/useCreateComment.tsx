import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

type CreateCommentInputs = {
    "content": string;
    "publicationId": string;
}

const useCreateComment = () => {

    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext()

    const createComment = async(inputs: CreateCommentInputs) =>{

        try {
            setLoading(true)
            const res = await fetch("/api/post/createComment",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(inputs),
            })
            const data = await res.json();
            console.log(data)
            
        } catch (error : any){
            console.error(error.message);
        }finally{
            setLoading(false);
        }
        
    }


return {createComment, loading};

  
}

export default useCreateComment