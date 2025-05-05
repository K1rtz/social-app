import React, { useState } from 'react'

type recieverUsernameType = {
    "content": string;
}

const useFollowUser = () => {
    
    const [loading, setLoading] = useState(false);
    const followUser = async(inputs: recieverUsernameType) => {

        try{
            setLoading(true);
            const res = await fetch("/api/follow/followUser",{
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
                return false
            }

            return true

        } catch (error: any) {
            console.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    
    return { followUser, loading };
}

export default useFollowUser