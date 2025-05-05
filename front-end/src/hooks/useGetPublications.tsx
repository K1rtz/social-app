import React, { useEffect, useState } from 'react'

const useGetPublications = () => {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState<PublicationType[]>([]);

    // useEffect(() =>{
        const getPublications = async () =>{
            setLoading(true)
            try {
                // console.log('uslismouTRY')
                const res = await fetch("/api/post/getpublications");
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                // console.log(data.posts)
                setPublications(data.posts);
                // console.log('zavrtsilismoTRY')
            } catch (error :any) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        // getPublications();
    // },[])

    useEffect(()=>{
        getPublications()
    }, []);

    return {loading, publications, refetchPublications : getPublications}
}

export default useGetPublications