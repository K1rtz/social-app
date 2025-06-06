import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

type CreatePostInputs = {
    "content": string;
}

const useCreatePublication = () => {
    
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext()

    const createPublication = async(inputs: CreatePostInputs) => {
        try{
            setLoading(true);
            const res = await fetch("/api/post/createpublication",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            })
            console.log(inputs);
            console.log(res);
            const data = await res.json();
            if(!res.ok) {
                console.log('uslismoovde');
                throw new Error(data.error);
            }
            return true

        } catch (error: any) {
            toast.error(error.message);
            console.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    
    return { createPublication, loading };
}

export default useCreatePublication