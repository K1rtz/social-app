import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

type LikePostInputs = {
    "content": string;
}

const useLikePublication = () => {
    
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext()

    const likePublication = async(inputs: LikePostInputs) => {
        try{
            setLoading(true);
            const res = await fetch("/api/post/likePublication",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            })
            // console.log(inputs);
            // console.log(res);
            const data = await res.json();
            if(!res.ok) {
                console.log('uslismoovde');
                throw new Error(data.error);
            }
            return true

        } catch (error: any) {
            console.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    
    return { likePublication, loading };
}

export default useLikePublication