import React, { useState } from 'react'
import { formatTime } from '../../../../utils/utils';

const PostCard = ({ publication }: { publication: PublicationType }) => {
    const [isCommentOpen, setCommentOpen] = useState(false);

    return (
        <div className="max-w-2xl mx-auto bg-[#2a2638] rounded-2xl mb-4 border border-[#3b3560] p-4">
            {/* Header */}
            <div className="flex space-x-4 items-center">
                <img
                    src={publication.author.profilePic}
                    alt="Profilna slika"
                    className="h-12 w-12 rounded-full object-cover bg-[#231e30] border border-[#4b3c78]"
                />
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-white">{publication.author.fullName}</h1>
                        <span className="text-gray-400 text-sm">@{publication.author.username}</span>
                        <span className="ml-auto text-gray-400 text-xs">{formatTime(publication.createdAt)}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-3 p-3 rounded-xl bg-[#1f1d2e] text-gray-200 text-base">
                {publication.content}
            </div>

            {/* Action buttons */}
            <div className="flex items-center mt-3 gap-6 text-gray-400 text-lg">
                <button className="hover:text-pink-400 transition" onClick={(e) => { e.preventDefault(); /* like function */ }}>
                    <i className="bi bi-heart-fill"></i>
                </button>
                <button className="hover:text-purple-400 transition" onClick={(e) => { e.preventDefault(); setCommentOpen(!isCommentOpen); }}>
                    <i className="bi bi-chat-dots-fill"></i>
                </button>
            </div>

            {/* Comments Section */}
            {isCommentOpen && (
                <div className="mt-4 space-y-4">
                    {/* Comment input */}
                    <div className="flex items-start gap-3">
                        <img
                            src="https://api.dicebear.com/9.x/adventurer/svg?seed=Aiden"
                            alt="Profilna slika"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <textarea
                            placeholder="Write a comment..."
                            className="bg-[#1f1d2e] p-2 rounded-xl w-full text-sm text-gray-300 resize-none border border-gray-600"
                            rows={2}
                        />
                    </div>

                    {/* Example comments */}
                    {[1, 2].map((_, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <img
                                src="https://api.dicebear.com/9.x/adventurer/svg?seed=Aiden"
                                alt="Profilna slika"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <div className="bg-[#1f1d2e] p-2 rounded-xl w-full text-sm text-gray-300">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold">Jovan Borovic</span>
                                    <span className="text-xs text-gray-400">11:00</span>
                                </div>
                                Ovo je komentar
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default PostCard