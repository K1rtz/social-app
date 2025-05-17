import React, { useState } from 'react'
import { formatTime } from '../../../../utils/utils';
import { useProfilePopup } from '../../../../context/PopupProfileContext';
import useGetComments from '../../../../hooks/useGetComments';
import { useAuthContext } from '../../../../context/AuthContext';
import SkeletonComments from './SkeletonComments';
import useCreateComment from '../../../../hooks/useCreateComment';
import useLikePublication from '../../../../hooks/useLikePublication';

const PostCard = ({ publication }: { publication: PublicationType }) => {
    const [isCommentOpen, setCommentOpen] = useState(false);
    const { openProfile, username} = useProfilePopup();
    const {loading, comments, fetchComments } = useGetComments();
    const {authUser} = useAuthContext();
    const {createComment} = useCreateComment();
    const [commentInput, setCommentInput] = useState("");

    const {likePublication} = useLikePublication();
    

    return (
        <div className="max-w-2xl mx-auto bg-[#1a162b] rounded-2xl mb-4 border border-[#3b3560] p-4">
            {/* Header */}
            <div className="flex space-x-4 items-center">
                <img
                    src={publication.author.profilePic}
                    alt="Profilna slika"
                    className="h-12 w-12 rounded-full object-cover bg-[#231e30] border border-[#4b3c78]"
                />
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-white ml-[-4px]
                        cursor-pointer hover:underline
                        "
                        onClick={()=>{openProfile(publication.author.username)}}
                        >{publication.author.fullName}</h1>
                        <span className="text-gray-400 text-sm ">@{publication.author.username}</span>
                        <span className="ml-auto text-gray-400 text-xs">{formatTime(publication.createdAt)}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-3 p-3 rounded-xl bg-[#1f1d2e] text-gray-200 text-base break-all">
                {publication.content}
            </div>

            {/* Action buttons */}
            <div className="flex items-center mt-3 gap-3 text-gray-400 text-lg justify-end">
                <div className='flex justify-center items-center'>
                    <button className={`hover:text-pink-400 transition flex items-center gap-1 cursor-pointer
                    ${publication.publicationLikes.some((like)=> like.user.username === authUser?.username) ? "text-pink-400" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        likePublication({content: publication.id});
                        // console.log(publication.publicationLikes.some(like=> like.user.username === authUser?.username))
                        }}>
                        <span className='mt-[-2px]'>
                            {publication.publicationLikes.length}
                        </span>
                        <i className="bi bi-heart-fill"></i>
                        </button>
                </div>
                <button className= "transition flex items-center gap-1 cursor-pointer"
                 onClick={(e) => {
                    e.preventDefault();
                    setCommentOpen(!isCommentOpen);
                    if(!isCommentOpen){
                        fetchComments(publication.id);
                    }
                    }}>
                    <span className='mt-[-2px]'>
                        {publication._count.comments}
                    </span>
                    <i className="bi bi-chat-dots-fill mt-[-2px]"></i>
                </button>
            </div>

            {/* Comments Section */}
            {isCommentOpen && (
                <div className="mt-4 space-y-6">
                    {loading? (
                        <SkeletonComments/>
                    ) :
                    (
                    <>
                    {/* Comment input */}
                    <div className="flex items-start gap-3 ">
                    <img
                        src={authUser?.profilePic}
                        alt="Profilna slika"
                        className="h-9 w-9 rounded-full object-cover  bg-[#231e30] border border-[#4b3c78]"
                    />

                    <div className="flex flex-col w-full relative">
                        <div className="flex items-center text-sm mb-1">
                        <span
                            onClick={() => openProfile(authUser?.username ?? '')}
                            className="font-semibold cursor-pointer hover:underline text-white"
                        >
                            {authUser?.fullName}
                        </span>
                        <span className="text-gray-400 ml-2">@{authUser?.username}</span>
                        </div>

                        <textarea
                        placeholder="Write a comment..."
                        className="bg-[#2a273a] border border-[#3c3752] p-2 rounded-lg w-full text-sm text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#a78bfa]/40"
                        rows={2}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <i
                            className={`cursor-pointer bi bi-arrow-right-short text-3xl absolute bottom-0 right-1 transition-colors ${
                            commentInput.trim()
                                ? "text-[#a78bfa] hover:text-[#c4b5fd]"
                                : "text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() => {
                            if (commentInput.trim()) {
                                createComment({content: commentInput, publicationId: publication.id});
                                setCommentInput(""); // Resetuj input nakon slanja
                                setTimeout(()=>{fetchComments(publication.id);},200);
                            }
                            }}
                        ></i>


                    </div>
                    </div>

                    {comments.map((comment, idx) => (
                    <div key={idx} className="flex items-start gap-3 mb-4">
                        <img
                        src={comment.author.profilePic}
                        alt="Profilna slika"
                        className="h-9 w-9 rounded-full object-cover bg-[#231e30] border border-[#4b3c78]"
                        />

                        <div className="flex flex-col w-full  text-sm mt-[-10px] relative">
                        <div className="flex justify-between items-center mb-1 ">
                            <div className="flex items-center gap-2">
                            <span
                                className="font-semibold text-white cursor-pointer hover:underline"
                                onClick={() => openProfile(comment.author.username)}
                            >
                                {comment.author.fullName}
                            </span>
                            <span className="text-gray-400 text-xs">@{comment.author.username}</span>
                            </div>
                            <span className="text-xs text-gray-500">{formatTime(comment.createdAt)}</span>
                        </div>
                        <p className="text-gray-300 bg-[#2a273a] border-[#3d3752] p-2 rounded-[8px]">{comment.content}</p>
                        
                        </div>
                    </div>
                    ))}
                    </>)}
                </div>

)}

        </div>
    );
}


export default PostCard