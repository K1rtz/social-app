import React, { useState } from 'react'
import useCreatePublication from '../../../../hooks/useCreatePublication';
import { useAuthContext } from '../../../../context/AuthContext';

const CreatePostCard = ({onPostSuccess} : {onPostSuccess: ()=>void}) => {
  type CreatePostInputs = {
    "content": string;
  }

  const [publicationData, setPublicationData] = useState<CreatePostInputs>({
    "content": ""
  });

  const {loading, createPublication} = useCreatePublication();

  const handleSubmit = async (e : React.FormEvent) =>{
    e.preventDefault();
    const success = await createPublication(publicationData);
    if(success){
      onPostSuccess();
      publicationData.content=""
    }
  }

  const {authUser} = useAuthContext();

  return (
    <form onSubmit={handleSubmit}>

    <div className="max-w-2xl mx-auto bg-[#1d1b2c] rounded-2xl mb-4 border border-[#2e2e3d] p-4">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={authUser?.profilePic}
            alt="Profilna slika"
            className="h-12 w-12 rounded-full object-cover bg-[#373350] border-2 border-[#37105c]"
            />
        </div>

        <div className="flex-1 flex flex-col ">
          <textarea 
            placeholder="What is happening?"
            className="w-full text-white placeholder-gray-400 bg-[#373350] p-2 rounded-xl text-base resize-none focus:outline-none focus:ring-0 min-h-[50px]"
            value={publicationData.content}
            onChange= {(e)=>setPublicationData({content : e.target.value})}
            
            
            />

          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-3 ml-2">
              <button className="text-purple-400 hover:text-purple-500 transition">
                <i className="bi bi-image text-xl"></i>
              </button>
              <button className="text-yellow-400 hover:text-yellow-500 transition">
                <i className="bi bi-emoji-smile text-xl"></i>
              </button>
            </div>

            <button 
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition disabled:opacity-50"
              disabled={false}
              type = "submit"
              >{loading ? "Loading..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
  );
}

export default CreatePostCard;
