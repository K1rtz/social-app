import React, { useEffect, useState } from 'react'

const useGetSuggested = () => {
    const [loading, setLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUserType[]>([]);

    useEffect(() =>{
        const getSuggestedUsers = async () =>{
            setLoading(true)
            try {

                console.log('uslismouTRY')
                const res = await fetch("/api/post/getSuggested");
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                console.log(data.suggestedUsers);
                setSuggestedUsers(data.suggestedUsers);
                console.log()
            } catch (error :any) {
                console.log("Error in getSuggestedUsers");
            }finally{
                setLoading(false)
            }
        }
        getSuggestedUsers();
    },[])

    return {loading, suggestedUsers}
}

export default useGetSuggested