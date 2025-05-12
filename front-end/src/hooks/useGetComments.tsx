import React, { useEffect, useState } from 'react'


type Comment = {
    author: CommentAuthor;
    createdAt: string;
    content: string;
}

type CommentAuthor = {
    fullName: string;
    username: string;
    profilePic: string;
}

const useGetComments = () => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

        const fetchComments = async (postId: string) =>{
            setLoading(true)
            try {
                // console.log("FETCHIG:" + `/api/post/getComments/q=${postId}`)
                const res = await fetch(`/api/post/getComments?q=${postId}`);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                console.log(data)
                setComments(data.comments);
            } catch (error :any) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        }

    return {loading, comments, fetchComments}
}

export default useGetComments