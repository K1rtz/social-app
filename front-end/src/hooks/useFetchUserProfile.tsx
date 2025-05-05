import React, { useEffect, useState} from 'react'




const useFetchUserProfile = (username : string) => {

    const [user, setUser] = useState<ProfileCardType | null>(null);
    const [loading, setLoading] = useState(false);
    
    const getUserProfile = async () =>{
        setLoading(true)
        try {
            const res = await fetch(`/api/search/getUser?username=${username}`);
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            console.log(data.userInfo);
            setUser(data.userInfo)
        } catch (error : any) {
            console.log("Error in fetchuserprofile!!!!!!!!!!!")
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getUserProfile()
    },[])

    return { user, loading };

}

export default useFetchUserProfile