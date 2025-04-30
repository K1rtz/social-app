import React, { useState } from 'react'
import useCreatePublication from '../../../../hooks/useCreatePublication';
import { useAuthContext } from '../../../../context/AuthContext';

const CreatePostCard = () => {
  type CreatePostInputs = {
    "content": string;
}
  const [publicationData, setPublicationData] = useState<CreatePostInputs>({
    "content": ""
  });

  const {loading, createPublication} = useCreatePublication();

  const handleSubmit = async (e : React.FormEvent) =>{
    e.preventDefault();
    createPublication(publicationData);
  }

  const {authUser} = useAuthContext();

  return (
    <form onSubmit={handleSubmit}>

    <div className="max-w-2xl mx-auto bg-[#1d1b2c] rounded-2xl mb-4 border border-[#2e2e3d] p-4">
      <div className="flex space-x-4">
        {/* Profilna slika */}
        <div className="flex-shrink-0">
          <img 
            src={authUser?.profilePic}
            alt="Profilna slika"
            className="h-12 w-12 rounded-full object-cover bg-[#373350] border-2 border-[#37105c]"
            />
        </div>

        {/* Tekst i dugmad */}
        <div className="flex-1 flex flex-col ">
          <textarea 
            placeholder="Šta se dešava?"
            className="w-full text-white placeholder-gray-400 bg-[#373350] p-2 rounded-xl text-base resize-none focus:outline-none focus:ring-0 min-h-[50px]"
            value={publicationData.content}
            onChange= {(e)=>setPublicationData({content : e.target.value})}
            
            
            />

          <div className="flex items-center justify-between mt-4">
            {/* Ikonice */}
            <div className="flex space-x-3">
              <button className="text-purple-400 hover:text-purple-500 transition">
                <i className="bi bi-image text-xl"></i>
              </button>
              <button className="text-yellow-400 hover:text-yellow-500 transition">
                <i className="bi bi-emoji-smile text-xl"></i>
              </button>
            </div>

            {/* Objavi dugme */}
            <button 
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition disabled:opacity-50"
              disabled={false}
              type = "submit"
              >{loading ? "Loading..." : "Objavi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
  );
}

export default CreatePostCard;





// const CreatePostCard = () => {
//   return (

//     <div className="max-w-2xl mx-auto  bg-[#1d1b2ccd] rounded-3xl mb-2  pb-4">
//       <div className="flex space-x-3 px-4 pt-3">
//         <div className="flex-shrink-0">
//             <img 
//             src="https://api.dicebear.com/9.x/adventurer/svg?seed=Aiden"
//             alt="Profilna slika"
//             className="h-15 w-15 rounded-2xl border-1 object-cover bg-[#373350cd] "
//             />
//         </div>

//     <div className="flex-1 " >
//       <textarea 
//         placeholder="Šta se dešava?"
//         className="w-full p-2 rounded-2xl text-xl border-none focus:ring-0 resize-none bg-[#2d2b3c] placeholder-gray-300 min-h-[50px]"
//       />



//       <div className="flex items-center justify-between  border-gray-200 pt-3">
//         <div className='flex gap-2 ' >
//         <div className="flex space-x-2 bg-purple-50 rounded-2xl h-10 items-center hover:bg-purple-50">
//           <button className="p-2 rounded-full mr-0 text-blue-500">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//           </button>
//         {/* <label className='text-black font-bold m-3 ml-0'>Image</label> */}
//         </div>
//         <div className="flex space-x-2 bg-purple-50 h-10 rounded-2xl items-center">
//             <button className="p-2 rounded-full text-yellow-500  transition">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </button>
//             {/* <label className='text-black font-bold m-3 ml-0'>Emojis</label> */}
//         </div>
//         </div>
        
//         <button className="px-4 py-2 bg-blue-500 text-white border-none rounded-2xl h-10 font-bold hover:bg-blue-600 disabled:opacity-50"
//           disabled={false}
//         >
//           Objavi
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

// )
// }

// export default CreatePostCard